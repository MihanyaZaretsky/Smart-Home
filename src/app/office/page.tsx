"use client";
import { useState } from "react";
import { ClimateIndicators } from "@/components/Office/ClimateIndicators";
import { AutomationThresholds } from "@/components/Office/AutomationThresholds";
import { ManualControls } from "@/components/Office/ManualControls";
import { PageTransition } from "@/components/PageTransition";
import { TopBar } from "@/components/TopBar";
import { Brain, Coffee, Settings2, Power } from "lucide-react";

type EnvironmentMode = "focus" | "rest" | "manual" | "off";

export default function OfficePage() {
  const [mode, setMode] = useState<EnvironmentMode>("manual");

  const handleModeChange = (newMode: EnvironmentMode) => {
    setMode(newMode);
    if (newMode === "focus" || newMode === "rest") {
      // Play sound logic would go here (e.g., sending command to ESP)
      console.log(`Playing sound for ${newMode} mode`);
    }
  };

  return (
    <PageTransition className="pb-20">
      <TopBar title="Кабинет" showSettings />
      
      <div className="p-5 max-w-md md:max-w-none mx-auto space-y-5">
        
        {/* Environment Mode Selector */}
        <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 shadow-xl shadow-black/40">
          <h3 className="text-lg font-semibold mb-4">Управление средой</h3>
          <div className="grid grid-cols-4 gap-2">
            <button
              onClick={() => handleModeChange("focus")}
              className={`flex flex-col items-center justify-center p-3 rounded-2xl transition-all ${
                mode === "focus" ? "bg-blue-500/20 border border-blue-500/50 text-blue-400" : "bg-black/40 border border-white/5 text-gray-400 hover:bg-white/10"
              }`}
            >
              <Brain className="w-6 h-6 mb-2" />
              <span className="text-xs font-medium">Фокус</span>
            </button>
            <button
              onClick={() => handleModeChange("rest")}
              className={`flex flex-col items-center justify-center p-3 rounded-2xl transition-all ${
                mode === "rest" ? "bg-emerald-500/20 border border-emerald-500/50 text-emerald-400" : "bg-black/40 border border-white/5 text-gray-400 hover:bg-white/10"
              }`}
            >
              <Coffee className="w-6 h-6 mb-2" />
              <span className="text-xs font-medium">Отдых</span>
            </button>
            <button
              onClick={() => handleModeChange("manual")}
              className={`flex flex-col items-center justify-center p-3 rounded-2xl transition-all ${
                mode === "manual" ? "bg-amber-500/20 border border-amber-500/50 text-amber-400" : "bg-black/40 border border-white/5 text-gray-400 hover:bg-white/10"
              }`}
            >
              <Settings2 className="w-6 h-6 mb-2" />
              <span className="text-xs font-medium">Ручной</span>
            </button>
            <button
              onClick={() => handleModeChange("off")}
              className={`flex flex-col items-center justify-center p-3 rounded-2xl transition-all ${
                mode === "off" ? "bg-red-500/20 border border-red-500/50 text-red-400" : "bg-black/40 border border-white/5 text-gray-400 hover:bg-white/10"
              }`}
            >
              <Power className="w-6 h-6 mb-2" />
              <span className="text-xs font-medium">Выкл</span>
            </button>
          </div>
        </section>

        {/* Dynamic Content based on mode */}
        {mode === "manual" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <AutomationThresholds />
            <ClimateIndicators />
            <ManualControls />
          </div>
        )}

        {(mode === "focus" || mode === "rest") && (
          <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 shadow-xl shadow-black/40 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-lg font-semibold mb-4">
              {mode === "focus" ? "Режим «Фокус» активен" : "Режим «Отдых» активен"}
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-black/40 border border-white/5 rounded-2xl p-4">
                <span className="text-gray-400">Освещение</span>
                <span className="font-medium text-white">
                  {mode === "focus" ? "Холодный белый (4500K), 80%" : "Теплый желтый (2700K), 30%"}
                </span>
              </div>
              <div className="flex justify-between items-center bg-black/40 border border-white/5 rounded-2xl p-4">
                <span className="text-gray-400">Климат</span>
                <span className="font-medium text-white">
                  {mode === "focus" ? "20°C, Влажность 40%" : "23°C, Влажность 50%"}
                </span>
              </div>
              <div className="flex justify-between items-center bg-black/40 border border-white/5 rounded-2xl p-4">
                <span className="text-gray-400">Аудиофон</span>
                <span className="font-medium text-white">
                  {mode === "focus" ? "Белый шум / Природа" : "Спокойная музыка"}
                </span>
              </div>
            </div>
          </section>
        )}
      </div>
    </PageTransition>
  );
}
