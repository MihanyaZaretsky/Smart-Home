import Link from "next/link";

export function OfficeCard() {
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
              <div className="text-xl font-semibold">22°</div>
              <div className="text-xs text-gray-500">Темп.</div>
            </div>

            <div className="flex-1 rounded-2xl bg-black/40 border border-white/5 p-4 text-center">
              <div className="text-xl font-semibold">45%</div>
              <div className="text-xs text-gray-500">Влаж.</div>
            </div>
            
            <div className="flex-1 rounded-2xl bg-black/40 border border-white/5 p-4 text-center">
              <div className="text-xl font-semibold text-blue-400">Фокус</div>
              <div className="text-xs text-gray-500">Режим</div>
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
        </div>
      </section>
    </Link>
  );
}
