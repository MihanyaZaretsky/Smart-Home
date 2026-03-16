import Link from "next/link";

export function BathroomCard() {
  return (
    <Link href="/bathroom" className="block h-full">
      <section className="h-full flex flex-col justify-between rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-5 shadow-xl shadow-black/40 transition-all duration-300 hover:bg-white/10 hover:shadow-2xl hover:scale-[1.02]">
        <div>
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Ванная</h3>
            <span className="text-xl text-gray-500">›</span>
          </div>

          <p className="mt-2 text-xs uppercase tracking-wide text-gray-500">
            Защита от протечек
          </p>

          {/* Grid карточек */}
          <div className="mt-4 grid grid-cols-2 gap-4">
            {/* Датчик протечки */}
            <div className="rounded-2xl bg-black/40 border border-white/5 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/20">
                <svg className="h-5 w-5 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8zm0 18c-3.35 0-6-2.57-6-6.2 0-2.34 1.95-5.44 6-9.14 4.05 3.7 6 6.79 6 9.14 0 3.63-2.65 6.2-6 6.2z"/>
                </svg>
              </div>
              <div className="mt-3 text-lg font-semibold text-cyan-400">Сухо</div>
              <div className="text-xs text-gray-500">Датчик протечки</div>
            </div>

            {/* Кран */}
            <div className="rounded-2xl bg-black/40 border border-white/5 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/20">
                <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.07.64-.07.94s.03.63.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
                </svg>
              </div>
              <div className="mt-3 text-lg font-semibold text-blue-400">Открыт</div>
              <div className="text-xs text-gray-500">Кран</div>
            </div>
          </div>
        </div>

        {/* Success Banner */}
        <div className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 py-3">
          <svg className="h-4 w-4 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
          </svg>
          <span className="text-sm text-emerald-400">Система защиты активна</span>
        </div>
      </section>
    </Link>
  );
}
