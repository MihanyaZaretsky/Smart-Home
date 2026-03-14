import Link from "next/link";
import { Camera } from "lucide-react";

export function StreetCard() {
  return (
    <Link href="/street" className="block h-full">
      <section className="h-full flex flex-col justify-between rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-5 shadow-xl shadow-black/40 cursor-pointer transition-all duration-300 hover:bg-white/10 hover:shadow-2xl hover:scale-[1.02]">
        <div>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Улица</h3>
            <span className="text-xl text-gray-500">›</span>
          </div>

          <p className="mt-2 text-xs uppercase tracking-wide text-gray-500">
            Видеонаблюдение
          </p>

          <div className="mt-4 flex gap-3">
            <div className="flex-1 rounded-2xl bg-black/40 border border-white/5 p-4 flex flex-col items-center justify-center text-center">
              <Camera className="w-6 h-6 text-blue-400 mb-2" />
              <div className="text-sm font-semibold text-blue-400">Камера активна</div>
            </div>
          </div>
        </div>

        <div className="mt-4 border-t border-zinc-800 pt-3 text-xs text-gray-500">
          Последнее лицо: <strong className="text-gray-400">Ожидание данных</strong>
        </div>
      </section>
    </Link>
  );
}
