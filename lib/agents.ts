export type Agent = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  mission: string;
  focusAreas: string[];
  keywords: string[];
  shortcuts: string[];
  callToAction: string;
  accent: {
    gradient: string;
    glow: string;
    badge: string;
  };
  protheusFunctions: {
    code: string;
    title: string;
    description: string;
  }[];
  knowledgeBase: {
    prompt: string;
    answer: string;
  }[];
};

export const agents: Agent[] = [
  {
    slug: "ativos",
    name: "Ativos",
    tagline: "Controle integral do patrimônio corporativo",
    description:
      "Monitora transferências, inventário, depreciação e compliance de ativos críticos para manter a operação segura.",
    mission:
      "Assegura governança total do patrimônio SPSP com rastreabilidade ponta a ponta, auditoria simplificada e indicadores acionáveis.",
    focusAreas: [
      "Inventário físico e digital sincronizado por unidade e centro de custo",
      "Depreciação automática conciliada com o livro contábil",
      "Movimentações, baixas e reavaliações com aprovações multietapas",
    ],
    keywords: [
      "ativo",
      "patrimônio",
      "inventário",
      "depreciação",
      "transferência",
    ],
    shortcuts: [
      "Quais ativos estão alocados para a unidade de Campinas?",
      "Como registrar uma movimentação de patrimônio?",
      "Existe checklist para inventário físico anual?",
    ],
    callToAction: "Abrir agente de Ativos",
    accent: {
      gradient: "from-brand to-rose-600",
      glow: "bg-rose-500/40",
      badge: "text-rose-100",
    },
    protheusFunctions: [
      {
        code: "SIGAPAT",
        title: "Painel de Patrimônio",
        description:
          "Visualiza situação dos bens, vida útil, depreciação e localização em tempo real.",
      },
      {
        code: "PATM010",
        title: "Movimentação de Ativos",
        description:
          "Registra transferências, baixas e cessões com workflow e anexos obrigatórios.",
      },
      {
        code: "PATC040",
        title: "Inventário Físico",
        description:
          "Gera listas de contagem, QR Codes e reconcilia divergências automaticamente.",
      },
    ],
    knowledgeBase: [
      {
        prompt: "Como gerar um inventário completo para auditoria?",
        answer:
          "Acesse SIGAPAT > Inventário (PATC040), defina a unidade e gere o lote de contagem. Após registrar as leituras, finalize com a reconciliação automática e exporte o relatório de divergências para anexar à auditoria.",
      },
      {
        prompt: "Qual fluxo seguir para baixar um ativo obsoleto?",
        answer:
          "Utilize o PATM010 com a ação 'Baixa', informe motivo, valor residual e anexe o laudo técnico. O processo envia para aprovação da controladoria e ajusta a depreciação no fechamento contábil.",
      },
      {
        prompt: "Quais relatórios comprovam a depreciação no Protheus?",
        answer:
          "No SIGAPAT execute o Relatório Gerencial de Depreciação por Centro de Custo e, se necessário, exporte o arquivo analítico para conciliação com o módulo contábil.",
      },
    ],
  },
  {
    slug: "compras",
    name: "Compras",
    tagline: "Aquisições estratégicas e supply chain",
    description:
      "Acompanha requisições, cotações, contratos com fornecedores e SLAs de entrega para garantir suprimentos no prazo.",
    mission:
      "Garante abastecimento contínuo com governança, negociação ativa com fornecedores e aderência às políticas SPSP.",
    focusAreas: [
      "Centralização de requisições e políticas de aprovação",
      "Homologação e monitoramento de fornecedores críticos",
      "Gestão de cotações, pedidos e SLAs de entrega",
    ],
    keywords: ["compra", "fornecedor", "cotação", "requisição", "pedido"],
    shortcuts: [
      "Como acompanhar o status de uma requisição de compra?",
      "Qual o procedimento para cadastro de novo fornecedor?",
      "Existem SLAs específicos para solicitações emergenciais?",
    ],
    callToAction: "Abrir agente de Compras",
    accent: {
      gradient: "from-rose-500 to-orange-500",
      glow: "bg-orange-400/35",
      badge: "text-orange-100",
    },
    protheusFunctions: [
      {
        code: "SIGACOM",
        title: "Portal de Compras",
        description:
          "Consolida requisições, pedidos em aberto e indicadores de desempenho de fornecedores.",
      },
      {
        code: "MATA103",
        title: "Análise de Requisições",
        description:
          "Classifica requisições por criticidade, aplica alçadas e gera pedidos automaticamente.",
      },
      {
        code: "MATA268",
        title: "Cotação de Fornecedores",
        description:
          "Compara propostas, registra condições comerciais e gera o mapa de negociação.",
      },
    ],
    knowledgeBase: [
      {
        prompt: "Como priorizar requisições emergenciais?",
        answer:
          "No SIGACOM filtre por criticidade 'Alta' e utilize o MATA103 para direcionar ao comprador responsável. O Protheus notifica automaticamente as áreas impactadas.",
      },
      {
        prompt: "Quais documentos preciso para homologar um novo fornecedor?",
        answer:
          "Inclua a empresa via MATA950 anexando certidões, contrato social e questionário de risco. O fluxo dispara aprovação jurídica e financeira antes da liberação.",
      },
      {
        prompt: "Como comparar propostas de cotação no Protheus?",
        answer:
          "Execute o MATA268, selecione a cotação e clique em 'Mapa Comparativo'. O sistema gera ranking por preço, prazo e indicadores de SLA histórico.",
      },
    ],
  },
  {
    slug: "contabil",
    name: "Contábil",
    tagline: "Governança financeira e compliance fiscal",
    description:
      "Concilia lançamentos, balancetes e demonstrações garantindo aderência às normas contábeis e auditorias.",
    mission:
      "Entrega demonstrações confiáveis, reconcilia contas automaticamente e antecipa impactos contábeis das operações SPSP.",
    focusAreas: [
      "Automação de lançamentos e rateios contábeis",
      "Conciliação entre razão, fiscal e patrimônio",
      "Fechamento de balancetes, DRE e notas explicativas",
    ],
    keywords: ["contábil", "balancete", "lançamento", "dre", "auditoria"],
    shortcuts: [
      "Onde consultar o último balancete consolidado?",
      "Como solicitar ajuste em lançamento contábil?",
      "Quais documentos preciso para auditoria interna?",
    ],
    callToAction: "Abrir agente Contábil",
    accent: {
      gradient: "from-brand to-red-500",
      glow: "bg-red-500/35",
      badge: "text-red-100",
    },
    protheusFunctions: [
      {
        code: "SIGACTB",
        title: "Livro Razão",
        description:
          "Consulta saldos, históricos e permite exportar o razão analítico em múltiplos formatos.",
      },
      {
        code: "CTBA090",
        title: "Lançamentos Contábeis",
        description:
          "Registra lançamentos manuais ou integrações, aplica rateios e controla aprovações.",
      },
      {
        code: "CTBA410",
        title: "Balancetes e DRE",
        description:
          "Gera balancetes gerenciais, DRE e relatórios para auditoria com versões comparativas.",
      },
    ],
    knowledgeBase: [
      {
        prompt: "Como extrair o balancete gerencial do mês?",
        answer:
          "Acesse SIGACTB > Relatórios > Balancete (CTBA410), selecione período e formato desejado. Utilize os filtros por centro de custo para análises específicas.",
      },
      {
        prompt: "Qual é o fluxo de ajustes contábeis extraordinários?",
        answer:
          "Utilize o CTBA090 com tipo 'Ajuste Extraordinário', anexe documentação e encaminhe para aprovação da controladoria. Após aceite, rode a reclassificação automática.",
      },
      {
        prompt: "Quais evidências entregar para auditoria externa?",
        answer:
          "Disponibilize razão analítico, conciliações de contas críticas e relatórios de depreciação integrados ao SIGAPAT. A auditoria pode ser atendida diretamente via pastas digitais.",
      },
    ],
  },
  {
    slug: "contratos",
    name: "Contratos",
    tagline: "Gestão de vínculos e vigências",
    description:
      "Supervisiona todo o ciclo de contratos com clientes e fornecedores, notificando riscos e renovações automáticas.",
    mission:
      "Controla obrigações contratuais SPSP de ponta a ponta, reduz riscos de renovação automática e garante compliance jurídico-financeiro.",
    focusAreas: [
      "Cadastro e versionamento de contratos e aditivos",
      "Gestão de vigências, alertas e multas",
      "Integração com faturamento, compras e jurídico",
    ],
    keywords: ["contrato", "vigência", "aditivo", "cláusula", "renovação"],
    shortcuts: [
      "Como emitir um aditivo contratual de prestação de serviços?",
      "Quais contratos vencem nos próximos 60 dias?",
      "Existe modelo oficial para NDA com fornecedores?",
    ],
    callToAction: "Abrir agente de Contratos",
    accent: {
      gradient: "from-rose-400 to-pink-500",
      glow: "bg-pink-500/30",
      badge: "text-pink-100",
    },
    protheusFunctions: [
      {
        code: "SIGACON",
        title: "Gestão de Contratos",
        description:
          "Centraliza contratos ativos, cláusulas críticas, anexos e indicadores de renovação.",
      },
      {
        code: "CNTA050",
        title: "Central de Contratos",
        description:
          "Controla vigências, reajustes e gera alertas automáticos conforme prazos definidos.",
      },
      {
        code: "CNTA220",
        title: "Aditivos e Cláusulas",
        description:
          "Permite versionamento de aditivos, registro de testemunhas e aprovação eletrônica.",
      },
    ],
    knowledgeBase: [
      {
        prompt: "Como cadastrar um novo contrato de prestação de serviços?",
        answer:
          "Abra o SIGACON, escolha 'Novo Contrato', informe dados comerciais e anexe a proposta assinada. Em seguida configure reajustes e responsáveis para notificações.",
      },
      {
        prompt: "De que forma monitorar contratos próximos do vencimento?",
        answer:
          "Utilize o painel de alertas do CNTA050 filtrando por 60 dias. A lista pode ser exportada e direcionada automaticamente às áreas responsáveis.",
      },
      {
        prompt: "Qual aditivo usar para ampliar escopo sem nova licitação?",
        answer:
          "Selecione o contrato no CNTA220, escolha o modelo 'Aditivo de Escopo' e preencha os campos de volumes adicionais, prazos e cláusulas complementares para aprovação jurídica.",
      },
    ],
  },
  {
    slug: "controladoria",
    name: "Controladoria",
    tagline: "Indicadores e performance consolidada",
    description:
      "Reúne dashboards, KPIs e previsões para apoiar decisões estratégicas com foco em resultado.",
    mission:
      "Transforma dados financeiros e operacionais em decisões estratégicas, garantindo aderência ao plano SPSP e antecipando riscos.",
    focusAreas: [
      "Planejamento orçamentário e revisões trimestrais",
      "Monitoramento de KPIs corporativos e alertas",
      "Análises de cenário, forecast e simulações",
    ],
    keywords: ["controladoria", "kpi", "indicador", "forecast", "planejamento"],
    shortcuts: [
      "Quais KPIs estão acima do limite de atenção?",
      "Como gerar o forecast trimestral atualizado?",
      "Onde encontro o dicionário de indicadores corporativos?",
    ],
    callToAction: "Abrir agente da Controladoria",
    accent: {
      gradient: "from-brand to-rose-700",
      glow: "bg-rose-600/35",
      badge: "text-rose-100",
    },
    protheusFunctions: [
      {
        code: "SIGAORC",
        title: "Orçamento Integrado",
        description:
          "Acompanha plano orçamentário, metas por centro de custo e variações real vs. planejado.",
      },
      {
        code: "ORCA090",
        title: "Cenários Orçamentários",
        description:
          "Permite criar versões de forecast, simular impactos e publicar a revisão oficial.",
      },
      {
        code: "ORCA520",
        title: "Painel de Indicadores",
        description:
          "Disponibiliza KPIs financeiros, operacionais e de SLAs com alertas configuráveis.",
      },
    ],
    knowledgeBase: [
      {
        prompt: "Como atualizar o forecast trimestral?",
        answer:
          "Acesse SIGAORC > Forecast (ORCA090), duplique o cenário vigente, ajuste premissas e envie para aprovação. Após aceite, publique a versão como base oficial.",
      },
      {
        prompt: "Quais indicadores críticos acompanho diariamente?",
        answer:
          "No ORCA520 configure o painel com margem, EBITDA, ocupação de contratos e inadimplência. Ative alertas para desvios superiores a 5%.",
      },
      {
        prompt: "Existe dicionário de KPIs corporativos?",
        answer:
          "Sim, o repositório fica no ORCA520 > Documentação, com descrição, fórmula e responsável por cada indicador.",
      },
    ],
  },
  {
    slug: "estoque",
    name: "Estoque",
    tagline: "Operações logísticas e inventário",
    description:
      "Controla níveis de estoque, ordens de picking e rastreabilidade para evitar rupturas e desperdícios.",
    mission:
      "Mantém níveis ideais de materiais críticos, garantindo rastreabilidade por lote e integração direta com compras e manutenção.",
    focusAreas: [
      "Reposição automática por ponto de pedido e lead time",
      "Controle de lotes, validade e rastreabilidade",
      "Inventários rotativos e auditorias em tempo real",
    ],
    keywords: ["estoque", "almoxarifado", "picking", "inventário", "lote"],
    shortcuts: [
      "Como verificar saldo disponível por centro de distribuição?",
      "Existe alerta para validade de materiais críticos?",
      "Qual fluxo para ajuste de inventário após contagem?",
    ],
    callToAction: "Abrir agente de Estoque",
    accent: {
      gradient: "from-orange-400 to-rose-500",
      glow: "bg-orange-500/30",
      badge: "text-orange-100",
    },
    protheusFunctions: [
      {
        code: "SIGAEST",
        title: "Gestão de Estoque",
        description:
          "Controla saldos, custo médio, giro e disponibiliza relatórios por unidade ou depósito.",
      },
      {
        code: "ESTM200",
        title: "Controle de Lotes",
        description:
          "Gerencia validade, rastreabilidade, bloqueios e reservas prioritárias de materiais.",
      },
      {
        code: "ESTA230",
        title: "Inventário Rotativo",
        description:
          "Permite programar contagens cíclicas e aplicar ajustes com aprovação automática.",
      },
    ],
    knowledgeBase: [
      {
        prompt: "Como acompanhar saldos por centro de distribuição?",
        answer:
          "No SIGAEST filtre por 'Centro de Distribuição' e utilize o relatório de saldos instantâneos. Exporte em Excel para compartilhar com operações.",
      },
      {
        prompt: "Existe alerta de validade de materiais críticos?",
        answer:
          "Ative no ESTM200 a rotina de alertas configurando antecedência mínima. O sistema envia e-mails automáticos para responsáveis.",
      },
      {
        prompt: "Como registrar ajustes após inventário?",
        answer:
          "Finalize a contagem no ESTA230, valide divergências e clique em 'Gerar Ajustes'. Os lançamentos contábeis são integrados automaticamente.",
      },
    ],
  },
  {
    slug: "faturamento",
    name: "Faturamento",
    tagline: "Emissão e conciliação de notas",
    description:
      "Orquestra emissão, revisão e envio de notas fiscais garantindo compliance com prazos e contingências.",
    mission:
      "Garante faturamento sem erros, integra emissão com contratos e monitoramento fiscal em tempo real.",
    focusAreas: [
      "Programação de faturamento conforme contratos e SLA",
      "Monitoramento de NF-e/NFS-e e contingências",
      "Integração com financeiro, fiscal e clientes",
    ],
    keywords: ["faturamento", "nota", "nfe", "boleto", "emissão"],
    shortcuts: [
      "Como gerar uma nota complementar?",
      "Qual o SLA para faturamento de novos contratos?",
      "Como identificar notas rejeitadas pelo SEFAZ?",
    ],
    callToAction: "Abrir agente de Faturamento",
    accent: {
      gradient: "from-red-500 to-red-700",
      glow: "bg-red-600/35",
      badge: "text-red-100",
    },
    protheusFunctions: [
      {
        code: "SIGAFAT",
        title: "Central de Faturamento",
        description:
          "Planeja lotes de notas, acompanha pendências e integra com contratos ativos.",
      },
      {
        code: "FATR200",
        title: "Emissão de Nota",
        description:
          "Emite NF-e e NFS-e com validações fiscais automáticas e anexos obrigatórios.",
      },
      {
        code: "FATR450",
        title: "Monitor NF-e",
        description:
          "Acompanha retornos da SEFAZ, gerencia contingências e reenvios automáticos.",
      },
    ],
    knowledgeBase: [
      {
        prompt: "Como emitir uma nota complementar?",
        answer:
          "No SIGAFAT selecione o pedido e escolha 'Nota Complementar'. Informe o valor adicional, motivo e vincule à nota original antes da transmissão.",
      },
      {
        prompt: "Onde monitoro rejeições da SEFAZ?",
        answer:
          "Utilize o FATR450 filtrando por status 'Rejeitada'. O painel mostra o código do erro e permite ajustar a nota e reenviar em um clique.",
      },
      {
        prompt: "Qual o SLA de faturamento para novos contratos?",
        answer:
          "O SLA padrão é de 2 dias úteis após a aprovação comercial. Configure alertas no SIGAFAT para contratos com entrega acelerada.",
      },
    ],
  },
  {
    slug: "financeiro",
    name: "Financeiro",
    tagline: "Fluxo de caixa e conciliações",
    description:
      "Acompanha contas a pagar e receber, projeções e conciliações para manter saúde financeira e compliance bancário.",
    mission:
      "Equilibra fluxo de caixa SPSP, garante conciliações diárias e apoio a decisões de investimento.",
    focusAreas: [
      "Gestão de contas a pagar e receber com integrações",
      "Projeções de caixa, cenários e investimentos",
      "Conciliações bancárias e automatização de cobranças",
    ],
    keywords: [
      "financeiro",
      "fluxo de caixa",
      "pagamento",
      "recebimento",
      "conciliação",
    ],
    shortcuts: [
      "Onde encontro o fluxo de caixa projetado?",
      "Como cadastrar uma ordem de pagamento urgente?",
      "Qual processo para antecipação de recebíveis?",
    ],
    callToAction: "Abrir agente Financeiro",
    accent: {
      gradient: "from-brand to-rose-600",
      glow: "bg-rose-500/30",
      badge: "text-rose-100",
    },
    protheusFunctions: [
      {
        code: "SIGAFIN",
        title: "Painel Financeiro",
        description:
          "Consolida posição de caixa, provisões e compromissos por data e centro de custo.",
      },
      {
        code: "FINA040",
        title: "Fluxo de Caixa Projetado",
        description:
          "Permite simular cenários, aplicar filtros por carteira e exportar demonstrativos.",
      },
      {
        code: "FINA280",
        title: "Conciliação Bancária",
        description:
          "Importa extratos OFX, reconcilia automaticamente e sinaliza divergências.",
      },
    ],
    knowledgeBase: [
      {
        prompt: "Como visualizar o fluxo de caixa projetado?",
        answer:
          "Acesse SIGAFIN > Fluxo Projetado (FINA040), escolha período, carteira e exporte para Excel se precisar apresentar ao comitê.",
      },
      {
        prompt: "Como emitir uma ordem de pagamento urgente?",
        answer:
          "Inclua a OP no FINA070 marcando prioridade 'Urgente' e selecione aprovadores responsáveis. O sistema notifica automaticamente por e-mail.",
      },
      {
        prompt: "Quais passos para antecipar recebíveis?",
        answer:
          "Utilize o FINA120 para simular antecipação, avalie taxas e confirme com a tesouraria. O lançamento é integrado ao contas a receber.",
      },
    ],
  },
  {
    slug: "fiscal",
    name: "Fiscal",
    tagline: "Compliance tributário sem surpresas",
    description:
      "Monitora obrigações acessórias, tributos e benefícios fiscais para manter a empresa dentro das conformidades legais.",
    mission:
      "Garante obrigações fiscais em dia, identifica oportunidades de crédito tributário e reduz riscos de autuação.",
    focusAreas: [
      "Calendário de obrigações acessórias e principais",
      "Conferência de notas, tributos e retenções",
      "Gestão de créditos, benefícios e regimes especiais",
    ],
    keywords: ["fiscal", "tributo", "obrigação acessória", "guia", "imposto"],
    shortcuts: [
      "Qual o prazo para entrega da EFD-Contribuições?",
      "Como emitir guia de recolhimento atrasada?",
      "Existe manual das alíquotas por estado?",
    ],
    callToAction: "Abrir agente Fiscal",
    accent: {
      gradient: "from-rose-500 to-red-600",
      glow: "bg-red-500/25",
      badge: "text-red-100",
    },
    protheusFunctions: [
      {
        code: "SIGAFIS",
        title: "Painel Fiscal",
        description:
          "Centraliza calendário, status de obrigações e pendências por UF.",
      },
      {
        code: "FISA010",
        title: "Controle de Obrigações",
        description:
          "Registra entregas, anexos de comprovação e alertas de prazos críticos.",
      },
      {
        code: "FISF200",
        title: "Conferência de Tributos",
        description:
          "Concilia tributos calculados versus recolhidos e gera guias de diferença.",
      },
    ],
    knowledgeBase: [
      {
        prompt: "Como acompanhar as obrigações do mês?",
        answer:
          "No SIGAFIS acesse o Calendário Fiscal filtrando pela unidade e tipo de obrigação. Acompanhe o status e gere alertas para prazos críticos.",
      },
      {
        prompt: "Como emitir guia de recolhimento atrasada?",
        answer:
          "Abra o FISF200, selecione a obrigação, marque 'Guia Complementar' e informe data de pagamento. O sistema calcula multa e juros automaticamente.",
      },
      {
        prompt: "Onde consultar alíquotas por estado?",
        answer:
          "Utilize a função 'Tabela de Alíquotas' no SIGAFIS. Você pode exportar a planilha com filtros por UF, tributação e vigência.",
      },
    ],
  },
  {
    slug: "juridico",
    name: "Jurídico",
    tagline: "Segurança jurídica para cada decisão",
    description:
      "Acompanha processos, pareceres e prazos judiciais garantindo mitigação de riscos e atualização legal contínua.",
    mission:
      "Protege a SPSP com gestão proativa de processos, prazos críticos e integração com contratos e pessoas.",
    focusAreas: [
      "Cadastro e acompanhamento de processos judiciais",
      "Controle de prazos, audiências e publicações",
      "Produção de pareceres e integração com contratos",
    ],
    keywords: ["jurídico", "processo", "parecer", "prazo", "compliance"],
    shortcuts: [
      "Como cadastrar um novo processo trabalhista?",
      "Existe modelo de parecer para revisão contratual?",
      "Quais prazos vencem esta semana?",
    ],
    callToAction: "Abrir agente Jurídico",
    accent: {
      gradient: "from-rose-400 to-rose-700",
      glow: "bg-rose-600/35",
      badge: "text-rose-100",
    },
    protheusFunctions: [
      {
        code: "SIGAJURI",
        title: "Gestão Jurídica",
        description:
          "Centraliza processos, partes envolvidas, documentos e indicadores jurídicos.",
      },
      {
        code: "JURA120",
        title: "Cadastro de Processos",
        description:
          "Permite registrar processos, fases, audiências e responsáveis internos.",
      },
      {
        code: "JURA340",
        title: "Agenda de Prazos",
        description:
          "Controla prazos judiciais, gera alertas e integra com o calendário corporativo.",
      },
    ],
    knowledgeBase: [
      {
        prompt: "Como registrar um novo processo trabalhista?",
        answer:
          "No SIGAJURI abra JURA120, informe dados do processo, tribunal, partes e vincule documentos iniciais. Defina responsáveis e alertas de prazos automáticos.",
      },
      {
        prompt: "Existe modelo padrão de parecer para contratos?",
        answer:
          "Sim, utilize o repositório de modelos no SIGAJURI > Biblioteca. Há templates validados pelo jurídico SPSP e já integrados às cláusulas padrão.",
      },
      {
        prompt: "Como visualizar prazos que vencem na semana?",
        answer:
          "No JURA340 filtre por período '7 dias' e exporte a agenda para o Outlook do time responsável.",
      },
    ],
  },
  {
    slug: "manutencao",
    name: "Manutenção",
    tagline: "Operação contínua e preventiva",
    description:
      "Orienta planos preventivos, ordens corretivas e gestão de fornecedores técnicos para evitar paradas críticas.",
    mission:
      "Garante disponibilidade dos ativos SPSP com manutenção preventiva, controle de ordens e integração com estoque e contratos.",
    focusAreas: [
      "Planejamento preventivo e calibração de equipamentos",
      "Gestão de ordens corretivas com SLA",
      "Controle de fornecedores técnicos e checklists",
    ],
    keywords: [
      "manutenção",
      "ordem de serviço",
      "preventiva",
      "corretiva",
      "equipamento",
    ],
    shortcuts: [
      "Como abrir uma ordem de serviço corretiva urgente?",
      "Quais equipamentos estão com manutenção preventiva atrasada?",
      "Existe checklist para liberação após manutenção?",
    ],
    callToAction: "Abrir agente de Manutenção",
    accent: {
      gradient: "from-orange-500 to-red-500",
      glow: "bg-orange-500/30",
      badge: "text-orange-100",
    },
    protheusFunctions: [
      {
        code: "SIGAMNT",
        title: "Gestão de Manutenção",
        description:
          "Oferece visão geral das ordens abertas, backlog e indicadores de SLA.",
      },
      {
        code: "MNTM100",
        title: "Programação Preventiva",
        description:
          "Planeja ciclos preventivos, calibrações e integra com estoque de peças.",
      },
      {
        code: "MNTC210",
        title: "Controle de Ordens",
        description:
          "Acompanha ordens corretivas, tempo de atendimento e checklists de liberação.",
      },
    ],
    knowledgeBase: [
      {
        prompt: "Como abrir uma ordem corretiva urgente?",
        answer:
          "No SIGAMNT clique em 'Nova OS', marque prioridade 'Crítica', informe impacto operacional e selecione o técnico responsável. O sistema notifica suporte e operações.",
      },
      {
        prompt: "Onde vejo preventivas atrasadas?",
        answer:
          "Utilize o painel de backlog no MNTM100 filtrando por status 'Atrasado'. Gere a lista e realoque recursos conforme necessidade.",
      },
      {
        prompt: "Existe checklist para liberação pós-manutentiva?",
        answer:
          "Sim, associe o checklist padrão no MNTC210 antes de encerrar a OS. Ele garante conferência de segurança e anexos obrigatórios.",
      },
    ],
  },
  {
    slug: "rescisao-beneficios",
    name: "Rescisão e Benefícios",
    tagline: "Transições humanas e sem fricção",
    description:
      "Centraliza desligamentos, cálculos rescisórios e gestão de benefícios, garantindo acolhimento e conformidade legal.",
    mission:
      "Oferece experiência humanizada em desligamentos, com cálculos precisos, comunicação transparente e alinhamento sindical.",
    focusAreas: [
      "Gestão completa de desligamentos voluntários e involuntários",
      "Cálculo rescisório automático e conferência",
      "Comunicação de benefícios, seguros e sindicatos",
    ],
    keywords: [
      "rescisão",
      "desligamento",
      "benefício",
      "aviso prévio",
      "férias",
    ],
    shortcuts: [
      "Qual documentação é necessária para uma rescisão voluntária?",
      "Como calcular saldo de benefícios após desligamento?",
      "Existe fluxo para comunicação com sindicatos?",
    ],
    callToAction: "Abrir agente de Rescisão e Benefícios",
    accent: {
      gradient: "from-rose-400 to-pink-500",
      glow: "bg-pink-500/30",
      badge: "text-pink-100",
    },
    protheusFunctions: [
      {
        code: "SIGAGPE",
        title: "Gestão de Pessoal",
        description:
          "Controla admissões, desligamentos, afastamentos e integrações legais.",
      },
      {
        code: "GPEM410",
        title: "Cálculo Rescisório",
        description:
          "Consolida verbas rescisórias, descontos, FGTS e gera TRCT automaticamente.",
      },
      {
        code: "GPEA120",
        title: "Portal de Benefícios",
        description:
          "Atualiza benefícios ativos, bloqueios e comunicação com seguradoras.",
      },
    ],
    knowledgeBase: [
      {
        prompt: "Quais documentos reunir para rescisão voluntária?",
        answer:
          "Solicite carta de demissão assinada, checklist de devoluções e atualize dados bancários no SIGAGPE antes de gerar o cálculo.",
      },
      {
        prompt: "Como calcular saldo de benefícios?",
        answer:
          "No GPEM410 informe a data de desligamento e marcação de aviso. O sistema calcula verbas e desconta benefícios automaticamente.",
      },
      {
        prompt: "Como comunicar sindicato sobre desligamentos coletivos?",
        answer:
          "Utilize o fluxo padrão no SIGAGPE > Comunicações Sindicais anexando relação de colaboradores, motivos e datas previstas.",
      },
    ],
  },
  {
    slug: "recursos-humanos",
    name: "Recursos Humanos",
    tagline: "Jornadas completas para pessoas SPSP",
    description:
      "Apoia recrutamento, onboarding, avaliações e experiências do colaborador com roteiros personalizados.",
    mission:
      "Orquestra toda jornada do colaborador SPSP, desde atração até desenvolvimento contínuo, reforçando cultura e performance.",
    focusAreas: [
      "Recrutamento, seleção e onboarding digital",
      "Trilhas de desenvolvimento e performance",
      "Engajamento, clima e carreira",
    ],
    keywords: [
      "rh",
      "recursos humanos",
      "onboarding",
      "avaliação",
      "treinamento",
    ],
    shortcuts: [
      "Como solicitar abertura de vaga interna?",
      "Quais trilhas de desenvolvimento estão disponíveis?",
      "Existe formulário para feedback 360°?",
    ],
    callToAction: "Abrir agente de Recursos Humanos",
    accent: {
      gradient: "from-brand to-rose-500",
      glow: "bg-rose-500/25",
      badge: "text-rose-100",
    },
    protheusFunctions: [
      {
        code: "SIGARH",
        title: "Gestão de Pessoas",
        description:
          "Centraliza dados de colaboradores, organogramas e históricos de carreira.",
      },
      {
        code: "RHUA030",
        title: "Onboarding Digital",
        description:
          "Automatiza checklists de integração, entrega de materiais e treinamentos obrigatórios.",
      },
      {
        code: "RHUC200",
        title: "Avaliação de Desempenho",
        description:
          "Gerencia ciclos avaliativos, metas e feedbacks 360° integrados.",
      },
    ],
    knowledgeBase: [
      {
        prompt: "Como abrir uma vaga interna?",
        answer:
          "No SIGARH acesse Recrutamento > Nova Vaga, selecione perfil, requisitos e unidade. O fluxo envia para aprovação do gestor e publicação interna.",
      },
      {
        prompt: "Onde encontro trilhas de desenvolvimento?",
        answer:
          "Acesse o catálogo no SIGARH > Desenvolvimento e filtre por carreira ou competência. Os cursos podem ser atribuídos diretamente aos colaboradores.",
      },
      {
        prompt: "Como configurar feedback 360°?",
        answer:
          "Utilize o RHUC200 para criar um ciclo 360°, definindo avaliadores, pesos e prazos. O sistema notifica todos os participantes automaticamente.",
      },
    ],
  },
  {
    slug: "operacao",
    name: "Operação",
    tagline: "Execução em campo sincronizada",
    description:
      "Mantém escalas, ocorrências operacionais e indicadores de SLA com visão em tempo real das unidades SPSP.",
    mission:
      "Garante execução impecável nas bases SPSP, com monitoramento de escalas, ocorrências, SLAs e comunicação multicanal.",
    focusAreas: [
      "Gestão de escalas, plantões e reforços",
      "Registro e tratamento de ocorrências operacionais",
      "Acompanhamento de SLAs, produtividade e qualidade",
    ],
    keywords: ["operação", "escala", "ocorrência", "sla", "campo"],
    shortcuts: [
      "Como ajustar escala de plantão emergencial?",
      "Onde cadastro uma ocorrência operacional?",
      "Quais SLAs estão críticos hoje?",
    ],
    callToAction: "Abrir agente de Operação",
    accent: {
      gradient: "from-orange-500 to-red-600",
      glow: "bg-orange-500/35",
      badge: "text-orange-100",
    },
    protheusFunctions: [
      {
        code: "SIGAOPS",
        title: "Centro de Operações",
        description:
          "Monitora escalas, postos e disponibilidade de recursos por unidade.",
      },
      {
        code: "OPSM010",
        title: "Planejamento de Escalas",
        description:
          "Permite reprogramar turnos, registrar reforços e comunicar equipes instantaneamente.",
      },
      {
        code: "OPSC220",
        title: "Painel de Ocorrências",
        description:
          "Registra ocorrências operacionais, gera protocolos e acompanha resolução.",
      },
    ],
    knowledgeBase: [
      {
        prompt: "Como reprogramar plantão emergencial?",
        answer:
          "No SIGAOPS abra o OPSM010, selecione o posto, ajuste horário e confirme substituto. O sistema atualiza a escala e notifica o colaborador.",
      },
      {
        prompt: "Onde registrar ocorrências em campo?",
        answer:
          "Utilize o OPSC220, informe categoria, impacto e anexos. A ocorrência gera protocolo e integra com contratos e SLA.",
      },
      {
        prompt: "Como acompanhar SLAs críticos?",
        answer:
          "Ative o painel de SLAs no SIGAOPS filtrando por status 'Crítico' e acione as equipes responsáveis diretamente pelo módulo.",
      },
    ],
  },
  {
    slug: "arquivos",
    name: "Arquivos",
    tagline: "Documentos organizados e rastreáveis",
    description:
      "Gerencia acervos digitais e físicos, garantindo taxonomia, retenção e compliance com LGPD.",
    mission:
      "Preserva o conhecimento SPSP, controla versões e garante rastreabilidade e retenção conforme políticas e LGPD.",
    focusAreas: [
      "Digitalização, indexação e taxonomia padronizada",
      "Políticas de retenção e descarte seguro",
      "Governança documental com auditoria",
    ],
    keywords: ["arquivo", "documento", "lgpd", "digitalização", "retenção"],
    shortcuts: [
      "Como localizar um documento arquivado em 2019?",
      "Qual política de retenção para contratos finalizados?",
      "Existe padrão para nomenclatura de pastas digitais?",
    ],
    callToAction: "Abrir agente de Arquivos",
    accent: {
      gradient: "from-rose-500 to-rose-700",
      glow: "bg-rose-600/30",
      badge: "text-rose-100",
    },
    protheusFunctions: [
      {
        code: "SIGAARC",
        title: "Gestão Documental",
        description:
          "Cataloga documentos físicos e digitais, controla acesso e versões.",
      },
      {
        code: "ARQM050",
        title: "Taxonomia e Indexação",
        description:
          "Define estruturas de pastas, metadados e padrões de nomenclatura.",
      },
      {
        code: "ARQC200",
        title: "Política de Retenção",
        description:
          "Configura prazos de guarda, alertas de descarte e log de auditoria.",
      },
    ],
    knowledgeBase: [
      {
        prompt: "Como localizar um documento antigo?",
        answer:
          "Use o SIGAARC com busca por metadado: selecione ano '2019', tipo e unidade. Os resultados mostram versão e responsáveis.",
      },
      {
        prompt: "Qual política de retenção aplicar a contratos encerrados?",
        answer:
          "Verifique no ARQC200 a regra 'Contratos de Serviços' com prazo de 10 anos. O módulo indica data limite e sugere arquivamento externo ou descarte.",
      },
      {
        prompt: "Existe padrão de nomenclatura digital?",
        answer:
          "Sim, consulte o template no ARQM050 com campos obrigatórios: área, ano, tipo, descrição. O sistema valida automaticamente na inclusão.",
      },
    ],
  },
  {
    slug: "pagadoria",
    name: "Pagadoria",
    tagline: "Folha e repasses no ritmo certo",
    description:
      "Conduz processamento de folha, encargos e repasses financeiros mantendo prazos e conformidade trabalhista.",
    mission:
      "Entrega folha e repasses com exatidão, alinhando payroll, financeiro e legislação trabalhista sem atrasos.",
    focusAreas: [
      "Fechamento de folha e conferência de encargos",
      "Repasses a sindicatos, provisões e adiantamentos",
      "Distribuição de holerites digitais e informes",
    ],
    keywords: ["pagadoria", "folha", "holerite", "encargo", "repasses"],
    shortcuts: [
      "Quando ocorre o fechamento da folha mensal?",
      "Como emitir segunda via de holerite?",
      "Qual fluxo para repasse de encargos atrasados?",
    ],
    callToAction: "Abrir agente de Pagadoria",
    accent: {
      gradient: "from-rose-400 to-red-600",
      glow: "bg-red-600/30",
      badge: "text-red-100",
    },
    protheusFunctions: [
      {
        code: "GPEM120",
        title: "Processamento de Folha",
        description:
          "Executa cálculos mensais, conferências e gera arquivos bancários.",
      },
      {
        code: "FINA310",
        title: "Repasses Financeiros",
        description:
          "Controla recolhimentos, encargos sociais e gera guias de pagamento.",
      },
      {
        code: "GPEM180",
        title: "Holerite Eletrônico",
        description:
          "Disponibiliza holerites digitais, recibos e comprovantes com logs de leitura.",
      },
    ],
    knowledgeBase: [
      {
        prompt: "Quando fecha a folha mensal?",
        answer:
          "O cronograma padrão encerra no dia 25. Consulte no GPEM120 o calendário corrente e verifique exceções como 13º ou férias coletivas.",
      },
      {
        prompt: "Como emitir segunda via de holerite?",
        answer:
          "Utilize o portal do colaborador no GPEM180. Informe CPF e competência para gerar o PDF autenticado.",
      },
      {
        prompt: "Como regularizar encargos em atraso?",
        answer:
          "No FINA310 selecione o encargo, marque 'Pagamento em atraso' e gere a guia com acréscimo automático de multa e juros.",
      },
    ],
  },
  {
    slug: "nexti",
    name: "NEXTI",
    tagline: "Transformação digital e inovação",
    description:
      "Conecta squads, roadmaps tecnológicos e iniciativas de inovação contínua dentro da SPSP.",
    mission:
      "Impulsiona evolução digital SPSP integrando squads, backlog estratégico e entrega contínua de produtos.",
    focusAreas: [
      "Gestão de portfolio e roadmap de produtos",
      "Follow-up de squads e OKRs de inovação",
      "Mapeamento de integrações e API management",
    ],
    keywords: ["nexti", "inovação", "squad", "produto digital", "roadmap"],
    shortcuts: [
      "Como priorizar demandas no backlog do NEXTI?",
      "Quais squads estão ativos neste trimestre?",
      "Existe guideline para discovery de novos produtos?",
    ],
    callToAction: "Abrir agente NEXTI",
    accent: {
      gradient: "from-rose-500 to-purple-600",
      glow: "bg-purple-500/30",
      badge: "text-purple-100",
    },
    protheusFunctions: [
      {
        code: "SIGADEV",
        title: "Gestão de Roadmap",
        description:
          "Organiza backlog estratégico, releases e dependências com outras áreas.",
      },
      {
        code: "DEVX200",
        title: "Squads e Sprints",
        description:
          "Monitora squads ativos, capacidade, entregas e indicadores de saúde.",
      },
      {
        code: "DEVX320",
        title: "Catálogo de APIs",
        description:
          "Documenta integrações, tokens, SLAs técnicos e governança de APIs.",
      },
    ],
    knowledgeBase: [
      {
        prompt: "Como priorizar o backlog estratégico?",
        answer:
          "No SIGADEV utilize o ranking de valor vs. esforço, valide dependências e aprove no comitê digital para entrada no pipeline.",
      },
      {
        prompt: "Onde acompanho squads ativos?",
        answer:
          "Acesse DEVX200, selecione o trimestre e monitore desempenho, velocity e riscos por squad.",
      },
      {
        prompt: "Existe guideline para discovery?",
        answer:
          "Consulte o manual no SIGADEV > Discovery Toolkit com roadmap de entrevistas, canvas de solução e critérios de priorização.",
      },
    ],
  },
  {
    slug: "protheus",
    name: "PROTHEUS",
    tagline: "Especialista no ecossistema TOTVS",
    description:
      "Orienta parametrizações, integrações e boas práticas no PROTHEUS, garantindo estabilidade e aderência aos processos SPSP.",
    mission:
      "Sustenta o Protheus SPSP, garante governança de customizações e integrações e acelera melhorias com segurança.",
    focusAreas: [
      "Parametrização e atualização de versões",
      "Administração de integrações e APIs",
      "Suporte avançado a módulos SPSP",
    ],
    keywords: [
      "protheus",
      "totvs",
      "parametrização",
      "integração",
      "atualização",
    ],
    shortcuts: [
      "Como solicitar ajuste em rotina do PROTHEUS?",
      "Qual calendário de atualizações da TOTVS?",
      "Existe documentação de integrações com sistemas terceiros?",
    ],
    callToAction: "Abrir agente PROTHEUS",
    accent: {
      gradient: "from-rose-500 to-indigo-600",
      glow: "bg-indigo-500/30",
      badge: "text-indigo-100",
    },
    protheusFunctions: [
      {
        code: "SIGACFG",
        title: "Administração do Sistema",
        description:
          "Controla ambientes, parâmetros, licenças e atualizações do Protheus.",
      },
      {
        code: "CFGX100",
        title: "Gestão de Customizações",
        description:
          "Administra fontes, pacotes e versionamento de customizações SPSP.",
      },
      {
        code: "APPM010",
        title: "Integrações e APIs",
        description:
          "Documenta integrações, credenciais e monitora dados trafegados.",
      },
    ],
    knowledgeBase: [
      {
        prompt: "Como solicitar ajuste de rotina?",
        answer:
          "Abra chamado no SIGACFG > Demandas, informe rotina, ambiente e impacto. A equipe avalia, prioriza e devolve estimativa.",
      },
      {
        prompt: "Onde consultar calendário de updates?",
        answer:
          "Verifique o painel 'Atualizações Programadas' no SIGACFG com pacotes TOTVS e janelas de manutenção aprovadas.",
      },
      {
        prompt: "Existe documentação de integrações?",
        answer:
          "Sim, utilize o APPM010 para acessar o catálogo de APIs, contratos, tokens e logs de consumo em tempo real.",
      },
    ],
  },
  {
    slug: "spsp-plus",
    name: "SPSP+",
    tagline: "Experiência ampliada para clientes",
    description:
      "Cuida do ecossistema SPSP+, desde onboarding de clientes até integrações com parceiros e jornadas digitais.",
    mission:
      "Eleva a experiência SPSP+, conectando clientes, parceiros e soluções digitais em jornadas fluidas e monitoradas.",
    focusAreas: [
      "Onboarding de clientes e habilitação de serviços",
      "Portal de autoatendimento e métricas de uso",
      "Integrações com parceiros e ecossistema digital",
    ],
    keywords: ["spsp+", "cliente", "portal", "parceiro", "experiência"],
    shortcuts: [
      "Como habilitar um novo cliente no SPSP+?",
      "Existe material de treinamento para parceiros?",
      "Quais integrações estão previstas para este semestre?",
    ],
    callToAction: "Abrir agente SPSP+",
    accent: {
      gradient: "from-rose-500 to-red-500",
      glow: "bg-rose-500/30",
      badge: "text-rose-100",
    },
    protheusFunctions: [
      {
        code: "SIGASPS",
        title: "Portal SPSP+",
        description:
          "Configura clientes, jornadas disponíveis e indicadores de engajamento.",
      },
      {
        code: "SPSM120",
        title: "Onboarding Digital",
        description:
          "Orquestra etapas de ativação, documentos e treinamentos para novos clientes.",
      },
      {
        code: "SPSA200",
        title: "Integrações Parceiras",
        description:
          "Gerencia integrações com plataformas externas, status de APIs e catálogos compartilhados.",
      },
    ],
    knowledgeBase: [
      {
        prompt: "Como ativar um novo cliente no SPSP+?",
        answer:
          "No SIGASPS selecione 'Novo Cliente', cadastre módulos contratados e dispare o fluxo no SPSM120 para onboarding completo.",
      },
      {
        prompt: "Onde encontro treinamentos para parceiros?",
        answer:
          "Acesse o hub de conteúdos em SIGASPS > Academy. Lá estão trilhas, webinars e materiais comerciais atualizados.",
      },
      {
        prompt: "Como consultar integrações previstas?",
        answer:
          "Verifique o roadmap no SPSA200, filtrando por semestre e status. Cada integração possui sponsor e data estimada.",
      },
    ],
  },
];

export const agentsBySlug = Object.fromEntries(
  agents.map((agent) => [agent.slug.toLowerCase(), agent])
) as Record<string, Agent>;

export const getAgentBySlug = (slug: string | undefined) => {
  if (!slug) {
    return undefined;
  }

  try {
    const normalized = decodeURIComponent(slug).trim().toLowerCase();
    return agentsBySlug[normalized];
  } catch {
    const normalized = slug.trim().toLowerCase();
    return agentsBySlug[normalized];
  }
};
