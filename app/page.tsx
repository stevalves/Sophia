"use client";

import Link from "next/link";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { FiArrowRight } from "react-icons/fi";

import { agents, getAgentBySlug, type Agent } from "@/lib/agents";

type SuggestedAgent = Pick<
  Agent,
  "slug" | "name" | "tagline" | "callToAction" | "accent"
>;

type ChatMessage = {
  id: number;
  role: "user" | "assistant";
  content: string;
  meta: string;
  suggestedAgent?: SuggestedAgent;
};

const normalizeText = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

type QuickResponse = {
  answer: string;
  slug?: string;
};

const quickResponseEntries: Array<[string, QuickResponse]> = [
  [
    "Como solicitar reembolso de despesas médicas?",
    {
      answer:
        "Envie o formulário de reembolso pelo Portal do Colaborador em > Benefícios > Saúde. Anexe os recibos digitalizados e acompanhe o status em até 5 dias úteis.",
      slug: "rescisao-beneficios",
    },
  ],
  [
    "Quais são os benefícios disponíveis para estagiários?",
    {
      answer:
        "Estagiários contam com vale-transporte, acesso à plataforma de treinamentos SPSP Academy e acompanhamento mensal do gestor. Consulte o guia do programa em Pessoas > Estágio.",
      slug: "recursos-humanos",
    },
  ],
  [
    "Como registrar um chamado para suporte de TI?",
    {
      answer:
        "Acesse o Service Desk SPSP, escolha a categoria 'Suporte de TI' e descreva o problema. O time técnico recebe a notificação instantaneamente e acompanha via SLA interno.",
      slug: "nexti",
    },
  ],
  [
    "Onde encontro o calendário de treinamentos obrigatórios?",
    {
      answer:
        "O calendário está no Portal do Colaborador em Treinamentos > Obrigatórios. Posso enviar diretamente o link com os próximos encontros e prazos de conclusão.",
      slug: "recursos-humanos",
    },
  ],
  [
    "Qual fluxo para ajuste de contrato com o cliente?",
    {
      answer:
        "Abra um chamado em Contratos > Ajustes, anexando a solicitação formal e os documentos de respaldo. Posso adiantar um checklist para conferência das cláusulas.",
      slug: "contratos",
    },
  ],
  [
    "Como antecipar recebíveis pendentes?",
    {
      answer:
        "No Portal Financeiro, acesse Recebíveis > Antecipação e selecione os títulos. Posso reunir projeções de caixa para apoiar a decisão.",
      slug: "financeiro",
    },
  ],
  [
    "Preciso atualizar dados de patrimônio urgente, como fazer?",
    {
      answer:
        "Utilize o módulo de Patrimônio > Movimentações imediatas. Informe o motivo da atualização e o destino do bem. Posso gerar o protocolo automaticamente.",
      slug: "ativos",
    },
  ],
  [
    "Existe guia para abertura de ocorrência operacional?",
    {
      answer:
        "Sim! No painel Operação > Ocorrências você encontra o roteiro passo a passo, com campos obrigatórios e anexos padrão.",
      slug: "operacao",
    },
  ],
  [
    "Onde consulto tributos pendentes deste mês?",
    {
      answer:
        "Abra o cockpit Fiscal > Obrigações do mês. Posso destacar as guias com vencimento próximo e enviar lembretes para o time responsável.",
      slug: "fiscal",
    },
  ],
  [
    "Como solicitar atualização no PROTHEUS?",
    {
      answer:
        "No hub NEXTI, escolha a jornada PROTHEUS > Atualizações. Registre o ambiente, a versão desejada e o impacto previsto para receber o plano de execução.",
      slug: "protheus",
    },
  ],
];

const quickResponses = quickResponseEntries.reduce<
  Record<string, QuickResponse>
>((accumulator, [prompt, payload]) => {
  accumulator[normalizeText(prompt)] = payload;
  return accumulator;
}, {});

const quickPrompts = quickResponseEntries.slice(0, 6).map(([prompt]) => prompt);

const resolveAgentForQuestion = (question: string): Agent | null => {
  const normalized = normalizeText(question);

  const quickResponse = quickResponses[normalized];
  if (quickResponse?.slug) {
    const fromQuick = getAgentBySlug(quickResponse.slug);
    if (fromQuick) {
      return fromQuick;
    }
  }

  return (
    agents.find((agent) => {
      const nameNormalized = normalizeText(agent.name);
      if (normalized.includes(nameNormalized)) {
        return true;
      }

      return agent.keywords.some((keyword) =>
        normalized.includes(normalizeText(keyword))
      );
    }) ?? null
  );
};

