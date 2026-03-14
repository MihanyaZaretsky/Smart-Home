import { TopBar } from "@/components/TopBar";
import { PageTransition } from "@/components/PageTransition";
import { Search, Filter, Calendar } from "lucide-react";

export default function EventsPage() {
  return (
    <PageTransition>
      <TopBar title="Журнал событий" />
      
      <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-5 max-w-md md:max-w-none mx-auto">
        <div className="md:col-span-1 space-y-5">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input 
              type="text" 
              placeholder="Поиск по событиям..." 
              className="w-full bg-white/5 backdrop-blur-xl border border-white/10 text-white rounded-2xl py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
            />
          </div>

          {/* Filters */}
          <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5">
            <div className="flex items-center gap-2 text-gray-400 mb-4">
              <Filter className="w-5 h-5" />
              <span className="font-medium">Фильтры</span>
            </div>

            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-400 mb-2">По комнате</div>
                <div className="flex flex-wrap gap-2">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-xl text-sm font-medium">Все комнаты</button>
                  <button className="bg-white/10 text-gray-300 px-4 py-2 rounded-xl text-sm font-medium">Прихожая</button>
                  <button className="bg-white/10 text-gray-300 px-4 py-2 rounded-xl text-sm font-medium">Кабинет</button>
                  <button className="bg-white/10 text-gray-300 px-4 py-2 rounded-xl text-sm font-medium">Кухня</button>
                  <button className="bg-white/10 text-gray-300 px-4 py-2 rounded-xl text-sm font-medium">Ванная</button>
                  <button className="bg-white/10 text-gray-300 px-4 py-2 rounded-xl text-sm font-medium">Улица</button>
                </div>
              </div>

              <div>
                <div className="text-sm text-gray-400 mb-2">По типу</div>
                <div className="flex flex-wrap gap-2">
                  <button className="bg-[#a855f7] text-white px-4 py-2 rounded-xl text-sm font-medium">Информация</button>
                  <button className="bg-[#a855f7] text-white px-4 py-2 rounded-xl text-sm font-medium">Предупреждения</button>
                  <button className="bg-[#a855f7] text-white px-4 py-2 rounded-xl text-sm font-medium">Тревоги</button>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="md:col-span-2 space-y-5">
          {/* Events List */}
          <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-200">События (18)</h3>
              <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                <Calendar className="w-4 h-4" />
                Выбрать период
              </button>
            </div>

            <div className="space-y-3">
              {[
                { time: "17:24", date: "23.02.2026", room: "Прихожая", type: "Инфо", text: "Свет включен по движению" },
                { time: "17:22", date: "23.02.2026", room: "Прихожая", type: "Инфо", text: "Автоматизация возобновлена" },
                { time: "16:15", date: "23.02.2026", room: "Улица", type: "Инфо", text: "Распознан пользователь: Администратор" },
              ].map((event, i) => (
                <div key={i} className="bg-black/40 border border-white/5 rounded-2xl p-4 flex gap-4">
                  <div className="text-sm text-gray-500 min-w-[70px]">
                    <div>{event.time}</div>
                    <div className="text-xs">{event.date}</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm text-gray-400">{event.room}</span>
                      <span className="text-gray-600">•</span>
                      <span className="bg-blue-500/20 text-blue-400 text-xs px-2 py-0.5 rounded-md">{event.type}</span>
                    </div>
                    <div className="font-medium text-gray-200">{event.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </PageTransition>
  );
}
