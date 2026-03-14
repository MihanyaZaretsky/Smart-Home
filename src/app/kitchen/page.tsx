"use client";
import { TopBar } from "@/components/TopBar";
import { PageTransition } from "@/components/PageTransition";
import { Wind, Activity, CheckCircle2, Smartphone } from "lucide-react";
import { useGasSensor } from "@/hooks/useSensorData";

const GAS_DEVICE_ID = "esp_kitchen_01";

export default function KitchenPage() {
  const { value, isSafe, status, loading, history, hasData } =
    useGasSensor(GAS_DEVICE_ID);

  const getStatusText = () => {
    if (loading) return "Загрузка...";
    if (!hasData) return "Нет данных";
    if (status === "safe") return "Норма";
    if (status === "warning") return "Внимание";
    return "Опасность";
  };

  const getStatusColor = () => {
    if (status === "safe") return "#00e676";
    if (status === "warning") return "#ffb300";
    return "#ff1744";
  };

  const getHistoryData = () => {
    if (history.length === 0)
      return [40, 45, 42, 50, 48, 45, 43, 40, 42, 45, 48, 50, 45, 42, 40];
    return history
      .slice(0, 15)
      .map((h: { value: number | boolean | string; timestamp: string }) => {
        const numValue = typeof h.value === "number" ? h.value : 0;
        return Math.min(100, (numValue / 1000) * 100);
      });
  };

  return (
    <PageTransition className="pb-20">
      <TopBar title="Кухня" showSettings />

      <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-5 max-w-md md:max-w-none mx-auto">
        {/* Датчик газа */}
        <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 relative overflow-hidden h-full flex flex-col">
          <div className="absolute top-0 right-0 p-5">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-colors"
              style={{
                backgroundColor: getStatusColor(),
                boxShadow: `0 0 30px ${getStatusColor()}40`,
              }}
            >
              <Wind className="w-6 h-6 text-white" />
            </div>
          </div>

          <h2 className="text-xl font-medium">Датчик газа</h2>
          <p className="text-sm text-gray-400 mt-1">Контроль утечки CO/CO₂</p>

          <div className="mt-8 flex-1">
            <div
              className="text-5xl font-light"
              style={{ color: getStatusColor() }}
            >
              {getStatusText()}
            </div>
            <p className="text-sm text-gray-400 mt-2">
              {loading
                ? "Получение данных..."
                : hasData
                  ? `Уровень: ${Math.round(value)}`
                  : "Ожидание данных от ESP..."}
            </p>
          </div>

          <div
            className="mt-6 flex items-center gap-2 text-sm"
            style={{ color: getStatusColor() }}
          >
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: getStatusColor() }}
            />
            {isSafe ? "Безопасный уровень" : "Требуется внимание"}
          </div>
        </section>

        {/* Управление вентиляцией */}
        <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 h-full flex flex-col">
          <h3 className="text-lg font-medium mb-4 text-gray-300">
            Управление вентиляцией
          </h3>
          <div className="bg-black/40 border border-white/5 rounded-2xl p-4 flex items-center justify-between flex-1">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                <Wind className="w-6 h-6 text-gray-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Вентилятор</div>
                <div className="text-xl font-medium text-gray-300">
                  Выключен
                </div>
              </div>
            </div>
            <button className="bg-[#00e676] hover:bg-[#00c853] text-white font-medium px-6 py-3 rounded-xl transition-colors">
              Включить
            </button>
          </div>
        </section>

        {/* История показаний */}
        <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 h-full flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-300">
              История показаний
            </h3>
            <Activity className="w-5 h-5 text-gray-500" />
          </div>

          <div className="h-32 flex items-end gap-1 flex-1">
            {getHistoryData().map((h: number, i: number) => (
              <div
                key={i}
                className="flex-1 rounded-t-sm transition-all"
                style={{
                  height: `${h}%`,
                  backgroundColor:
                    h > 70 ? "#ff1744" : h > 40 ? "#ffb300" : "#00e676",
                }}
              />
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>10 мин назад</span>
            <span>Сейчас</span>
          </div>
        </section>

        {/* Автоматический контроль */}
        <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 h-full flex flex-col">
          <h3 className="text-lg font-medium mb-4 text-gray-300">
            Автоматический контроль
          </h3>

          <div className="space-y-4 flex-1">
            <div className="flex gap-4">
              <div className="mt-1 w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4 text-[#00c853]" />
              </div>
              <div>
                <div className="font-medium text-gray-200">
                  Мониторинг CO/CO₂
                </div>
                <div className="text-sm text-gray-400">
                  Непрерывный контроль уровня углекислого и угарного газа
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="mt-1 w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                <Wind className="w-4 h-4 text-blue-400" />
              </div>
              <div>
                <div className="font-medium text-gray-200">
                  Автовключение вентиляции
                </div>
                <div className="text-sm text-gray-400">
                  При превышении порога вентилятор включается автоматически
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="mt-1 w-6 h-6 rounded-full bg-purple-900/30 flex items-center justify-center shrink-0">
                <Smartphone className="w-4 h-4 text-purple-400" />
              </div>
              <div>
                <div className="font-medium text-gray-200">
                  Telegram уведомления
                </div>
                <div className="text-sm text-gray-400">
                  При обнаружении утечки отправляется сообщение в Telegram
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4">
            <div className="flex items-center gap-2 text-[#00c853] font-medium mb-1">
              <CheckCircle2 className="w-4 h-4" />
              Система защиты активна
            </div>
            <p className="text-sm text-gray-400">
              Автоматический контроль работает в штатном режиме
            </p>
          </div>
        </section>

        <button className="md:col-span-2 w-full bg-amber-500/20 hover:bg-amber-500/30 text-[#ffb300] font-medium py-4 rounded-2xl transition-colors mt-2">
          Симуляция утечки
        </button>
      </div>
    </PageTransition>
  );
}
