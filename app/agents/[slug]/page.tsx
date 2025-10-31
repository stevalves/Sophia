import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

import { agents, getAgentBySlug } from "@/lib/agents";

import AgentChat from "./agent-chat";

interface AgentPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: AgentPageProps): Promise<Metadata> {
  const { slug } = await params;
  const agent = getAgentBySlug(slug);

  if (!agent) {
    return {
      title: "Agente não encontrado • Sophia SPSP IA",
    };
  }

  return {
    title: `${agent.name} • Sophia SPSP IA`,
    description: agent.description,
    keywords: [agent.name, ...agent.keywords, "Sophia SPSP"],
    openGraph: {
      title: `${agent.name} • Sophia SPSP IA`,
      description: agent.description,
    },
  };
}

export function generateStaticParams() {
  return agents.map((agent) => ({ slug: agent.slug }));
}

export default async function AgentPage({ params }: AgentPageProps) {
  const { slug } = await params;
  const agent = getAgentBySlug(slug);

  if (!agent) {
    notFound();
  }

  const currentYear = new Date().getFullYear();
  const relatedAgents = agents
    .filter((item) => item.slug !== agent.slug)
    .slice(0, 3);

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[radial-gradient(circle_at_top,rgba(255,87,100,0.25),rgba(8,10,18,0.95)_55%),#05060a] text-slate-100">
      <div className="pointer-events-none absolute inset-0 opacity-45">
        <div className="absolute -left-28 top-20 h-96 w-96 rounded-full bg-brand/35 blur-[140px]" />
        <div className="absolute right-[-140px] top-1/2 h-[440px] w-[440px] -translate-y-1/2 rounded-full bg-rose-500/35 blur-[160px]" />
      </div>

      <header className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 pb-6 pt-12">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-rose-100">
          <Link href="/agents" className="transition hover:text-white">
            Agentes
          </Link>
          <span className="text-white/50">/</span>
          <span className="text-white">{agent.name}</span>
        </div>
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl space-y-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-rose-100">
              Agente especializado SPSP
            </span>
            <h1 className="text-3xl font-semibold leading-tight text-white md:text-[42px]">
              {agent.name}
            </h1>
            <p className="text-sm text-slate-200 md:text-base">
              {agent.tagline}
            </p>
          </div>
          <Link
            href="/agents"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-rose-100 transition hover:border-white/40 hover:bg-white/10"
          >
            <FiArrowLeft className="h-3.5 w-3.5" aria-hidden />
            Todos os agentes
          </Link>
        </div>
      </header>

      <main className="relative z-10 mx-auto w-full max-w-7xl flex-1 px-6 pb-20 pt-2 lg:px-8">
        <section
          className={`overflow-hidden rounded-4xl border border-white/12 bg-linear-to-br ${agent.accent.gradient} p-8 text-white shadow-[0_40px_120px_rgba(214,40,40,0.35)]`}
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold md:text-3xl">
                {agent.description}
              </h2>
              <p className="max-w-2xl text-sm md:text-base">{agent.mission}</p>
              <div className="flex flex-wrap gap-2 text-xs text-white/90">
                {agent.keywords.slice(0, 5).map((keyword) => (
                  <span
                    key={keyword}
                    className="rounded-full border border-white/30 bg-white/10 px-4 py-1 uppercase tracking-[0.2em]"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-white/25 bg-white/15 px-6 py-5 text-sm text-white/95">
              <span className="text-[11px] font-semibold uppercase tracking-[0.24em]">
                Como este agente atua
              </span>
              <p className="mt-3 leading-relaxed text-white/90">
                Orquestra integrações no Protheus, gera documentos e orienta
                fluxos alinhados às políticas SPSP. Utilize o chat ao lado para
                receber instruções guiadas.
              </p>
            </div>
          </div>
        </section>

        <div className="mt-12 grid gap-10 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,560px)] 2xl:grid-cols-[minmax(0,1.05fr)_minmax(0,620px)] xl:items-start">
          <div className="flex flex-col gap-8">
            <section className="rounded-3xl border border-white/12 bg-white/10 p-6 backdrop-blur">
              <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-rose-100">
                Prioridades deste agente
              </h3>
              <ul className="mt-4 grid gap-3 text-sm text-slate-100/95">
                {agent.focusAreas.map((area) => (
                  <li
                    key={area}
                    className="flex items-start gap-3 rounded-2xl border border-white/15 bg-white/8 px-4 py-3"
                  >
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-rose-200" />
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-3xl border border-white/12 bg-white/10 p-6 backdrop-blur">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-rose-100">
                  Rotinas Protheus
                </h3>
                <span className="rounded-full border border-white/15 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-rose-100">
                  {agent.protheusFunctions.length} fluxos
                </span>
              </div>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {agent.protheusFunctions.map((routine) => (
                  <div
                    key={routine.code}
                    className="flex h-full flex-col gap-3 rounded-2xl border border-white/12 bg-white/8 p-4 text-sm text-slate-100/95"
                  >
                    <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-rose-100">
                      {routine.code}
                    </span>
                    <h4 className="text-base font-semibold text-white">
                      {routine.title}
                    </h4>
                    <p className="text-sm leading-relaxed text-slate-100/85">
                      {routine.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-white/12 bg-white/10 p-6 backdrop-blur">
              <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-rose-100">
                Base de conhecimento
              </h3>
              <div className="mt-4 grid gap-4">
                {agent.knowledgeBase.map((entry, index) => (
                  <div
                    key={entry.prompt}
                    className="flex flex-col gap-3 rounded-2xl border border-white/15 bg-white/8 px-5 py-5 text-sm text-slate-100/90"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-rose-100">
                        Pergunta #{index + 1}
                      </span>
                    </div>
                    <p className="font-semibold text-white">{entry.prompt}</p>
                    <p className="leading-relaxed text-slate-100/85">
                      {entry.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {relatedAgents.length > 0 && (
              <section className="rounded-3xl border border-white/12 bg-white/10 p-6 backdrop-blur">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-rose-100">
                    Conexões complementares
                  </h3>
                  <span className="rounded-full border border-white/15 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-rose-100">
                    {relatedAgents.length}
                  </span>
                </div>
                <div className="mt-4 grid gap-3 md:grid-cols-3">
                  {relatedAgents.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/agents/${item.slug}`}
                      className="group relative flex flex-col gap-2 overflow-hidden rounded-2xl border border-white/12 bg-white/8 px-4 py-4 text-sm text-slate-100/90 transition hover:border-white/35 hover:bg-white/15"
                    >
                      <div
                        className={`pointer-events-none absolute -right-8 top-1/2 h-20 w-20 -translate-y-1/2 rounded-full blur-[80px] ${item.accent.glow}`}
                      />
                      <span className="text-sm font-semibold text-white">
                        {item.name}
                      </span>
                      <span className="text-xs text-slate-200 line-clamp-2">
                        {item.tagline}
                      </span>
                      <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-rose-100 transition group-hover:translate-x-1">
                        Acessar agente
                        <FiArrowRight className="h-3 w-3" aria-hidden />
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          <div className="flex flex-col gap-8">
            <AgentChat agent={agent} />

            <section className="rounded-3xl border border-white/12 bg-white/10 p-6 backdrop-blur">
              <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-rose-100">
                Material de apoio rápido
              </h3>
              <p className="mt-3 text-sm text-slate-100/85">
                Precisa adiantar a conversa? Compartilhe detalhes como unidade,
                número de contrato, responsável e prazos. O agente gera
                protocolos, checklists e anexos padronizados automaticamente.
              </p>
              <div className="mt-4 grid gap-2 text-xs text-slate-200">
                {agent.shortcuts.map((shortcut) => (
                  <div
                    key={shortcut}
                    className="rounded-2xl border border-white/15 bg-white/8 px-4 py-3"
                  >
                    {shortcut}
                  </div>
                ))}
              </div>
            </section>
          </div>
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
}
