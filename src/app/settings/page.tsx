"use client";
import { TopBar } from "@/components/TopBar";
import { PageTransition } from "@/components/PageTransition";
import { Send, Database, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState([
    { id: 'water', label: "Протечки воды", checked: true },
    { id: 'gas', label: "Утечка газа", checked: true },
    { id: 'faces', label: "Неизвестные лица", checked: true },
    { id: 'system', label: "Системные события", checked: false },
  ]);

  const toggleNotification = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, checked: !n.checked } : n
    ));
  };

  return (
    <PageTransition className="pb-20">
      <TopBar title="Настройки" />
      
      <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-5 max-w-md md:max-w-none mx-auto">
        {/* Telegram */}
        <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 h-full flex flex-col md:row-span-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
              <Send className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h2 className="text-lg font-medium">Telegram уведомления</h2>
              <p className="text-sm text-gray-400">Настройка оповещений</p>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-2">Chat ID</label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input 
                type="text" 
                defaultValue="123456789"
                className="flex-1 w-full bg-black/40 border border-white/5 text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/50"
              />
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-3 rounded-xl transition-colors shrink-0 whitespace-nowrap">
                Сохранить
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">Узнайте свой Chat ID у бота @userinfobot в Telegram</p>
          </div>

          <div className="bg-black/40 border border-white/5 rounded-2xl p-4 flex-1">
            <h3 className="font-medium mb-4 text-gray-200">Типы уведомлений</h3>
            <div className="space-y-3">
              {notifications.map((item) => (
                <label key={item.id} className="flex items-center justify-between cursor-pointer group" onClick={() => toggleNotification(item.id)}>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="text-gray-400 group-hover:text-gray-300 transition-colors">🔔</div>
                    <span className="text-gray-300">{item.label}</span>
                  </div>
                  <div className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${item.checked ? 'bg-blue-500' : 'bg-white/10'}`}>
                    {item.checked && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                  </div>
                </label>
              ))}
            </div>
          </div>
        </section>

        {/* Служебная информация */}
        <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 h-full flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center">
              <Database className="w-5 h-5 text-[#00c853]" />
            </div>
            <div>
              <h2 className="text-lg font-medium">Служебная информация</h2>
              <p className="text-sm text-gray-400">Статус системы</p>
            </div>
          </div>

          <div className="space-y-3 flex-1">
            <div className="bg-black/40 border border-white/5 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-[#00c853]">📶</div>
                <div>
                  <div className="font-medium text-gray-200">MQTT Брокер</div>
                  <div className="text-xs text-gray-400">Подключение к серверу</div>
                </div>
              </div>
              <div className="bg-emerald-500/20 text-[#00c853] text-xs px-3 py-1 rounded-full">Online</div>
            </div>

            <div className="bg-black/40 border border-white/5 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-blue-400">🕒</div>
                <div>
                  <div className="font-medium text-gray-200">Последняя синхронизация</div>
                  <div className="text-xs text-gray-400">Обновление данных</div>
                </div>
              </div>
              <div className="text-sm text-gray-400">2 минуты назад</div>
            </div>

            <div className="bg-black/40 border border-white/5 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-purple-400">🛡️</div>
                <div>
                  <div className="font-medium text-gray-200">ESP32 устройства</div>
                  <div className="text-xs text-gray-400">Подключенные контроллеры</div>
                </div>
              </div>
              <div className="text-sm text-gray-400">4 активных</div>
            </div>
          </div>
        </section>

        {/* О системе */}
        <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 h-full flex flex-col">
          <h3 className="text-lg font-medium mb-4 text-gray-300">О системе</h3>
          
          <div className="space-y-4 text-sm flex-1">
            <div className="flex justify-between border-b border-zinc-800 pb-3">
              <span className="text-gray-400">Версия системы</span>
              <span className="text-gray-300">1.0.0</span>
            </div>
            <div className="flex justify-between border-b border-zinc-800 pb-3">
              <span className="text-gray-400">Дата сборки</span>
              <span className="text-gray-300">24.02.2026</span>
            </div>
            <div className="flex justify-between pb-2">
              <span className="text-gray-400">Лицензия</span>
              <span className="text-gray-300">MIT</span>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
