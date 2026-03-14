import Link from "next/link";

export function KitchenCard() {
  return (
    <Link href="/kitchen" className="block h-full">
      <section className="h-full flex flex-col justify-between rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-5 shadow-xl shadow-black/40 transition-all duration-300 hover:bg-white/10 hover:shadow-2xl hover:scale-[1.02]">
        <div>
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Кухня</h3>
            <span className="text-xl text-gray-500">›</span>
          </div>

          <p className="mt-2 text-xs uppercase tracking-wide text-gray-500">
            Контроль газа и вентиляция
          </p>

          {/* Grid карточек */}
          <div className="mt-4 grid grid-cols-2 gap-4">
            {/* Газ */}
            <div className="rounded-2xl bg-black/40 border border-white/5 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20">
                <svg
                  className="h-5 w-5 text-emerald-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"
                  />
                </svg>
              </div>
              <div className="mt-3 text-lg font-semibold text-emerald-400">
                Норма
              </div>
              <div className="text-xs text-gray-500">Газ</div>
            </div>

            {/* Вентилятор */}
            <div className="rounded-2xl bg-black/40 border border-white/5 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-800">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <div className="mt-3 text-lg font-semibold text-gray-400">
                Выкл
              </div>
              <div className="text-xs text-gray-500">Вентилятор</div>
            </div>
          </div>
        </div>

        {/* Success Banner */}
        <div className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 py-3">
          <svg
            className="h-4 w-4 text-emerald-400"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
          <span className="text-sm text-emerald-400">
            Автоматический контроль активен
          </span>
        </div>
      </section>
    </Link>
  );
}
