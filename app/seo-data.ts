export const BASE_PATH = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://nuvem-bombas.luiswagnercosta.chatgpt.site").replace(/\/$/, "");
export const WHATSAPP_NUMBER = "5511960880719";
export const PHONE_DISPLAY = "+55 (11) 96088-0719";
export const INSTAGRAM_URL = "https://www.instagram.com/nuvempiscinas/";

export function whatsappUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function withBasePath(path: string) {
  if (!path.startsWith("/")) return path;
  return `${BASE_PATH}${path}`;
}

type ServiceStep = { title: string; text: string };

export type ServicePage = {
  slug: string;
  shortTitle: string;
  metaTitle: string;
  metaDescription: string;
  title: string;
  lead: string;
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  symptomsTitle: string;
  symptoms: string[];
  applications: string[];
  steps: ServiceStep[];
  closing: string;
};

export const servicePages: ServicePage[] = [
  {
    slug: "manutencao-bombas-submersiveis",
    shortTitle: "Bombas submersíveis",
    metaTitle: "Manutenção de Bomba Submersível em São Paulo",
    metaDescription: "Manutenção de bombas submersíveis em São Paulo e Grande SP. Diagnóstico, recuperação e testes para poços, drenagem, condomínios e obras.",
    title: "Manutenção de bombas submersíveis em São Paulo",
    lead: "Avaliação técnica, desmontagem, recuperação e testes para restabelecer a operação de bombas utilizadas em drenagem, poços, obras, condomínios e aplicações industriais.",
    image: "/images/portfolio-submersivel.webp",
    imageAlt: "Bomba submersível azul recuperada em bancada de testes na oficina",
    imageWidth: 1448,
    imageHeight: 1086,
    symptomsTitle: "Quando procurar manutenção para a bomba submersível",
    symptoms: ["A bomba não liga ou desarma a proteção", "Redução de vazão ou pressão", "Ruído, vibração ou aquecimento fora do normal", "Falhas recorrentes, infiltração ou desgaste de cabos"],
    applications: ["Poços e reservatórios", "Drenagem de obras e áreas alagadas", "Condomínios e edifícios", "Sistemas industriais e de saneamento"],
    steps: [
      { title: "Inspeção inicial", text: "Identificação dos sintomas, aplicação, potência e condições de instalação." },
      { title: "Desmontagem técnica", text: "Verificação de componentes elétricos, hidráulicos, cabos, vedações e rolamentos." },
      { title: "Recuperação", text: "Execução dos reparos aprovados e substituição dos itens necessários." },
      { title: "Testes finais", text: "Conferência de funcionamento e preparação do equipamento para entrega." },
    ],
    closing: "A definição do reparo depende da inspeção do equipamento. Envie fotos, potência, aplicação e os sintomas pelo WhatsApp para receber a orientação inicial.",
  },
  {
    slug: "manutencao-bombas-centrifugas",
    shortTitle: "Bombas centrífugas",
    metaTitle: "Manutenção de Bomba Centrífuga em São Paulo",
    metaDescription: "Manutenção de bombas centrífugas em São Paulo: diagnóstico de vazamentos, perda de pressão, ruídos, travamentos e falhas em sistemas de bombeamento.",
    title: "Manutenção de bombas centrífugas em São Paulo",
    lead: "Diagnóstico e recuperação de conjuntos centrífugos para corrigir perda de desempenho, vazamentos, vibração, ruídos e falhas que comprometem o bombeamento.",
    image: "/images/portfolio-bomba-desmontada.webp",
    imageAlt: "Bomba centrífuga desmontada com componentes organizados para inspeção",
    imageWidth: 1448,
    imageHeight: 1086,
    symptomsTitle: "Sinais de que a bomba centrífuga precisa de avaliação",
    symptoms: ["Perda de pressão ou vazão", "Vazamento na vedação ou carcaça", "Ruído, cavitação ou vibração excessiva", "Motor aquecendo ou conjunto travado"],
    applications: ["Sistemas prediais e condomínios", "Indústrias e processos", "Pressurização e transferência", "Circulação de água e utilidades"],
    steps: [
      { title: "Levantamento da falha", text: "Análise do comportamento do conjunto e das condições informadas pelo cliente." },
      { title: "Inspeção dos componentes", text: "Verificação de rotor, eixo, rolamentos, vedações, acoplamento e carcaça." },
      { title: "Correção aprovada", text: "Recuperação ou substituição dos componentes definidos no orçamento." },
      { title: "Montagem e teste", text: "Alinhamento, montagem e verificação do funcionamento antes da liberação." },
    ],
    closing: "Informações sobre potência, fluido bombeado, aplicação e sintomas ajudam a direcionar o primeiro atendimento. O orçamento é definido após a inspeção.",
  },
  {
    slug: "rebobinagem-motores-eletricos",
    shortTitle: "Rebobinagem de motores",
    metaTitle: "Rebobinagem de Motores Elétricos em São Paulo",
    metaDescription: "Rebobinagem e recuperação de motores elétricos em São Paulo e Grande SP, incluindo motores de diferentes portes e equipamentos de até 500 CV.",
    title: "Rebobinagem de motores elétricos em São Paulo",
    lead: "Recuperação de motores elétricos de diferentes portes, com avaliação dos enrolamentos, componentes mecânicos e condições que provocaram a falha.",
    image: "/images/portfolio-rebobinagem.webp",
    imageAlt: "Técnico realizando rebobinagem de motor elétrico com bobinas de cobre",
    imageWidth: 1003,
    imageHeight: 1568,
    symptomsTitle: "Quando avaliar a rebobinagem do motor",
    symptoms: ["Motor queimado ou sem partida", "Desarme frequente da proteção", "Aquecimento, odor ou ruído anormal", "Perda de força, vibração ou falha de isolamento"],
    applications: ["Bombas e sistemas hidráulicos", "Máquinas industriais", "Ventilação e exaustão", "Equipamentos de pequeno e grande porte"],
    steps: [
      { title: "Diagnóstico elétrico", text: "Medições e avaliação do enrolamento, isolamento e causa provável da falha." },
      { title: "Inspeção mecânica", text: "Verificação de eixo, rolamentos, tampas, ventilação e demais componentes." },
      { title: "Rebobinagem", text: "Execução do novo enrolamento conforme as características técnicas do motor." },
      { title: "Montagem e ensaio", text: "Finalização do conjunto e testes de funcionamento antes da entrega." },
    ],
    closing: "A viabilidade da rebobinagem depende do estado geral do motor. Informe potência, tensão, aplicação e sintomas para agilizar a avaliação inicial.",
  },
  {
    slug: "manutencao-ferramentas-eletricas",
    shortTitle: "Ferramentas elétricas",
    metaTitle: "Conserto de Ferramentas Elétricas em São Paulo",
    metaDescription: "Manutenção de furadeiras, lixadeiras, marteletes e ferramentas elétricas em São Paulo. Avaliação técnica para profissionais, empresas e obras.",
    title: "Manutenção de ferramentas elétricas em São Paulo",
    lead: "Avaliação e manutenção de ferramentas utilizadas por profissionais, equipes de manutenção, empresas e obras, com análise da falha antes da definição do reparo.",
    image: "/images/workshop.webp",
    imageAlt: "Oficina técnica organizada para manutenção de máquinas e equipamentos elétricos",
    imageWidth: 1448,
    imageHeight: 1086,
    symptomsTitle: "Problemas comuns em ferramentas elétricas",
    symptoms: ["Ferramenta não liga ou perde potência", "Faíscas, cheiro de queimado ou aquecimento", "Ruído, vibração ou folga excessiva", "Cabo, interruptor ou mandril com falha"],
    applications: ["Furadeiras e parafusadeiras", "Lixadeiras e esmerilhadeiras", "Marteletes e ferramentas de impacto", "Equipamentos usados em manutenção e obras"],
    steps: [
      { title: "Identificação", text: "Registro do modelo, aplicação e comportamento apresentado pela ferramenta." },
      { title: "Avaliação técnica", text: "Inspeção elétrica e mecânica dos componentes relacionados à falha." },
      { title: "Orçamento", text: "Apresentação do reparo recomendado e das peças necessárias." },
      { title: "Reparo e teste", text: "Execução após aprovação e verificação do funcionamento do equipamento." },
    ],
    closing: "Envie a marca, o modelo e uma descrição do problema. A disponibilidade de peças e a condição do equipamento são confirmadas durante a avaliação.",
  },
  {
    slug: "venda-bombas-equipamentos",
    shortTitle: "Venda de bombas",
    metaTitle: "Venda de Bombas e Equipamentos em São Paulo",
    metaDescription: "Venda orientada de bombas e equipamentos em São Paulo. Apoio técnico para escolher o modelo adequado à vazão, pressão e aplicação do sistema.",
    title: "Venda de bombas e equipamentos em São Paulo",
    lead: "Orientação técnica para escolher bombas e equipamentos compatíveis com a aplicação, evitando dimensionamento inadequado, baixo desempenho e consumo desnecessário.",
    image: "/images/hero-pump.webp",
    imageAlt: "Bomba centrífuga e motor elétrico instalados em bancada técnica",
    imageWidth: 1536,
    imageHeight: 960,
    symptomsTitle: "Informações importantes para escolher uma bomba",
    symptoms: ["Vazão necessária para a aplicação", "Altura, pressão ou desnível do sistema", "Tipo de líquido e condições de operação", "Tensão elétrica, tubulação e frequência de uso"],
    applications: ["Condomínios e residências", "Indústrias e empresas", "Obras e drenagem", "Piscinas e circulação de água"],
    steps: [
      { title: "Entendimento da aplicação", text: "Levantamento do uso, local, fluido e desempenho esperado." },
      { title: "Dados do sistema", text: "Análise das informações de vazão, pressão, tubulação e alimentação elétrica." },
      { title: "Seleção orientada", text: "Indicação de alternativas compatíveis, sujeitas à disponibilidade." },
      { title: "Suporte ao cliente", text: "Orientações sobre retirada, entrega e cuidados básicos de aplicação." },
    ],
    closing: "Para receber uma orientação inicial, envie fotos da instalação e os dados disponíveis. Projetos e dimensionamentos específicos podem exigir levantamento técnico adicional.",
  },
  {
    slug: "manutencao-bombas-piscina",
    shortTitle: "Bombas para piscinas",
    metaTitle: "Manutenção de Bomba de Piscina em São Paulo",
    metaDescription: "Manutenção de bombas de piscina, filtros e circulação de água em São Paulo. Diagnóstico de vazão, ruído, vazamentos e falhas no conjunto.",
    title: "Manutenção de bombas e sistemas de piscina em São Paulo",
    lead: "Manutenção de bombas, avaliação da circulação, suporte para filtros e orientação técnica para recuperar o funcionamento do sistema de piscina.",
    image: "/images/portfolio-piscina.webp",
    imageAlt: "Técnico verificando bomba e sistema de filtragem de piscina",
    imageWidth: 1448,
    imageHeight: 1086,
    symptomsTitle: "Sinais de falha no sistema da piscina",
    symptoms: ["Água circulando com pouca força", "Bomba ruidosa, travada ou aquecendo", "Vazamentos no conjunto ou nas conexões", "Filtro com pressão anormal ou baixa eficiência"],
    applications: ["Piscinas residenciais", "Condomínios e clubes", "Hotéis e espaços de lazer", "Casas de máquinas e sistemas de filtragem"],
    steps: [
      { title: "Análise dos sintomas", text: "Levantamento da condição da bomba, filtro, tubulação e circulação percebida." },
      { title: "Inspeção do conjunto", text: "Verificação dos componentes relacionados à perda de desempenho ou vazamento." },
      { title: "Solução recomendada", text: "Definição da manutenção, troca de areia ou orientação necessária ao sistema." },
      { title: "Funcionamento", text: "Testes e recomendações para o uso correto após a execução do serviço." },
    ],
    closing: "Fotos da casa de máquinas, da etiqueta da bomba e do filtro ajudam no primeiro contato. O diagnóstico final depende da avaliação do sistema.",
  },
];

export function getService(slug: string) {
  return servicePages.find((service) => service.slug === slug);
}
