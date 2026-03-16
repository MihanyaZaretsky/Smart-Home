"use client";
import Link from "next/link";
import { useMotionSensor } from "@/hooks/useSensorData";

const MOTION_DEVICE_ID = "esp_hallway_01";

export function HallwayCard() {
  const { isDetected } = useMotionSensor(MOTION_DEVICE_ID);

  return (
    <Link href="/hallway" className="block h-full">
      <section className="h-full flex flex-col justify-between rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-5 shadow-xl shadow-black/40 transition-all duration-300 hover:bg-white/10 hover:shadow-2xl hover:scale-[1.02]">
        <div>
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Прихожая</h3>
            <span className="text-xl text-gray-500">›</span>
          </div>

          <p className="mt-2 text-xs uppercase tracking-wide text-gray-500">
            Освещение
          </p>

          {/* Карточка освещения */}
          <div className="mt-4 flex items-center gap-4 rounded-2xl bg-black/40 border border-white/5 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/20">
              <svg
                className="h-6 w-6 text-amber-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="text-lg font-semibold text-amber-400">ВКЛ</div>
              <div className="text-xs text-gray-500">Статус</div>
            </div>
          </div>

          {/* Блок яркости */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Яркость</span>
              <span className="font-semibold text-amber-400">75%</span>
            </div>
            <div className="mt-2 h-1.5 rounded-full bg-zinc-700">
              <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-amber-500 to-amber-400" />
            </div>
          </div>

          {/* Движение */}
          <div className="mt-4 flex items-center gap-2">
            <div
              className={`h-1.5 w-1.5 rounded-full ${isDetected ? "bg-emerald-400" : "bg-gray-500"}`}
            />
            <span className="text-sm text-gray-400">
              {isDetected ? "Движение обнаружено" : "Движения нет"}
            </span>
          </div>
        </div>

        {/* Кнопка по датчику движения */}
        <div className="mt-4 flex items-center gap-3 rounded-xl border border-blue-500/50 bg-blue-500/10 p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/20">
            <svg
              className="h-5 w-5 text-blue-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M7 2v11h3v9l7-12h-4l4-8z" />
            </svg>
          </div>
          <div>
            <div className="text-sm font-medium text-blue-400">
              По датчику движения
            </div>
            <div className="text-xs text-gray-500">Активный режим</div>
          </div>
        </div>
      </section>
    </Link>
  );
}
