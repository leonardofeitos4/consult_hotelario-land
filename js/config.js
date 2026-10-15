/* ═══════════════════════════════════════════════════════════
   CONSULT HOTELARIA — TUDO QUE MUDA NO SITE FICA AQUI
   Textos aceitam HTML simples: <strong>, <em>, <br>
   ⚠ TROCAR = dado provisório
   📷 Fotos em /assets (trocar o arquivo mantendo o nome já atualiza o site)
═══════════════════════════════════════════════════════════ */
const SITE = {

  brand: 'Consult Hotelaria',
  short: 'Consult',
  tagline: 'Gestão hoteleira de ponta a ponta',
  heroTitle: 'Seu flat cheio,<br><em>sua cabeça leve.</em>',
  intro: 'Administração de flats e casas, consultoria de gestão hoteleira e treinamentos em <strong>Pipa</strong> e <strong>Porto de Galinhas</strong>.',
  places: 'Pipa · Porto de Galinhas',

  /* mensagens que rodam na ilha do topo */
  ticker: ['Atendendo em Pipa & Porto de Galinhas', 'Administração de flats e casas', 'Consultoria de gestão hoteleira', 'Treinamentos para equipes'],

  whatsapp: '5500000000000',                       // ⚠ TROCAR: DDI+DDD+número, só dígitos
  whatsappMsg: 'Olá! Vim pelo site da Consult Hotelaria e gostaria de conversar.',
  instagram: 'https://www.instagram.com/consult_hotelaria',

  /* cores do fundo animado (shader) */
  colors: ['#0b4f55', '#1f8a8a', '#f1e3c8', '#e8734a'],

  hero: 'assets/pipa.jpg',
  cover: 'assets/pipa-2.jpg',

  /* faixa que corre embaixo do hero */
  marquee: ['Administração de flats e casas', 'Consultoria hoteleira', 'Treinamentos', 'Pipa', 'Porto de Galinhas'],

  /* ── BIOLINK ── url: "wa" | "wa:mensagem" | "bot" | link  ·  img = foto de fundo do botão (opcional) */
  links: [
    { icon: '💬', title: 'Falar no WhatsApp', sub: 'Resposta rápida, sem compromisso', url: 'wa', cta: true },
    { icon: '🏘️', title: 'Administração de flats e casas', sub: 'Você recebe, a gente cuida de tudo', url: 'wa:Quero saber sobre a administração do meu flat/casa.', img: 'assets/casa-piscina.jpg' },
    { icon: '🏨', title: 'Consultoria de gestão hoteleira', sub: 'Diagnóstico e plano de melhoria', url: 'wa:Quero uma consultoria de gestão hoteleira.', img: 'assets/resort.jpg' },
    { icon: '🎓', title: 'Treinamentos para equipes', sub: 'Atendimento, governança, recepção', url: 'wa:Quero saber sobre treinamentos para minha equipe.', img: 'assets/suite-2.jpg' },
    { icon: '🤖', title: 'Tirar dúvidas agora', sub: 'Converse com a Consu', url: 'bot' },
    { icon: '📍', title: 'Pipa — como chegar', sub: 'Abrir no Google Maps', url: 'https://www.google.com/maps/search/?api=1&query=Praia+de+Pipa+Tibau+do+Sul+RN' },
    { icon: '📍', title: 'Porto de Galinhas — como chegar', sub: 'Abrir no Google Maps', url: 'https://www.google.com/maps/search/?api=1&query=Porto+de+Galinhas+Ipojuca+PE' },
    { icon: '📸', title: 'Instagram', sub: '@consult_hotelaria', url: 'https://www.instagram.com/consult_hotelaria' },
  ],

  /* ── FLATS E CASAS (galeria) — ⚠ TROCAR por imóveis reais ── */
  flats: [
    { img: 'assets/casa-piscina.jpg',  name: 'Casa com piscina',    place: 'Pipa',              info: '4 quartos · até 10 hóspedes' },
    { img: 'assets/suite-1.jpg',       name: 'Flat vista jardim',   place: 'Pipa',              info: '1 quarto · até 3 hóspedes' },
    { img: 'assets/casa-moderna.jpg',  name: 'Casa de alto padrão', place: 'Porto de Galinhas', info: '5 quartos · até 12 hóspedes' },
    { img: 'assets/sala.jpg',          name: 'Apartamento 2 quartos', place: 'Porto de Galinhas', info: '2 quartos · até 5 hóspedes' },
    { img: 'assets/deck.jpg',          name: 'Flat com área de lazer', place: 'Pipa',           info: '2 quartos · até 6 hóspedes' },
    { img: 'assets/suite-3.jpg',       name: 'Suíte premium',       place: 'Porto de Galinhas', info: '1 quarto · até 2 hóspedes' },
  ],

  /* ── SERVIÇOS ── */
  services: [
    { img: 'assets/casa-piscina.jpg', title: 'Administração de flats e casas', size: 'big',
      text: 'Gestão completa da sua unidade: operação, limpeza, check-in/out, precificação e relacionamento com o hóspede.',
      tags: ['Operação', 'Precificação', 'Hóspedes', 'Manutenção'] },
    { img: 'assets/resort.jpg', title: 'Consultoria de gestão hoteleira',
      text: 'Diagnóstico de processos, equipe e receita — com plano prático para executar.', tags: ['Diagnóstico', 'Processos'] },
    { img: 'assets/suite-2.jpg', title: 'Treinamentos',
      text: 'Capacitação para a equipe atender melhor e padronizar a operação.', tags: ['Equipe', 'Padrão'] },
  ],

  /* ── DESTINOS (foto + mapa) ── */
  destinos: [
    { name: 'Pipa', state: 'Rio Grande do Norte', img: 'assets/pipa.jpg',
      text: 'Falésias, golfinhos e uma das praias mais desejadas do Nordeste — demanda o ano todo.',
      spots: ['Baía dos Golfinhos', 'Praia do Madeiro', 'Chapadão'],
      map: 'https://www.google.com/maps?q=Praia+de+Pipa,+Tibau+do+Sul,+RN&z=13&output=embed',
      link: 'https://www.google.com/maps/search/?api=1&query=Praia+de+Pipa+Tibau+do+Sul+RN' },
    { name: 'Porto de Galinhas', state: 'Pernambuco', img: 'assets/porto.jpg',
      text: 'Piscinas naturais de águas cristalinas e estrutura turística forte para famílias e casais.',
      spots: ['Piscinas naturais', 'Maracaípe', 'Muro Alto'],
      map: 'https://www.google.com/maps?q=Porto+de+Galinhas,+Ipojuca,+PE&z=13&output=embed',
      link: 'https://www.google.com/maps/search/?api=1&query=Porto+de+Galinhas+Ipojuca+PE' },
  ],

  steps: [
    { t: 'Conversa inicial', d: 'Você conta sobre sua unidade ou hotel e o que quer melhorar.' },
    { t: 'Diagnóstico',      d: 'Analisamos operação, receita e experiência do hóspede.' },
    { t: 'Plano sob medida', d: 'Proposta clara: o que fazer e em qual ordem.' },
    { t: 'Execução',         d: 'A gente cuida do dia a dia ou treina sua equipe para cuidar.' },
  ],

  devCredit: { name: '@lfdesenvolvimentos', url: 'https://www.instagram.com/lfdesenvolvimentos/' },

  /* ── ASSISTENTE ── */
  bot: {
    name: 'Consu',
    teaser: 'Dúvidas? Eu respondo agora 👋',
    welcome: 'Oi! Eu sou a <strong>Consu</strong>, assistente da <strong>Consult Hotelaria</strong>. 😊<br>Posso tirar dúvidas sobre nossos serviços. O que você procura?',
    fallback: 'Hmm, não tenho certeza sobre isso. 🤔 Escolha uma opção abaixo ou fale direto com a equipe no WhatsApp.',
    typingMs: 900,
    flows: {
      inicio: {
        msg: 'Como posso ajudar?',
        keys: ['oi', 'ola', 'menu', 'inicio', 'ajuda'],
        chips: [
          { l: '🏘️ Administrar meu flat/casa', f: 'flats' },
          { l: '🏨 Consultoria hoteleira',     f: 'consultoria' },
          { l: '🎓 Treinamentos',               f: 'treinamentos' },
          { l: '📍 Onde atendem?',              f: 'locais' },
          { l: '💰 Quanto custa?',              f: 'valores' },
        ],
      },
      flats: {
        msg: 'Na <strong>administração de flats e casas</strong> a gente cuida da operação inteira: recepção do hóspede, limpeza e enxoval, manutenção, precificação e anúncios.<br><br>Você foca em receber o resultado. Quer entender como funciona para a sua unidade?',
        keys: ['flat', 'casa', 'administr', 'airbnb', 'temporada', 'imovel', 'apartamento', 'alugar'],
        chips: [
          { l: '📍 Onde atendem?', f: 'locais' },
          { l: '💰 Quanto custa?', f: 'valores' },
          { l: '💬 Falar com a equipe', wa: 'Tenho um flat/casa e quero saber sobre a administração.' },
        ],
      },
      consultoria: {
        msg: 'A <strong>consultoria de gestão hoteleira</strong> faz um diagnóstico do seu negócio — processos, equipe, receita e experiência do hóspede — e entrega um plano prático do que mudar primeiro.<br><br>Serve para hotéis, pousadas e operações de hospedagem.',
        keys: ['consultoria', 'consultor', 'hotel', 'pousada', 'gestao', 'diagnostico', 'melhorar', 'receita'],
        chips: [
          { l: '💰 Quanto custa?', f: 'valores' },
          { l: '💬 Quero um diagnóstico', wa: 'Quero uma consultoria de gestão para minha hospedagem.' },
        ],
      },
      treinamentos: {
        msg: 'Os <strong>treinamentos</strong> preparam sua equipe para atender melhor e padronizar a operação: recepção, governança, atendimento ao hóspede e rotinas do dia a dia.<br><br>Podem ser feitos no seu local, sob medida.',
        keys: ['treinamento', 'treinar', 'equipe', 'curso', 'capacitacao', 'funcionario', 'colaborador'],
        chips: [
          { l: '💰 Quanto custa?', f: 'valores' },
          { l: '💬 Quero treinar minha equipe', wa: 'Quero um treinamento para minha equipe.' },
        ],
      },
      locais: {
        msg: '📍 Atuamos em <strong>Pipa (RN)</strong> e <strong>Porto de Galinhas (PE)</strong>.<br><br>Está em outra cidade? Fale com a equipe — dependendo do projeto, a gente avalia.',
        keys: ['onde', 'local', 'cidade', 'pipa', 'porto', 'galinhas', 'regiao', 'atendem'],
        chips: [
          { l: '💬 Falar com a equipe', wa: 'Gostaria de saber se vocês atendem minha região.' },
          { l: '↩ Início', f: 'inicio' },
        ],
      },
      valores: {
        msg: 'Cada projeto é diferente (tamanho, serviços e destino), então o valor é montado <strong>sob medida</strong>. A equipe faz uma proposta rápida e sem compromisso pelo WhatsApp. 😉',
        keys: ['valor', 'preco', 'custa', 'quanto', 'orcamento', 'taxa', 'comissao', 'mensalidade'],
        chips: [
          { l: '💬 Pedir orçamento', wa: 'Gostaria de um orçamento.' },
          { l: '↩ Início', f: 'inicio' },
        ],
      },
    },
  },
};
