"use client";
import { useEffect, useState, useCallback } from "react";
import { SensorData } from "@/lib/sensor-store";

interface UseSensorDataResult {
  data: SensorData | null;
  loading: boolean;
  error: string | null;
  connected: boolean;
  refresh: () => void;
}

interface WebSocketMessage {
  type: "initial" | "sensor_update" | "client_count" | "error" | "ack";
  key?: string;
  deviceId?: string;
  sensorType?: string;
  data?: SensorData | Record<string, SensorData>;
  timestamp: string;
  clientCount?: number;
  message?: string;
}

// Global WebSocket connection manager
class WebSocketManager {
  private ws: WebSocket | null = null;
  private listeners: Set<(message: WebSocketMessage) => void> = new Set();
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;
  private reconnectTimeout: NodeJS.Timeout | null = null;
  private url: string;
  private isConnecting = false;

  constructor() {
    // WebSocket server URL (default: ws://localhost:3001)
    this.url =
      process.env.NEXT_PUBLIC_WS_URL ||
      (typeof window !== "undefined"
        ? `ws://${window.location.hostname}:3001`
        : "ws://localhost:3001");
  }

  connect() {
    if (
      this.isConnecting ||
      (this.ws && this.ws.readyState === WebSocket.OPEN)
    ) {
      return;
    }

    this.isConnecting = true;

    try {
      this.ws = new WebSocket(this.url);

      this.ws.onopen = () => {
        console.log("[WebSocket] Connected to server");
        this.reconnectAttempts = 0;
        this.isConnecting = false;
      };

      this.ws.onmessage = (event) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data);
          this.listeners.forEach((listener) => listener(message));
        } catch (error) {
          console.error("[WebSocket] Error parsing message:", error);
        }
      };

      this.ws.onerror = (error) => {
        console.error("[WebSocket] Error:", error);
        this.isConnecting = false;
      };

      this.ws.onclose = () => {
        console.log("[WebSocket] Disconnected from server");
        this.isConnecting = false;
        this.attemptReconnect();
      };
    } catch (error) {
      console.error("[WebSocket] Connection error:", error);
      this.isConnecting = false;
      this.attemptReconnect();
    }
  }

  private attemptReconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error("[WebSocket] Max reconnection attempts reached");
      return;
    }

    this.reconnectAttempts++;
    const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);

    console.log(
      `[WebSocket] Attempting to reconnect in ${delay}ms (attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts})`,
    );

    this.reconnectTimeout = setTimeout(() => {
      this.connect();
    }, delay);
  }

  disconnect() {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
    }
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  subscribe(listener: (message: WebSocketMessage) => void) {
    this.listeners.add(listener);

    // Auto-connect when first listener subscribes
    if (this.listeners.size === 1) {
      this.connect();
    }

    return () => {
      this.listeners.delete(listener);

      // Auto-disconnect when no listeners remain
      if (this.listeners.size === 0) {
        this.disconnect();
      }
    };
  }

  send(message: unknown) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    } else {
      console.warn("[WebSocket] Cannot send message - not connected");
    }
  }

  isConnected() {
    return this.ws && this.ws.readyState === WebSocket.OPEN;
  }
}

// Singleton instance
const wsManager = new WebSocketManager();

