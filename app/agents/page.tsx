import Link from "next/link";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

import { agents } from "@/lib/agents";

const AgentsPage = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[radial-gradient(circle_at_top,rgba(255,87,100,0.25),rgba(8,10,18,0.95)_55%),#05060a] text-slate-100">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute left-[-120px] top-16 h-80 w-80 rounded-full bg-brand/40 blur-[120px]" />
        <div className="absolute right-[-120px] top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-rose-500/40 blur-[140px]" />
      </div>

      <header className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 pb-8 pt-14 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex max-w-3xl flex-col gap-3">
          <span className="text-xs font-semibold uppercase tracking-[0.32em] text-rose-100">
            Diretório de especialistas
          </span>
          <h1 className="text-3xl font-semibold leading-tight text-white md:text-[40px]">
            Experiências sob medida com os agentes Sophia SPSP
          </h1>
          <p className="text-sm text-slate-200 md:text-base">
            Cada agente combina contexto operacional, conhecimento sobre o
            Protheus e atalhos de processos para acelerar decisões. Escolha a
            área e desbloqueie um chat dedicado, com histórico, atalhos e fluxos
            prontos para uso.
          </p>
        </div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 self-start rounded-full border border-white/20 px-5 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-rose-100 transition hover:border-white/40 hover:bg-white/10"
        >
          <FiArrowLeft className="h-3.5 w-3.5" aria-hidden />
          Voltar para Sophia
        </Link>
      </header>

      <main className="relative z-10 mx-auto w-full max-w-6xl flex-1 px-6 pb-16">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {agents.map((agent) => {
            const highlightFunction = agent.protheusFunctions[0];

            return (
              <Link
                key={agent.slug}
                href={`/agents/${agent.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/12 bg-white/8 p-6 pb-7 backdrop-blur transition hover:border-white/35 hover:bg-white/14"
                aria-label={agent.callToAction}
              >
                <div
                  className={`absolute inset-0 -z-10 opacity-0 transition duration-500 group-hover:opacity-100 bg-linear-to-br ${agent.accent.gradient}`}
                />
                <div
                  className={`pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full opacity-0 blur-[120px] transition duration-500 group-hover:opacity-80 ${agent.accent.glow}`}
                />

                <span
                  className={`inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] ${agent.accent.badge}`}
                >
                  {agent.name}
                </span>

                <h2 className="mt-4 text-2xl font-semibold leading-snug text-white">
                  {agent.tagline}
                </h2>
                <p className="mt-3 text-sm text-slate-100/90 line-clamp-3">
                  {agent.description}
                </p>
                <p className="mt-3 text-xs text-slate-200/85 line-clamp-3">
                  {agent.mission}
                </p>

                <ul className="mt-5 grid gap-2 text-sm text-slate-100/95">
                  {agent.focusAreas.map((area) => (
                    <li
                      key={area}
                      className="flex items-start gap-3 rounded-2xl border border-white/15 bg-white/8 px-4 py-3"
                    >
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/80" />
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>

                {highlightFunction && (
                  <div className="mt-5 rounded-2xl border border-white/12 bg-white/10 p-4 text-xs text-slate-100/90">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white">
                      Destaque Protheus · {highlightFunction.code}
                    </span>
                    <h3 className="mt-2 text-sm font-semibold text-white">
                      {highlightFunction.title}
                    </h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-white/85">
                      {highlightFunction.description}
                    </p>
                  </div>
                )}

                <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-slate-100/90">
                  <div className="flex flex-wrap gap-2">
                    {agent.keywords.slice(0, 3).map((keyword) => (
                      <span
                        key={keyword}
                        className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.16em]"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                  <span className="ml-auto inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white transition group-hover:border-white/30 group-hover:bg-white/20">
                    {agent.callToAction}
                    <FiArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </main>

      <footer className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-12 text-xs text-slate-400">
        <div className="flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} SPSP. Todos os direitos reservados.</p>
          <div className="flex items-center gap-4">
            <Link className="transition hover:text-white" href="#">
              Política de privacidade
            </Link>
            <Link className="transition hover:text-white" href="#">
              Termos de uso
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AgentsPage;
