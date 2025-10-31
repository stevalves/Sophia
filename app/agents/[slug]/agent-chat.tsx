"use client";

import {
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { FiArrowRight } from "react-icons/fi";

import type { Agent } from "@/lib/agents";

type ChatMessage = {
  id: number;
  role: "user" | "assistant";
  content: string;
  meta: string;
};

const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .toLowerCase()
    .trim();

const timestampLabel = (label: string) => `${label} • agora`;

interface AgentChatProps {
  agent: Agent;
}

const buildKnowledgeAnswer = (question: string, agent: Agent) => {
  const normalizedQuestion = normalize(question);

  let bestScore = 0;
  let selectedAnswer: string | null = null;

  agent.knowledgeBase.forEach((entry) => {
    const normalizedPrompt = normalize(entry.prompt);

    if (!normalizedPrompt) {
      return;
    }

    if (normalizedQuestion.includes(normalizedPrompt)) {
      const bonus = normalizedPrompt.split(" ").length * 2;
      if (bonus > bestScore) {
        bestScore = bonus;
        selectedAnswer = entry.answer;
      }
      return;
    }

    const promptTokens = normalizedPrompt
      .split(" ")
      .filter((token) => token.length > 3);

    let score = 0;
    promptTokens.forEach((token) => {
      if (normalizedQuestion.includes(token)) {
        score += 2;
      }
    });

    const questionTokens = normalizedQuestion
      .split(" ")
      .filter((token) => token.length > 3);

    promptTokens.forEach((token) => {
      if (questionTokens.includes(token)) {
        score += 1;
      }
    });

    if (score > bestScore) {
      bestScore = score;
      selectedAnswer = entry.answer;
    }
  });

  if (selectedAnswer && bestScore >= 2) {
    const keywordMatch = agent.keywords.find((keyword) =>
      normalizedQuestion.includes(normalize(keyword))
    );

    const complement = keywordMatch
      ? ` Se precisar, posso abrir um checklist específico para ${keywordMatch}.`
      : " Caso precise de anexos ou formulários, me avise que sinalizo o caminho mais rápido.";

    return `${selectedAnswer}${complement}`;
  }

  const primaryFocus = agent.focusAreas[0];
  const secondaryFocus = agent.focusAreas[1] ?? agent.focusAreas[0];
  const highlight = agent.protheusFunctions[0];

  const fallbackBlocks = [
    `Posso guiar suas demandas relacionadas a ${primaryFocus.toLowerCase()} e ${secondaryFocus.toLowerCase()}.`,
    highlight
      ? `Quando precisar aplicar no Protheus, comece pela rotina ${highlight.code} (${highlight.title}).`
      : null,
    "Compartilhe detalhes como unidade, período e responsáveis para receber orientações personalizadas e modelos de comunicação.",
  ].filter(Boolean);

  return fallbackBlocks.join(" ");
};

const AgentChat = ({ agent }: AgentChatProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      role: "assistant",
      content: `Olá! Eu sou o agente ${
        agent.name
      }. Conte comigo para tratar de ${agent.tagline.toLowerCase()} e todas as rotinas ligadas a ${
        agent.name
      }.`,
      meta: timestampLabel(agent.name),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const responseDelayRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const typingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const typingStateRef = useRef<{ messageId: number; fullText: string } | null>(
    null
  );
  const chatBodyRef = useRef<HTMLDivElement | null>(null);
  const nextId = useRef(2);

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
        setMessages((previous) =>
          previous.map((message) =>
            message.id === activeState.messageId
              ? {
                  ...message,
                  content: activeState.fullText,
                  meta: timestampLabel(agent.name),
                }
              : message
          )
        );
      }

      typingStateRef.current = null;

      if (updateState) {
        setIsTyping(false);
      }
    },
    [agent.name]
  );

  useEffect(() => {
    return () => {
      stopAssistantTyping({ updateState: false });
    };
  }, [stopAssistantTyping]);

  useEffect(() => {
    const element = chatBodyRef.current;

    if (!element) {
      return;
    }

    element.scrollTo({
      top: element.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isTyping]);

  const shortcuts = useMemo(() => agent.shortcuts.slice(0, 4), [agent]);

  const submitMessage = useCallback(() => {
    const question = inputValue.trim();

    if (!question) {
      return;
    }

    stopAssistantTyping({ finalize: true });

    const userMessage: ChatMessage = {
      id: nextId.current++,
      role: "user",
      content: question,
      meta: timestampLabel("Você"),
    };

    setMessages((previous) => [...previous, userMessage]);
    setInputValue("");
    setIsTyping(true);

    const assistantText = buildKnowledgeAnswer(question, agent);

    responseDelayRef.current = setTimeout(() => {
      responseDelayRef.current = null;

      const assistantMessageId = nextId.current++;
      typingStateRef.current = {
        messageId: assistantMessageId,
        fullText: assistantText,
      };

      setMessages((previous) => [
        ...previous,
        {
          id: assistantMessageId,
          role: "assistant",
          content: "",
          meta: `${agent.name} • digitando...`,
        },
      ]);

      const totalLength = assistantText.length;

      if (totalLength === 0) {
        setMessages((previous) =>
          previous.map((message) =>
            message.id === assistantMessageId
              ? { ...message, meta: timestampLabel(agent.name) }
              : message
          )
        );
        typingStateRef.current = null;
        setIsTyping(false);
        return;
      }

      let currentIndex = 0;
      const step = Math.max(1, Math.ceil(totalLength / 60));

      typingIntervalRef.current = setInterval(() => {
        currentIndex = Math.min(currentIndex + step, totalLength);

        setMessages((previous) =>
          previous.map((message) =>
            message.id === assistantMessageId
              ? {
                  ...message,
                  content: assistantText.slice(0, currentIndex),
                  meta:
                    currentIndex >= totalLength
                      ? timestampLabel(agent.name)
                      : `${agent.name} • digitando...`,
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
          setIsTyping(false);
        }
      }, 30);
    }, 600);
  }, [agent, inputValue, stopAssistantTyping]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitMessage();
  };

  const handleShortcut = (value: string) => {
    setInputValue(value);
  };

  return (
    <div className="flex h-full min-h-[600px] flex-col rounded-4xl border border-white/12 bg-white/10 p-6 backdrop-blur xl:min-h-[720px] xl:p-8">
      <header className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-semibold uppercase tracking-[0.26em] text-rose-100">
            Chat especializado
          </span>
          <h2 className="text-xl font-semibold text-white">{agent.name}</h2>
          <p className="text-sm text-slate-200/90">
            Explore casos reais, rotinas do Protheus e orientações passo a passo
            para a área de {agent.name}.
          </p>
        </div>
        <div className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80">
          Sempre ativo
        </div>
      </header>

      <div
        ref={chatBodyRef}
        className="mt-4 flex-1 space-y-4 overflow-y-auto pr-2"
      >
        {messages.map((message) => {
          const isAssistant = message.role === "assistant";
          const isStreaming = isAssistant && message.content.length === 0;

          return (
            <div
              key={message.id}
              className={`flex flex-col gap-1 rounded-3xl border px-4 py-3 text-sm leading-relaxed shadow-sm transition ${
                isAssistant
                  ? "border-white/15 bg-white/10 text-slate-100"
                  : "border-white/10 bg-white/5 text-white"
              }`}
            >
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-rose-100">
                {message.meta}
              </span>
              {isStreaming ? (
                <div className="flex items-center gap-1 text-slate-300">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-rose-200" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-rose-200/70 delay-150" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-rose-200/40 delay-300" />
                </div>
              ) : (
                <p>{message.content}</p>
              )}
            </div>
          );
        })}
      </div>

      {shortcuts.length > 0 && (
        <div className="mt-4 grid gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-rose-100">
            Atalhos sugeridos
          </span>
          <div className="flex flex-wrap gap-2">
            {shortcuts.map((shortcut) => (
              <button
                key={shortcut}
                type="button"
                onClick={() => handleShortcut(shortcut)}
                className="rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-medium text-slate-100 transition hover:border-white/40 hover:bg-white/20"
              >
                {shortcut}
              </button>
            ))}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-5 flex items-center gap-3">
        <div className="flex-1 rounded-3xl border border-white/15 bg-white/10 px-4 py-3">
          <input
            type="text"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            placeholder={`Envie sua dúvida para o agente ${agent.name}`}
            className="w-full bg-transparent text-sm text-white placeholder:text-slate-300 focus:outline-none"
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
        </div>
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-white shadow-[0_12px_30px_rgba(214,40,40,0.35)] transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
          disabled={!inputValue.trim() || isTyping}
        >
          Enviar
          <FiArrowRight className="h-3.5 w-3.5" aria-hidden />
        </button>
      </form>
    </div>
  );
};

export default AgentChat;
