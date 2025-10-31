# Sophia SPSP IA

> Assistente digital que conecta pessoas aos agentes especialistas da SPSP com respostas guiadas, direcionamentos automáticos e experiência premium de chat.

## ✨ Visão Geral

- **Chat Sophia+**: tela inicial minimalista que expande para um chat completo após a primeira pergunta, com respostas em fluxo (efeito de digitação) e direcionamentos inteligentes para agentes especialistas.
- **Direcionamento contextual**: quando uma resposta identifica um especialista, um card de sugestão é exibido somente após a mensagem ser concluída, convidando o usuário a abrir o agente correspondente.
- **Sugestões rápidas**: atalhos pré-configurados para perguntas frequentes preenchem o input automaticamente e posicionam o scroll no fim da conversa.
- **Agentes dedicados**: páginas específicas para cada domínio (`/agents/[slug]`) com descrição, missão, rotinas do Protheus e um chat especializado alimentado pelo conhecimento daquele agente.
- **Dataset unificado**: todas as informações de agentes, foco, funções de Protheus e base de conhecimento são centralizadas em `lib/agents.ts`.

## 🧰 Stack

- [Next.js 16 (App Router)](https://nextjs.org/docs/app) + [React 19](https://react.dev)
- Estilização com utilitários Tailwind-like e gradientes personalizados
- Assets SVG otimizados em `public/`
- Componentização client-side para interação em tempo real

## 🚀 Primeiros Passos

### Pré-requisitos

- Node.js 20 LTS ou superior
- npm (vem junto com o Node)

### Instalação

```bash
npm install
```

### Ambiente de desenvolvimento

```bash
npm run dev
# abre http://localhost:3000
```

### Build de produção

```bash
npm run build
npm start
```

### Análise estática

```bash
npm run lint
```

## 🗂️ Estrutura de Pastas

```
app/
	page.tsx             # Chat Sophia+, landing e seções institucionais
	layout.tsx           # Layout raiz do App Router
	agents/
		page.tsx           # Listagem de agentes
		[slug]/
			page.tsx         # Página dedicada de cada agente
			agent-chat.tsx   # Componente de chat especializado (client component)
lib/
	agents.ts            # Fonte única de dados dos agentes
public/                # Ícones e assets SVG
```

## 💬 Fluxo do Chat

- Input expandido após a primeira interação, mantendo o histórico da conversa.
- Respostas exibidas com efeito de digitação; recomendações de agentes só aparecem quando a resposta termina.
- Enter envia a mensagem imediatamente (`Shift + Enter` adiciona linha).
- Botões de sugestões rápidas adicionam a pergunta ao campo e reposicionam o scroll para a mensagem mais recente.

## 🤖 Agentes Especialistas

- Cada agente possui missão, áreas de foco, atalhos de perguntas e rotinas do Protheus destacadas na interface.
- As respostas no chat especializado são geradas a partir da base de conhecimento definida em `lib/agents.ts`.
- Para adicionar um novo agente, basta incluir um objeto no array `agents` com `slug`, `knowledgeBase`, `shortcuts` e demais metadados.

## 🛠️ Boas Práticas

- Mantenha o padrão de gradientes e tokens de cor ao criar novos componentes.
- Sempre execute `npm run lint` antes de abrir um PR para garantir consistência.
- Centralize dados de domínio no `lib/agents.ts` para manter a experiência alinhada entre a home e as páginas especializadas.

---

Sempre que houver dúvidas ou sugestões de melhoria, abra uma issue ou entre em contato com o time responsável pela evolução da Sophia SPSP IA.
