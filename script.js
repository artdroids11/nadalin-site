const body = document.body;
const menuButton = document.querySelector(".menu-toggle");
const mainMenu = document.querySelector(".main-nav");
const accordionRoot = document.querySelector("#manual-accordion");
const stage = document.querySelector("#ecosystem-stage");
const nodeButtons = document.querySelectorAll(".eco-node");
const ecosystemTitle = document.querySelector("#ecosystem-title");
const ecosystemMessage = document.querySelector("#ecosystem-message");

const manualItems = [
  ["Planejar períodos de aplicação", "Aplicações agrícolas precisam considerar horários de menor visita das abelhas.", "Reduz risco de intoxicação e perdas nas colmeias.", "Comunicar o apicultor e seguir orientação técnica antes do manejo."],
  ["Preservar áreas de vegetação", "A mata nativa oferece flores, abrigo e equilíbrio térmico.", "Sem habitat, a presença de polinizadores diminui.", "Manter faixas de vegetação próximas a cultivos e nascentes."],
  ["Criar corredores floridos", "Faixas com plantas variadas funcionam como rotas de alimento.", "Garantem recursos para abelhas em diferentes épocas.", "Plantar espécies floridas nas bordas da propriedade."],
  ["Proteger água e nascentes", "Água limpa sustenta abelhas, plantas, animais e pessoas.", "Contaminação afeta todo o sistema produtivo.", "Isolar nascentes e evitar descarte de produtos químicos."],
  ["Posicionar colmeias com segurança", "Colmeias precisam de acesso, sombra parcial e proteção.", "Um bom local diminui estresse e acidentes.", "Evitar áreas de passagem intensa, pulverização e alagamento."],
  ["Evitar queimadas", "O fogo elimina flores, ninhos e vida do solo.", "A recuperação ambiental pode ser lenta.", "Usar manejo preventivo e orientar a comunidade."],
  ["Dialogar com apicultores e agricultores", "A comunicação antecipa riscos e combina calendários.", "Integra produção, proteção e responsabilidade.", "Criar aviso local sobre floradas, colheitas e aplicações."],
  ["Diversificar plantas e floradas", "Diversidade vegetal oferece alimento por mais tempo.", "Fortalece polinizadores e reduz desequilíbrios.", "Combinar árvores, hortaliças, flores e plantas nativas."]
];

const ecosystemState = {
  bees: true,
  flowers: true,
  crops: true,
  water: true,
  forest: true,
  biodiversity: true,
  community: true
};

const meters = {
  pollination: {
    value: document.querySelector("#meter-pollination"),
    fill: document.querySelector("#fill-pollination")
  },
  production: {
    value: document.querySelector("#meter-production"),
    fill: document.querySelector("#fill-production")
  },
  water: {
    value: document.querySelector("#meter-water"),
    fill: document.querySelector("#fill-water")
  },
  biodiversity: {
    value: document.querySelector("#meter-biodiversity"),
    fill: document.querySelector("#fill-biodiversity")
  },
  community: {
    value: document.querySelector("#meter-community"),
    fill: document.querySelector("#fill-community")
  }
};

let fontScale = 1;

function clampScore(value) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function active(node) {
  return ecosystemState[node] ? 1 : 0;
}

function calculateEcosystem() {
  const pollination = clampScore(
    active("bees") * 30 +
    active("flowers") * 24 +
    active("forest") * 14 +
    active("water") * 10 +
    active("biodiversity") * 16 +
    active("community") * 6
  );

  const production = clampScore(
    active("crops") * 26 +
    active("bees") * 18 +
    active("flowers") * 14 +
    active("water") * 18 +
    active("biodiversity") * 10 +
    active("community") * 14
  );

  const water = clampScore(
    active("water") * 42 +
    active("forest") * 28 +
    active("biodiversity") * 12 +
    active("flowers") * 6 +
    active("community") * 12
  );

  const biodiversity = clampScore(
    active("biodiversity") * 24 +
    active("forest") * 28 +
    active("flowers") * 18 +
    active("water") * 12 +
    active("bees") * 12 +
    active("community") * 6
  );

  const community = clampScore(
    active("community") * 40 +
    active("crops") * 12 +
    active("bees") * 12 +
    active("water") * 12 +
    active("forest") * 12 +
    active("biodiversity") * 12
  );

  return { pollination, production, water, biodiversity, community };
}

function getEcosystemCopy(scores) {
  const activeNodes = Object.values(ecosystemState).filter(Boolean).length;
  const average = clampScore(Object.values(scores).reduce((sum, value) => sum + value, 0) / 5);

  if (average >= 82 && activeNodes === 7) {
    return {
      title: "Propriedade integrada em equilíbrio",
      message: "Colmeias, flores, lavoura, água limpa, mata nativa, biodiversidade e comunidade atuam como um sistema único. A produção ganha força porque o ambiente permanece vivo."
    };
  }

  if (!ecosystemState.bees || !ecosystemState.flowers) {
    return {
      title: "A rede de polinização enfraqueceu",
      message: "Sem abelhas ou flores, a lavoura perde visitas, a biodiversidade diminui e a propriedade fica menos estável. A recuperação começa quando alimento e polinizadores voltam ao cenário."
    };
  }

  if (!ecosystemState.water || !ecosystemState.forest) {
    return {
      title: "Água e abrigo sustentam o restante",
      message: "Quando a água limpa ou a mata nativa saem do sistema, flores, abelhas e solo sentem o impacto. A produção depende dessa base ambiental."
    };
  }

  if (!ecosystemState.community) {
    return {
      title: "Falta coordenação entre campo e pessoas",
      message: "A comunidade conecta manejo, comunicação e cuidado diário. Sem esse vínculo, boas práticas ficam isoladas e os riscos aumentam."
    };
  }

  if (average >= 58) {
    return {
      title: "Ecossistema parcialmente conectado",
      message: "Ainda há relações importantes funcionando, mas alguns elementos ausentes reduzem a circulação de vida, alimento e proteção na propriedade."
    };
  }

  return {
    title: "Propriedade sob pressão ambiental",
    message: "Com poucas conexões ativas, a paisagem perde resiliência. Reintegrar água, mata, flores, abelhas, lavoura e comunidade reconstrói o equilíbrio."
  };
}

