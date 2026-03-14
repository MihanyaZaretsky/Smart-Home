"use client";
import { TopBar } from "@/components/TopBar";
import { PageTransition } from "@/components/PageTransition";
import { Lightbulb, Eye, Zap } from "lucide-react";
import { useState } from "react";
import { useMotionSensor } from "@/hooks/useSensorData";

const MOTION_DEVICE_ID = "esp_hallway_01";

export default function HallwayPage() {
  const [brightness, setBrightness] = useState(75);
  const [timeout, setTimeout] = useState(2);
  const { isDetected, lastMotionTime, loading } =
    useMotionSensor(MOTION_DEVICE_ID);

  const formatLastMotionTime = (timestamp?: string) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

    // If timestamp is invalid or in the future
    if (diff < 0 || diff > 86400 * 365) return "";
    if (diff < 60) return "Только что";
    if (diff < 3600) return `${Math.floor(diff / 60)} мин назад`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} ч назад`;
    return `${Math.floor(diff / 86400)} дн назад`;
  };

  return (
    <PageTransition className="pb-20">
      <TopBar title="Прихожая" showSettings />
      
      <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-5 max-w-md md:max-w-none mx-auto">
        {/* Умная лампа */}
        <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 relative overflow-hidden h-full flex flex-col">
          <div className="absolute top-0 right-0 p-5">
            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all ${brightness > 0 ? "bg-[#ffb300] shadow-[0_0_30px_rgba(255,179,0,0.5)]" : "bg-gray-700"}`}
            >
              <Lightbulb
                className={`w-8 h-8 ${brightness > 0 ? "text-white" : "text-gray-400"}`}
              />
            </div>
          </div>

          <h2 className="text-xl font-medium">Умная лампа</h2>
          <p className="text-sm text-gray-400 mt-1">Основное освещение</p>

          <div className="mt-8 flex justify-between items-end flex-1">
            <div className="text-sm text-gray-400">Яркость</div>
            <div className="text-4xl font-light">{brightness}%</div>
          </div>

          <input
            type="range"
            min="0"
            max="100"
            value={brightness}
            onChange={(e) => setBrightness(Number(e.target.value))}
            className="w-full h-2 mt-4 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#ffb300]"
          />

          <div className="mt-6 flex items-center gap-4 text-sm">
            {brightness > 0 ? (
              <div className="flex items-center gap-2 text-[#00c853]">
                <div className="w-2 h-2 rounded-full bg-[#00c853]" />
                Включено
              </div>
            ) : (
              <div className="flex items-center gap-2 text-gray-500">
                <div className="w-2 h-2 rounded-full bg-gray-500" />
                Выключено
              </div>
            )}
            <div className="flex items-center gap-2 text-gray-400">
              <Eye className="w-4 h-4" />
              {loading ? (
                "Загрузка..."
              ) : isDetected ? (
                <span className="text-[#00c853]">Движение обнаружено</span>
              ) : lastMotionTime ? (
                <span>Движения нет {formatLastMotionTime(lastMotionTime)}</span>
              ) : (
                <span>Движения нет</span>
              )}
            </div>
          </div>
        </section>

        {/* Настройка датчика движения */}
        <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 h-full flex flex-col">
          <h3 className="text-lg font-medium mb-4 text-gray-300">
            Настройка датчика движения
          </h3>

          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-400">Выключать свет через:</span>
            <span className="font-medium">{timeout} мин</span>
          </div>

          <input
            type="range"
            min="1"
            max="30"
            value={timeout}
            onChange={(e) => setTimeout(Number(e.target.value))}
            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>1 мин</span>
            <span>30 мин</span>
          </div>

          <div className="mt-6 bg-blue-500/20 border border-blue-900/50 rounded-2xl p-4 flex-1">
            <div className="flex items-center gap-2 text-blue-400 font-medium mb-2">
              <Zap className="w-4 h-4 text-orange-400" />
              Автоматический режим
            </div>
            <p className="text-sm text-gray-400">
              Свет включается при обнаружении движения и выключается через{" "}
              {timeout} мин отсутствия движения
            </p>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