function parseNumericSensorValue(
  value: SensorData["value"] | null | undefined,
): number | null {
  if (value === null || value === undefined) {
    return null;
  }

  if (typeof value === "number") {
    return Number.isFinite(value) ? value : null;
  }

  if (typeof value === "string") {
    const parsed = parseFloat(value.replace(",", "."));
    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
}

// Hook for generic sensor data
export function useSensorData(
  deviceId: string,
  sensorType: string,
): UseSensorDataResult {
  const [data, setData] = useState<SensorData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [connected, setConnected] = useState(false);

  const handleMessage = useCallback(
    (message: WebSocketMessage) => {
      if (message.type === "error") {
        setError(message.message || "Unknown error");
        setLoading(false);
        return;
      }

      // Update connection status
      setConnected(true);
      setError(null);

      const sensorKey = `${deviceId}_${sensorType}`;

      // Handle initial data load
      if (message.type === "initial" && message.data) {
        const allData = message.data as Record<string, SensorData>;
        setData(allData[sensorKey] || null);
        setLoading(false);
      }

      // Handle sensor updates
      if (
        message.type === "sensor_update" &&
        message.key === sensorKey &&
        message.data
      ) {
        setData(message.data as SensorData);
        setLoading(false);
      }
    },
    [deviceId, sensorType],
  );

  useEffect(() => {
    setLoading(true);

    const unsubscribe = wsManager.subscribe(handleMessage);

    // Check connection status periodically
    const interval = setInterval(() => {
      setConnected(wsManager.isConnected() || false);
    }, 1000);

    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, [handleMessage]);

  const refresh = useCallback(() => {
    // Request fresh data from server
    wsManager.send({
      type: "request_data",
      deviceId,
      sensorType,
    });
  }, [deviceId, sensorType]);

  return { data, loading, error, connected, refresh };
}

// Specialized hook for gas sensor
export function useGasSensor(deviceId: string) {
  const { data, loading, error, connected, refresh } = useSensorData(
    deviceId,
    "gas",
  );

  const gasValue = parseNumericSensorValue(data?.value) ?? 0;

  const isSafe = gasValue < 500;
  const status =
    gasValue < 300 ? "safe" : gasValue < 700 ? "warning" : "danger";

  return {
    value: gasValue,
    isSafe,
    status,
    timestamp: data?.timestamp,
    history: data?.history || [],
    loading,
    error,
    connected,
    refresh,
    hasData: !!data,
  };
}

// Specialized hook for temperature sensor
export function useTemperatureSensor(deviceId: string) {
  const { data, loading, error, connected, refresh } = useSensorData(
    deviceId,
    "temperature",
  );

  const parsedValue = parseNumericSensorValue(data?.value);
  const value = parsedValue ?? 0;

  const status =
    parsedValue === null
      ? "no-data"
      : value < 18
        ? "low"
        : value > 28
          ? "high"
          : "normal";

  return {
    value,
    status,
    timestamp: data?.timestamp,
    history: data?.history || [],
    loading,
    error,
    connected,
    refresh,
    hasData: parsedValue !== null,
  };
}

// Specialized hook for humidity sensor
export function useHumiditySensor(deviceId: string) {
  const { data, loading, error, connected, refresh } = useSensorData(
    deviceId,
    "humidity",
  );

  const parsedValue = parseNumericSensorValue(data?.value);
  const normalizedValue =
    parsedValue === null ? 0 : Math.min(100, Math.max(0, parsedValue));

  const status =
    parsedValue === null
      ? "no-data"
      : normalizedValue < 30
        ? "low"
        : normalizedValue > 70
          ? "high"
          : "normal";

  return {
    value: normalizedValue,
    status,
    timestamp: data?.timestamp,
    history: data?.history || [],
    loading,
    error,
    connected,
    refresh,
    hasData: parsedValue !== null,
  };
}

// Specialized hook for motion sensor
export function useMotionSensor(deviceId: string) {
  const { data, loading, error, connected, refresh } = useSensorData(
    deviceId,
    "motion",
  );

  // Handle string values from ESP: "detected", "clear"
  const isDetected =
    data?.value === true ||
    data?.value === 1 ||
    data?.value === "1" ||
    data?.value === "detected";

  // Find last motion detection time
  const lastMotionEvent = data?.history?.find(
    (h) =>
      h.value === true ||
      h.value === 1 ||
      h.value === "1" ||
      h.value === "detected",
  );
  const lastMotionTime = lastMotionEvent?.timestamp;

  return {
    isDetected,
    lastMotionTime,
    timestamp: data?.timestamp,
    history: data?.history || [],
    loading,
    error,
    connected,
    refresh,
  };
}

// Hook for multiple sensors
export function useMultipleSensors(
  sensors: Array<{ deviceId: string; sensorType: string }>,
) {
  const [allData, setAllData] = useState<Record<string, SensorData>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [connected, setConnected] = useState(false);

  const handleMessage = useCallback(
    (message: WebSocketMessage) => {
      if (message.type === "error") {
        setError(message.message || "Unknown error");
        return;
      }

      setConnected(true);
      setError(null);

      // Handle initial data load
      if (message.type === "initial" && message.data) {
        const initialData = message.data as Record<string, SensorData>;
        const relevantData: Record<string, SensorData> = {};

        sensors.forEach(({ deviceId, sensorType }) => {
          const key = `${deviceId}_${sensorType}`;
          if (initialData[key]) {
            relevantData[key] = initialData[key];
          }
        });

        setAllData(relevantData);
        setLoading(false);
      }

      // Handle sensor updates
      if (message.type === "sensor_update" && message.key && message.data) {
        setAllData((prev) => ({
          ...prev,
          [message.key!]: message.data as SensorData,
        }));
        setLoading(false);
      }
    },
    [sensors],
  );

  useEffect(() => {
    setLoading(true);

    const unsubscribe = wsManager.subscribe(handleMessage);

    const interval = setInterval(() => {
      setConnected(wsManager.isConnected() || false);
    }, 1000);

    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, [handleMessage]);

  return { allData, loading, error, connected };
}

// Export WebSocket manager for advanced usage
export { wsManager };