function setMeter(name, score) {
  meters[name].value.textContent = `${score}%`;
  meters[name].fill.style.width = `${score}%`;
  meters[name].fill.parentElement.dataset.level = score >= 76 ? "high" : score >= 46 ? "medium" : "low";
}

function updateConnections() {
  const linkState = {
    "bees-flowers": ecosystemState.bees && ecosystemState.flowers,
    "flowers-crops": ecosystemState.flowers && ecosystemState.crops,
    "water-flowers": ecosystemState.water && ecosystemState.flowers,
    "forest-water": ecosystemState.forest && ecosystemState.water,
    "forest-biodiversity": ecosystemState.forest && ecosystemState.biodiversity,
    "community-all": ecosystemState.community && Object.values(ecosystemState).filter(Boolean).length >= 4
  };

  Object.entries(linkState).forEach(([link, isActive]) => {
    const element = document.querySelector(`[data-link="${link}"]`);
    element.classList.toggle("is-active", isActive);
  });
}

function renderEcosystem() {
  const scores = calculateEcosystem();
  const copy = getEcosystemCopy(scores);
  const average = clampScore(Object.values(scores).reduce((sum, value) => sum + value, 0) / 5);

  Object.entries(scores).forEach(([name, score]) => setMeter(name, score));
  ecosystemTitle.textContent = copy.title;
  ecosystemMessage.textContent = copy.message;

  nodeButtons.forEach((button) => {
    const isActive = ecosystemState[button.dataset.node];
    button.classList.toggle("is-active", isActive);
    button.classList.toggle("is-muted", !isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  updateConnections();
  stage.dataset.balance = average >= 76 ? "high" : average >= 46 ? "medium" : "low";
}

function setupEcosystem() {
  nodeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const node = button.dataset.node;
      ecosystemState[node] = !ecosystemState[node];
      renderEcosystem();
    });
  });

  renderEcosystem();
}

// Cria acordeões acessíveis a partir dos dados do manual.
function renderAccordion() {
  accordionRoot.innerHTML = manualItems.map((item, index) => `
    <article class="accordion-item">
      <h3>
        <button class="accordion-trigger" type="button" aria-expanded="false" aria-controls="manual-panel-${index}" id="manual-trigger-${index}">
          ${item[0]}
        </button>
      </h3>
      <div class="accordion-panel" id="manual-panel-${index}" role="region" aria-labelledby="manual-trigger-${index}">
        <p><strong>Explicação:</strong> ${item[1]}</p>
        <p><strong>Por que importa:</strong> ${item[2]}</p>
        <p><strong>Exemplo prático:</strong> ${item[3]}</p>
      </div>
    </article>
  `).join("");

  accordionRoot.querySelectorAll(".accordion-trigger").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const panel = document.querySelector(`#${trigger.getAttribute("aria-controls")}`);
      const expanded = trigger.getAttribute("aria-expanded") === "true";
      trigger.setAttribute("aria-expanded", String(!expanded));
      panel.classList.toggle("is-open", !expanded);
    });
  });
}

function setupMenu() {
  menuButton.addEventListener("click", () => {
    const isOpen = mainMenu.classList.toggle("is-open");
    menuButton.classList.toggle("is-open", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  mainMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainMenu.classList.remove("is-open");
      menuButton.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

// Insere controles de acessibilidade sem JavaScript inline.
function createAccessibilityPanel() {
  const panel = document.createElement("div");
  panel.className = "accessibility-panel";
  panel.setAttribute("aria-label", "Recursos de acessibilidade");
  panel.innerHTML = `
    <button type="button" data-action="contrast">Contraste</button>
    <button type="button" data-action="increase">A+</button>
    <button type="button" data-action="decrease">A-</button>
    <button type="button" data-action="top">Topo</button>
  `;
  body.appendChild(panel);

  panel.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;

    if (button.dataset.action === "contrast") {
      body.classList.toggle("high-contrast");
    }

    if (button.dataset.action === "increase") {
      fontScale = Math.min(1.25, fontScale + 0.08);
      body.style.setProperty("--font-scale", fontScale.toFixed(2));
    }

    if (button.dataset.action === "decrease") {
      fontScale = Math.max(0.9, fontScale - 0.08);
      body.style.setProperty("--font-scale", fontScale.toFixed(2));
    }

    if (button.dataset.action === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });
}

setupMenu();
setupEcosystem();
renderAccordion();
createAccessibilityPanel();
