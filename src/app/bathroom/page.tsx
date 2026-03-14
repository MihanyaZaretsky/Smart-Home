import { TopBar } from "@/components/TopBar";
import { PageTransition } from "@/components/PageTransition";
import { Droplet, Droplets, CheckCircle2, Info, Settings2 } from "lucide-react";

export default function BathroomPage() {
  return (
    <PageTransition className="pb-20">
      <TopBar title="Ванная" showSettings />
      
      <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-5 max-w-md md:max-w-none mx-auto">
        {/* Датчик протечки */}
        <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 relative overflow-hidden h-full flex flex-col">
          <div className="absolute top-0 right-0 p-5">
            <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Droplet className="w-6 h-6 text-white" />
            </div>
          </div>
          
          <h2 className="text-xl font-medium">Датчик протечки</h2>
          <p className="text-sm text-gray-400 mt-1">Защита от повреждений водой</p>
          
          <div className="mt-8 flex-1">
            <div className="text-5xl font-light text-blue-400">Сухо</div>
            <p className="text-sm text-gray-400 mt-2">Текущий статус</p>
          </div>
          
          <div className="mt-6 flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2 text-blue-400">
              <div className="w-2 h-2 rounded-full bg-blue-400" />
              Датчик сухой
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <div className="w-4 h-4 rounded-full border-2 border-gray-400 border-t-transparent" />
              Проверено 30 сек назад
            </div>
          </div>
        </section>

        {/* Аварийное управление */}
        <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 h-full flex flex-col">
          <h3 className="text-lg font-medium mb-4 text-gray-300">Аварийное управление</h3>
          <div className="flex-1 flex flex-col justify-center">
            <button className="w-full bg-[#00c853] hover:bg-[#00e676] text-white font-medium py-4 rounded-2xl transition-colors flex items-center justify-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              Сброс аварии / Открыть воду
            </button>
            
            <div className="mt-4 bg-blue-500/20 border border-blue-900/50 rounded-2xl p-4">
              <div className="flex items-center gap-2 text-blue-400 font-medium mb-1">
                <Info className="w-4 h-4" />
                Важная информация
              </div>
              <p className="text-sm text-gray-400">
                Кнопка становится активной только после того, как датчик перестанет обнаруживать влагу
              </p>
            </div>
          </div>
        </section>

        {/* Запорный механизм */}
        <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 h-full flex flex-col">
          <h3 className="text-lg font-medium mb-4 text-gray-300">Запорный механизм</h3>
          <div className="bg-black/40 border border-white/5 rounded-2xl p-4 flex items-center gap-4 flex-1">
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
              <Droplets className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-sm text-gray-400">Положение крана</div>
              <div className="text-xl font-medium text-blue-400">Открыт</div>
            </div>
          </div>
        </section>

        {/* Система защиты */}
        <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 h-full flex flex-col">
          <h3 className="text-lg font-medium mb-4 text-gray-300">Система защиты</h3>
          
          <div className="space-y-4 flex-1">
            <div className="flex gap-4">
              <div className="mt-1"><Droplet className="w-5 h-5 text-blue-400" /></div>
              <div>
                <div className="font-medium text-gray-200">Непрерывный мониторинг</div>
                <div className="text-sm text-gray-400">Датчик проверяет наличие влаги каждые 2 секунды</div>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="mt-1"><Settings2 className="w-5 h-5 text-orange-400" /></div>
              <div>
                <div className="font-medium text-gray-200">Автоматическое перекрытие</div>
                <div className="text-sm text-gray-400">При обнаружении воды кран поворачивается на 90° за 2 секунды</div>
              </div>
            </div>
             <div className="flex gap-4">
              <div className="mt-1"><Droplets className="w-5 h-5 text-purple-400" /></div>
              <div>
                <div className="font-medium text-gray-200">Telegram уведомления</div>
                <div className="text-sm text-gray-400">Мгновенное уведомление о срабатывании датчика</div>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-emerald-500/10 border border-green-900/50 rounded-2xl p-4">
            <div className="flex items-center gap-2 text-[#00c853] font-medium mb-1">
              <CheckCircle2 className="w-4 h-4" />
              Система защиты активна
            </div>
            <p className="text-sm text-gray-400">
              Непрерывный контроль протечек работает
            </p>
          </div>
        </section>

        <button className="md:col-span-2 w-full bg-amber-500/20 hover:bg-amber-500/30 text-[#ffb300] font-medium py-4 rounded-2xl transition-colors mt-2">
          Симуляция протечки
        </button>
      </div>
    </PageTransition>
  );
}