const synthesizeResponse = (
  question: string,
  matchedAgent: Agent | null,
  quickAnswer?: string
) => {
  if (quickAnswer && matchedAgent) {
    return `${quickAnswer} Se preferir, posso conectar você rapidamente ao agente ${matchedAgent.name} para continuar a tratativa.`;
  }

  if (quickAnswer) {
    return quickAnswer;
  }

  if (matchedAgent) {
    return `Percebi que essa demanda conversa com ${matchedAgent.name}. Posso encaminhar você para o agente especializado ou seguir com orientações gerais por aqui.`;
  }

  const normalizedQuestion = question.trim();

  if (normalizedQuestion.length === 0) {
    return "Estou pronta para receber sua dúvida.";
  }

  return `Vamos avançar juntos nessa dúvida sobre "${normalizedQuestion}". Conte mais detalhes ou envie anexos se precisar.`;
};

export default function Home() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isAssistantTyping, setIsAssistantTyping] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const responseDelayRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const typingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const typingStateRef = useRef<{
    messageId: number;
    fullText: string;
    metaLabel: string;
  } | null>(null);
  const nextMessageId = useRef(1);
  const chatBodyRef = useRef<HTMLDivElement | null>(null);

  const stopAssistantTyping = useCallback(
    ({
      finalize = false,
      updateState = true,
    }: { finalize?: boolean; updateState?: boolean } = {}) => {
      if (responseDelayRef.current) {
        clearTimeout(responseDelayRef.current);
        responseDelayRef.current = null;
      }

      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
        typingIntervalRef.current = null;
      }

      const activeState = typingStateRef.current;

      if (finalize && updateState && activeState) {
        setMessages((prev) =>
          prev.map((message) =>
            message.id === activeState.messageId
              ? {
                  ...message,
                  content: activeState.fullText,
                  meta: `${activeState.metaLabel} • agora`,
                }
              : message
          )
        );
      }

      typingStateRef.current = null;

      if (updateState) {
        setIsAssistantTyping(false);
      }
    },
    []
  );

  useEffect(() => {
    return () => {
      stopAssistantTyping({ updateState: false });
    };
  }, [stopAssistantTyping]);

  useEffect(() => {
    if (!isChatOpen) {
      return;
    }

    const element = chatBodyRef.current;
    if (!element) {
      return;
    }

    element.scrollTo({
      top: element.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isAssistantTyping, isChatOpen]);

  const submitMessage = useCallback(() => {
    const question = inputValue.trim();

    if (!question) {
      return;
    }

    stopAssistantTyping({ finalize: true });

    const timestampFormatter = new Intl.DateTimeFormat("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const timeLabel = timestampFormatter.format(new Date());

    const userMessage: ChatMessage = {
      id: nextMessageId.current++,
      role: "user",
      content: question,
      meta: `Você • ${timeLabel}`,
    };

    const quickResponseKey = normalizeText(question);
    const quickResponse = quickResponses[quickResponseKey];
    const matchedAgent = resolveAgentForQuestion(question);
    const assistantText = synthesizeResponse(
      question,
      matchedAgent,
      quickResponse?.answer
    );
    const suggestedAgentPayload = matchedAgent
      ? {
          slug: matchedAgent.slug,
          name: matchedAgent.name,
          tagline: matchedAgent.tagline,
          callToAction: matchedAgent.callToAction,
          accent: matchedAgent.accent,
        }
      : undefined;

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    if (!isChatOpen) {
      setIsChatOpen(true);
    }
    setIsAssistantTyping(true);

    responseDelayRef.current = setTimeout(() => {
      responseDelayRef.current = null;

      const assistantMessageId = nextMessageId.current++;
      const metaLabel = "Sophia";
      typingStateRef.current = {
        messageId: assistantMessageId,
        fullText: assistantText,
        metaLabel,
      };

      setMessages((prev) => [
        ...prev,
        {
          id: assistantMessageId,
          role: "assistant",
          content: "",
          meta: `${metaLabel} • digitando...`,
          suggestedAgent: suggestedAgentPayload,
        },
      ]);

      const totalLength = assistantText.length;

      if (totalLength === 0) {
        setMessages((prev) =>
          prev.map((message) =>
            message.id === assistantMessageId
              ? { ...message, meta: `${metaLabel} • agora` }
              : message
          )
        );
        typingStateRef.current = null;
        setIsAssistantTyping(false);
        return;
      }

      let currentIndex = 0;
      const step = Math.max(1, Math.ceil(totalLength / 60));

      typingIntervalRef.current = setInterval(() => {
        currentIndex = Math.min(currentIndex + step, totalLength);

        setMessages((prev) =>
          prev.map((message) =>
            message.id === assistantMessageId
              ? {
                  ...message,
                  content: assistantText.slice(0, currentIndex),
                  meta:
                    currentIndex >= totalLength
                      ? `${metaLabel} • agora`
                      : `${metaLabel} • digitando...`,
                }
              : message
          )
        );

        if (currentIndex >= totalLength) {
          if (typingIntervalRef.current) {
            clearInterval(typingIntervalRef.current);
          }
          typingIntervalRef.current = null;
          typingStateRef.current = null;
          setIsAssistantTyping(false);
        }
      }, 30);
    }, 600);
  }, [inputValue, stopAssistantTyping, isChatOpen]);

  const handleQuickPrompt = useCallback(
    (prompt: string) => {
      setInputValue(prompt);

      if (!isChatOpen) {
        return;
      }

      const element = chatBodyRef.current;

      if (!element) {
        return;
      }

      requestAnimationFrame(() => {
        element.scrollTo({
          top: element.scrollHeight,
          behavior: "smooth",
        });
      });
    },
    [isChatOpen]
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitMessage();
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[radial-gradient(circle_at_top,rgba(214,40,40,0.22),rgba(6,8,15,0.98)_60%),#03040a] text-slate-100">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -left-32 top-12 h-80 w-80 rounded-full bg-brand/40 blur-[120px]" />
        <div className="absolute right-[-120px] top-1/3 h-96 w-96 rounded-full bg-rose-500/40 blur-[140px]" />
      </div>

      <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 pb-8 pt-10">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center rounded-3xl border border-white/15 bg-white/10 p-3 backdrop-blur">
            <span className="text-2xl font-semibold tracking-wide text-white">
              Sophia+
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-medium uppercase tracking-[0.32em] text-rose-200">
              SPSP
            </span>
            <h1 className="text-2xl font-semibold leading-tight text-white">
              Sophia <span className="text-rose-100">IA</span>
            </h1>
          </div>
        </div>
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/agents"
            className="rounded-full border border-white/20 px-5 py-2 text-sm font-medium text-white transition hover:border-white/40 hover:bg-white/10"
          >
            Todos os agentes
          </Link>
          <button className="rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(214,40,40,0.35)] transition hover:bg-brand-dark">
            Entrar
          </button>
        </div>
      </header>

      <main className="relative z-10 flex flex-1 flex-col gap-16 px-0 pb-24 pt-6 sm:px-6">
        <section className="relative w-full px-4 sm:px-0">
          <div className="mx-auto w-full max-w-5xl">
            <div
              className={`relative flex w-full flex-col overflow-hidden rounded-[36px] border border-white/12 text-white shadow-[0_32px_90px_rgba(6,10,25,0.32)] backdrop-blur-xl transition-all duration-500 ${
                isChatOpen
                  ? "min-h-[70vh] bg-white/5"
                  : "min-h-[260px] bg-white/10"
              }`}
            >
              {isChatOpen ? (
                <>
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 bg-white/5 px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand/15 text-brand">
                        <span className="text-lg font-semibold">S</span>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold leading-tight">
                          Sophia SPSP IA
                        </h3>
                        <p className="text-xs text-white/70">
                          Disponível 24/7 para o time SPSP
                        </p>
                      </div>
                    </div>
                    <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
                      Beta
                    </span>
                  </div>

                  <div
                    ref={chatBodyRef}
                    className="flex-1 space-y-5 overflow-y-auto px-6 py-6 sm:px-8"
                  >
                    {messages.map((message) => {
                      const isUser = message.role === "user";
                      const suggestedAgent = message.suggestedAgent;
                      const showSuggestion =
                        !isUser &&
                        suggestedAgent &&
                        message.content.trim().length > 0 &&
                        !message.meta.includes("digitando");

                      return (
                        <div
                          key={message.id}
                          className={`flex ${
                            isUser ? "justify-end" : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-[85%] rounded-3xl px-5 py-4 text-sm leading-6 shadow-sm ${
                              isUser
                                ? "rounded-br-xl bg-brand text-white shadow-[0_15px_35px_rgba(214,40,40,0.3)]"
                                : "rounded-bl-xl border border-white/15 bg-white/10 text-white"
                            }`}
                          >
                            {message.content ? (
                              <p className="whitespace-pre-line">
                                {message.content}
                              </p>
                            ) : !isUser ? (
                              <div className="flex items-center gap-1 text-rose-100/70">
                                <span className="h-2 w-2 animate-bounce rounded-full bg-brand" />
                                <span className="h-2 w-2 animate-bounce rounded-full bg-brand/70 delay-150" />
                                <span className="h-2 w-2 animate-bounce rounded-full bg-brand/40 delay-300" />
                              </div>
                            ) : null}
                            <span
                              className={`mt-3 block text-xs ${
                                isUser ? "text-rose-100/80" : "text-white/60"
                              }`}
                            >
                              {message.meta}
                            </span>
                            {showSuggestion && suggestedAgent && (
                              <div
                                className={`mt-3 flex flex-col gap-2 rounded-2xl bg-linear-to-br ${suggestedAgent.accent.gradient} px-4 py-3 text-xs text-white shadow-[0_12px_38px_rgba(214,40,40,0.35)]`}
                              >
                                <div className="flex flex-col gap-1">
                                  <span className="text-sm font-semibold">
                                    Direcionamento sugerido:{" "}
                                    {suggestedAgent.name}
                                  </span>
                                  <span className="text-xs text-white/80">
                                    {suggestedAgent.tagline}
                                  </span>
                                </div>
                                <Link
                                  href={`/agents/${suggestedAgent.slug}`}
                                  className="inline-flex w-fit items-center gap-2 rounded-full bg-white/20 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-white/30"
                                >
                                  {suggestedAgent.callToAction}
                                  <FiArrowRight
                                    className="h-3.5 w-3.5"
                                    aria-hidden
                                  />
                                </Link>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <form
                    onSubmit={handleSubmit}
                    className="border-t border-white/10 bg-white/5 px-6 py-5"
                  >
                    <label htmlFor="message" className="sr-only">
                      Mensagem para a Sophia
                    </label>
                    <div className="flex items-end gap-3 rounded-3xl border border-white/15 bg-white px-5 py-3.5 text-slate-900 shadow-inner focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/30 sm:px-6 sm:py-4">
                      <textarea
                        id="message"
                        name="message"
                        rows={1}
                        value={inputValue}
                        onChange={(event) => setInputValue(event.target.value)}
                        placeholder="Como posso ajudar você hoje?"
                        className="max-h-28 flex-1 resize-none bg-transparent text-sm outline-none placeholder:text-slate-400"
                        aria-label="Digite sua mensagem"
                        onKeyDown={(event) => {
                          if (
                            event.key === "Enter" &&
                            !event.shiftKey &&
                            !event.nativeEvent.isComposing
                          ) {
                            event.preventDefault();
                            submitMessage();
                          }
                        }}
                      />
                      <button
                        type="submit"
                        disabled={!inputValue.trim()}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand text-white transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:bg-slate-500"
                        aria-label="Enviar mensagem"
                      >
                        <FiArrowRight className="h-4 w-4" aria-hidden />
                      </button>
                    </div>
                    <p className="mt-3 text-xs text-white/60">
                      Sophia aprende com os especialistas SPSP e mantém seus
                      dados protegidos dentro dos padrões de segurança
                      corporativa.
                    </p>
                  </form>
                </>
              ) : (
                <div className="flex h-full flex-col justify-center gap-8 px-8 py-10 sm:px-14">
                  <div className="space-y-3 text-white">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-rose-100">
                      Sophia+
                    </span>
                    <h2 className="text-4xl font-semibold leading-tight sm:text-5xl">
                      Como posso ajudar você hoje?
                    </h2>
                    <p className="max-w-2xl text-base text-white/70">
                      Envie sua primeira pergunta para abrir o chat inteligente
                      da SPSP. Assim que responder, você terá acesso ao
                      histórico completo da conversa.
                    </p>
                  </div>
                  <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 rounded-3xl border border-white/15 bg-white/10 px-5 py-3.5 shadow-[0_0_35px_rgba(214,40,40,0.15)] focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/30">
                      <input
                        type="text"
                        value={inputValue}
                        onChange={(event) => setInputValue(event.target.value)}
                        placeholder="Digite sua pergunta"
                        className="w-full bg-transparent text-base text-white placeholder:text-white/60 focus:outline-none"
                        aria-label="Digite sua pergunta"
                      />
                      <button
                        type="submit"
                        disabled={!inputValue.trim()}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand text-white transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:bg-white/30"
                        aria-label="Enviar primeira mensagem"
                      >
                        <FiArrowRight className="h-4 w-4" aria-hidden />
                      </button>
                    </div>
                    <p className="text-xs text-white/60">
                      Dica: você pode perguntar sobre benefícios, processos
                      operacionais ou fluxos do Protheus.
                    </p>
                  </form>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="relative w-full px-4 sm:px-0">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-12">
            <div className="flex flex-col gap-6 text-left">
              <p className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/8 px-4 py-2 text-xs font-medium uppercase tracking-[0.25em] text-rose-100">
                Cuidamos melhor
              </p>
              <h2 className="text-4xl font-semibold leading-tight text-white">
                Conheça a <span className="text-brand">Sophia</span>, a
                inteligência da SPSP que orienta você em qualquer dúvida do dia
                a dia.
              </h2>
              <p className="text-base leading-7 text-slate-200">
                Pergunte sobre benefícios, políticas internas, processos e
                receba orientações em linguagem natural. Integrada ao
                ecossistema SPSP, Sophia antecipa necessidades e disponibiliza
                atalhos para as jornadas mais utilizadas.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
              <div className="flex flex-col gap-4 rounded-3xl border border-white/12 bg-white/5 p-6 backdrop-blur">
                <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-rose-100">
                  Sugestões rápidas
                </h3>
                <div className="grid gap-3">
                  {quickPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => handleQuickPrompt(prompt)}
                      className="group flex cursor-pointer items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/10 px-5 py-4 text-left text-sm text-slate-100 transition hover:border-white/40 hover:bg-white/20"
                    >
                      <span className="font-medium">{prompt}</span>
                      <span className="rounded-full border border-white/20 px-3 py-1 text-xs text-rose-100 transition group-hover:border-white/60 group-hover:text-white">
                        Inserir
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-3 rounded-3xl border border-white/12 bg-white/5 p-6 text-sm text-slate-200 backdrop-blur">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-rose-100">
                  <span>Status</span>
                  <span className="flex items-center gap-2 font-semibold text-emerald-200">
                    <span className="h-2 w-2 rounded-full bg-emerald-300" />
                    Online
                  </span>
                </div>
                <p className="text-base font-medium text-white">
                  Sophia está pronta para ajudar agora mesmo.
                </p>
                <ul className="grid gap-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-white/60" />
                    Atendimento multicanal integrado
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-white/60" />
                    Roteiros validados pelo time SPSP
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-white/60" />
                    Histórico seguro e centralizado
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col gap-4 rounded-3xl border border-white/12 bg-white/5 p-6 backdrop-blur">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-rose-100">
                    Agentes especialistas
                  </h3>
                  <p className="mt-1 text-sm text-slate-200">
                    Escolha um domínio e continue a conversa com foco total na
                    sua necessidade.
                  </p>
                </div>
                <span className="rounded-full border border-white/20 px-3 py-1 text-xs text-rose-100">
                  {agents.length}
                </span>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {agents.map((agent) => (
                  <Link
                    key={agent.slug}
                    href={`/agents/${agent.slug}`}
                    className="group relative flex flex-col gap-2 overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-4 py-4 transition hover:border-white/40 hover:bg-white/15"
                  >
                    <div
                      className={`pointer-events-none absolute -right-6 top-1/2 h-24 w-24 -translate-y-1/2 rounded-full blur-[80px] ${agent.accent.glow}`}
                    />
                    <span className="text-sm font-semibold text-white">
                      {agent.name}
                    </span>
                    <span className="text-xs text-slate-200 line-clamp-2">
                      {agent.tagline}
                    </span>
                    <span className="mt-2 inline-flex items-center gap-2 text-xs font-semibold text-rose-100 transition group-hover:translate-x-1">
                      Abrir agente
                      <FiArrowRight className="h-3.5 w-3.5" aria-hidden />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-12 text-xs text-slate-400">
        <div className="flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} SPSP. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4">
            <a className="transition hover:text-white" href="#">
              Política de privacidade
            </a>
            <a className="transition hover:text-white" href="#">
              Termos de uso
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
