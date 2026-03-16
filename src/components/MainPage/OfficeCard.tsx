"use client";

import Link from "next/link";
import {
  useHumiditySensor,
  useTemperatureSensor,
} from "@/hooks/useSensorData";

const OFFICE_DEVICE_ID = "esp_office_01";

export function OfficeCard() {
  const temperature = useTemperatureSensor(OFFICE_DEVICE_ID);
  const humidity = useHumiditySensor(OFFICE_DEVICE_ID);

  const hasAnyData = temperature.hasData || humidity.hasData;
  const loading = temperature.loading || humidity.loading;

  const temperatureLabel = temperature.hasData
    ? `${temperature.value.toFixed(1)}°`
    : loading
      ? "..."
      : "--";

  const humidityLabel = humidity.hasData
    ? `${Math.round(humidity.value)}%`
    : loading
      ? "..."
      : "--";

  const connectionOnline = temperature.connected || humidity.connected;

  return (
    <Link href="/office" className="block h-full">
      <section className="h-full flex flex-col justify-between rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-5 shadow-xl shadow-black/40 cursor-pointer transition-all duration-300 hover:bg-white/10 hover:shadow-2xl hover:scale-[1.02]">
        <div>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Кабинет</h3>
            <span className="text-xl text-gray-500">›</span>
          </div>

          <p className="mt-2 text-xs uppercase tracking-wide text-gray-500">
            Управление средой
          </p>

          <div className="mt-4 flex gap-3">
            <div className="flex-1 rounded-2xl bg-black/40 border border-white/5 p-4 text-center">
              <div className="text-xl font-semibold">{temperatureLabel}</div>
              <div className="text-xs text-gray-500">Темп.</div>
            </div>

            <div className="flex-1 rounded-2xl bg-black/40 border border-white/5 p-4 text-center">
              <div className="text-xl font-semibold">{humidityLabel}</div>
              <div className="text-xs text-gray-500">Влаж.</div>
            </div>
            
            <div className="flex-1 rounded-2xl bg-black/40 border border-white/5 p-4 text-center">
              <div
                className={`text-xl font-semibold ${connectionOnline ? "text-emerald-400" : "text-red-400"}`}
              >
                {connectionOnline ? "Онлайн" : "Оффлайн"}
              </div>
              <div className="text-xs text-gray-500">Связь</div>
            </div>
          </div>

          <div className="mt-5 text-sm text-gray-300">
            <div className="mb-1">
              Окно: <strong className="text-white">Закрыто</strong>
            </div>
            <div>
              Увлажнитель: <strong className="text-white">Выключен</strong>
            </div>
          </div>

          <div className="mt-3 text-xs text-gray-500">
            {!connectionOnline
              ? "Нет соединения с WebSocket"
              : loading
                ? "Ожидание данных от датчиков"
                : hasAnyData
                  ? "Данные обновляются в реальном времени"
                  : "Подключено, но данных пока нет"}
          </div>
        </div>
      </section>
    </Link>
  );
}
