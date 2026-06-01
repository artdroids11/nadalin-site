const body = document.body;
const menuButton = document.querySelector(".menu-toggle");
const mainMenu = document.querySelector(".main-nav");
const choicesRoot = document.querySelector("#choices");
const nextButton = document.querySelector("#next-step");
const historyList = document.querySelector("#history-list");
const farmPortrait = document.querySelector("#farm-portrait");
const layerSwitches = document.querySelector("#layer-switches");

const missionEls = {
  step: document.querySelector("#mission-step"),
  season: document.querySelector("#mission-season"),
  title: document.querySelector("#mission-title"),
  alert: document.querySelector("#mission-alert"),
  reading: document.querySelector("#mission-reading"),
  resultTitle: document.querySelector("#result-title"),
  resultText: document.querySelector("#result-text")
};

const scoreEls = {
  production: {
    value: document.querySelector("#production-value"),
    fill: document.querySelector("#production-fill")
  },
  preservation: {
    value: document.querySelector("#preservation-value"),
    fill: document.querySelector("#preservation-fill")
  },
  water: {
    value: document.querySelector("#water-value"),
    fill: document.querySelector("#water-fill")
  },
  biodiversity: {
    value: document.querySelector("#biodiversity-value"),
    fill: document.querySelector("#biodiversity-fill")
  },
  sustainability: {
    value: document.querySelector("#sustainability-value"),
    fill: document.querySelector("#sustainability-fill")
  }
};

const missions = [
  {
    season: "Início das chuvas",
    title: "O solo acordou antes da lavoura",
    alert: "A imagem mostra boa umidade no centro da propriedade, mas a área próxima ao rio está com vegetação baixa e solo exposto.",
    reading: "Vegetação: irregular | Água: estável | Risco: erosão na margem",
    mood: "risk",
    choices: [
      {
        label: "Plantar agora em toda a área",
        detail: "Aproveitar a chuva e avançar rápido com a semeadura.",
        consequence: "A produção ganha impulso, mas a margem frágil do rio fica mais exposta.",
        impact: { production: 14, preservation: -8, water: -6, biodiversity: -7, sustainability: -4 }
      },
      {
        label: "Proteger a margem antes de plantar perto do rio",
        detail: "Começar pela área segura e recuperar a faixa sensível.",
        consequence: "A safra começa com mais cuidado. A área protegida reduz erosão e segura água para os próximos meses.",
        impact: { production: 6, preservation: 13, water: 10, biodiversity: 9, sustainability: 12 }
      },
      {
        label: "Esperar sem agir",
        detail: "Aguardar nova imagem antes de mexer no solo.",
        consequence: "A espera evita erro imediato, mas a janela de plantio fica mais apertada.",
        impact: { production: -6, preservation: 3, water: 2, biodiversity: 1, sustainability: -1 }
      }
    ]
  },
  {
    season: "Verão seco",
    title: "O aplicativo alerta calor no talhão central",
    alert: "A camada de temperatura indica solo aquecido e vegetação perdendo vigor. O reservatório ainda tem água, mas não suporta desperdício.",
    reading: "Vegetação: queda leve | Água: limitada | Temperatura: alta",
    mood: "dry",
    choices: [
      {
        label: "Irrigar tudo durante o dia",
        detail: "Resolver rapidamente a aparência seca da lavoura.",
        consequence: "Parte da lavoura reage, mas muita água evapora e o reservatório cai.",
        impact: { production: 8, preservation: -3, water: -15, biodiversity: -3, sustainability: -8 }
      },
      {
        label: "Irrigar por setores no fim da tarde",
        detail: "Usar o mapa para priorizar só as manchas críticas.",
        consequence: "A água dura mais e o cultivo recebe ajuda onde realmente precisava.",
        impact: { production: 12, preservation: 5, water: 10, biodiversity: 4, sustainability: 13 }
      },
      {
        label: "Não irrigar para economizar água",
        detail: "Guardar o reservatório para mais tarde.",
        consequence: "A água é preservada, mas o estresse da lavoura aumenta e reduz o potencial da safra.",
        impact: { production: -12, preservation: 2, water: 12, biodiversity: 1, sustainability: -3 }
      }
    ]
  },
  {
    season: "Meio da safra",
    title: "Uma mancha aparece perto da mata",
    alert: "A imagem de vegetação mostra falha no limite entre lavoura e mata. Pode ser praga, falta de nutriente ou compactação do solo.",
    reading: "Vegetação: mancha baixa | Biodiversidade: alta no entorno | Uso da terra: estável",
    mood: "protected",
    choices: [
      {
        label: "Aplicar produto em toda a propriedade",
        detail: "Tratar a mancha como problema geral.",
        consequence: "A ação é rápida, mas atinge áreas sem necessidade e pressiona a biodiversidade.",
        impact: { production: 7, preservation: -10, water: -5, biodiversity: -14, sustainability: -10 }
      },
      {
        label: "Vistoriar o ponto indicado pelo satélite",
        detail: "Ir ao local e agir apenas onde o problema foi confirmado.",
        consequence: "A decisão fica mais precisa. O problema é tratado sem transformar a propriedade inteira em alvo.",
        impact: { production: 10, preservation: 8, water: 5, biodiversity: 10, sustainability: 12 }
      },
      {
        label: "Ignorar a mancha",
        detail: "Continuar a rotina e observar se piora.",
        consequence: "A mancha cresce um pouco antes da próxima leitura, e a produção perde estabilidade.",
        impact: { production: -9, preservation: 0, water: 0, biodiversity: -2, sustainability: -5 }
      }
    ]
  },
  {
    season: "Pré-colheita",
    title: "A última imagem mostra dois futuros possíveis",
    alert: "A lavoura está quase pronta. O aplicativo também mostra nascente protegida, mata conectada e áreas com solo que podem cansar no próximo ciclo.",
    reading: "Produção: próxima da colheita | Água: decisiva | Preservação: depende do fechamento",
    mood: "risk",
    choices: [
      {
        label: "Colher e preparar expansão imediata",
        detail: "Usar o bom resultado para abrir mais área no próximo ciclo.",
        consequence: "A produção cresce no curto prazo, mas a propriedade perde proteção para enfrentar o próximo ano.",
        impact: { production: 15, preservation: -16, water: -8, biodiversity: -12, sustainability: -12 }
      },
      {
        label: "Colher e planejar rotação com áreas protegidas",
        detail: "Usar os mapas para alternar culturas, proteger solo e manter mata e água.",
        consequence: "A safra fecha com equilíbrio. Os dados viram planejamento, não apenas reação.",
        impact: { production: 10, preservation: 12, water: 9, biodiversity: 11, sustainability: 16 }
      },
      {
        label: "Guardar os dados e repetir tudo igual",
        detail: "Manter o mesmo manejo no próximo ciclo.",
        consequence: "A colheita acontece, mas a propriedade perde a chance de aprender com o próprio histórico.",
        impact: { production: 1, preservation: -2, water: -2, biodiversity: -1, sustainability: -4 }
      }
    ]
  }
];

let fontScale = 1;
let currentMission = 0;
let hasChosen = false;
const scores = {
  production: 60,
  preservation: 60,
  water: 60,
  biodiversity: 60,
  sustainability: 60
};

function clamp(value) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function setupMenu() {
  menuButton.addEventListener("click", () => {
    const isOpen = mainMenu.classList.toggle("is-open");
    menuButton.classList.toggle("is-open", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
  });

  mainMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainMenu.classList.remove("is-open");
      menuButton.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Abrir menu");
    });
  });
}

function renderScores() {
  Object.entries(scores).forEach(([key, value]) => {
    const safeValue = clamp(value);
    scores[key] = safeValue;
    scoreEls[key].value.textContent = safeValue;
    scoreEls[key].fill.style.width = `${safeValue}%`;
  });
}

function renderMission() {
  const mission = missions[currentMission];
  hasChosen = false;
  nextButton.disabled = true;

  missionEls.step.textContent = `Passagem ${currentMission + 1} de ${missions.length}`;
  missionEls.season.textContent = mission.season;
  missionEls.title.textContent = mission.title;
  missionEls.alert.textContent = mission.alert;
  missionEls.reading.textContent = mission.reading;
  missionEls.resultTitle.textContent = "Aguardando sua decisão";
  missionEls.resultText.textContent = "Escolha uma ação. O satélite mostra sinais, mas quem assume o rumo da propriedade é você.";
  farmPortrait.dataset.mood = mission.mood;

  choicesRoot.innerHTML = mission.choices.map((choice, index) => `
    <button class="choice-button" type="button" data-choice="${index}">
      <strong>${choice.label}</strong>
      <span>${choice.detail}</span>
    </button>
  `).join("");
}

function addHistory(choice, mission) {
  if (historyList.children.length === 1 && historyList.children[0].textContent.includes("aguardando")) {
    historyList.innerHTML = "";
  }

  const item = document.createElement("li");
  item.textContent = `${mission.season}: ${choice.label}. ${choice.consequence}`;
  historyList.appendChild(item);
}

function chooseAction(button) {
  if (hasChosen) return;

  const mission = missions[currentMission];
  const choice = mission.choices[Number(button.dataset.choice)];
  hasChosen = true;

  Object.entries(choice.impact).forEach(([key, value]) => {
    scores[key] = clamp(scores[key] + value);
  });

  renderScores();
  addHistory(choice, mission);
  missionEls.resultTitle.textContent = choice.label;
  missionEls.resultText.textContent = choice.consequence;

  choicesRoot.querySelectorAll(".choice-button").forEach((choiceButton) => {
    choiceButton.disabled = true;
  });

  nextButton.disabled = false;
  if (currentMission === missions.length - 1) {
    nextButton.textContent = "Ver fechamento da safra";
  }
}

function getFinalMessage() {
  const average = clamp(Object.values(scores).reduce((sum, value) => sum + value, 0) / 5);
  const lowWater = scores.water < 45;
  const lowNature = scores.preservation < 45 || scores.biodiversity < 45;

  if (average >= 76 && !lowWater && !lowNature) {
    return {
      title: "Missão cumprida: a propriedade aprendeu com o céu",
      text: "Você usou os alertas para produzir sem abandonar água, mata e biodiversidade. A tecnologia virou cuidado, planejamento e futuro."
    };
  }

  if (scores.production >= 76 && (lowWater || lowNature)) {
    return {
      title: "A safra produziu, mas deixou um aviso",
      text: "Os dados ajudaram no resultado produtivo, porém água, preservação ou biodiversidade ficaram pressionadas. A próxima missão pede equilíbrio."
    };
  }

  if (scores.sustainability >= 65) {
    return {
      title: "Missão em construção",
      text: "Suas escolhas criaram uma base sustentável, mas ainda há pontos para melhorar. O valor do aplicativo está em transformar cada ciclo em aprendizado."
    };
  }

  return {
    title: "O satélite avisou, mas as decisões chegaram tarde",
    text: "A propriedade sentiu os impactos de escolhas pouco conectadas ao sistema inteiro. A mensagem central permanece: dado bom precisa virar ação responsável."
  };
}

function advanceMission() {
  if (currentMission < missions.length - 1) {
    currentMission += 1;
    renderMission();
    return;
  }

  const finalMessage = getFinalMessage();
  missionEls.step.textContent = "Fechamento da missão";
  missionEls.season.textContent = "Fim do ano agrícola";
  missionEls.title.textContent = finalMessage.title;
  missionEls.alert.textContent = finalMessage.text;
  missionEls.reading.textContent = `Resultado final | Produção ${scores.production} | Preservação ${scores.preservation} | Água ${scores.water} | Biodiversidade ${scores.biodiversity} | Sustentabilidade ${scores.sustainability}`;
  missionEls.resultTitle.textContent = "Conclusão";
  missionEls.resultText.textContent = "Satélites e aplicativos não substituem o produtor. Eles ampliam sua visão para que cada decisão considere a propriedade como um organismo vivo.";
  choicesRoot.innerHTML = `
    <button class="choice-button" type="button" id="restart-mission">
      <strong>Recomeçar missão</strong>
      <span>Testar outras decisões e comparar consequências.</span>
    </button>
  `;
  nextButton.disabled = true;
  document.querySelector("#restart-mission").addEventListener("click", restartMission);
}

function restartMission() {
  currentMission = 0;
  hasChosen = false;
  Object.keys(scores).forEach((key) => {
    scores[key] = 60;
  });
  historyList.innerHTML = "<li>O aplicativo está aguardando sua primeira decisão.</li>";
  nextButton.textContent = "Próxima passagem";
  renderScores();
  renderMission();
}

function setupChoices() {
  choicesRoot.addEventListener("click", (event) => {
    const button = event.target.closest(".choice-button");
    if (!button || button.id === "restart-mission") return;
    chooseAction(button);
  });

  nextButton.addEventListener("click", advanceMission);
}

function setupLayers() {
  function syncLayers() {
    layerSwitches.querySelectorAll("input").forEach((input) => {
      const layer = document.querySelector(`[data-layer="${input.value}"]`);
      layer.classList.toggle("is-on", input.checked);
    });
  }

  layerSwitches.addEventListener("change", syncLayers);
  syncLayers();
}

function setupScrollReveal() {
  const revealTargets = document.querySelectorAll(
    ".hero-copy, .hero-scene, .mission-brief, .mission-board, .impact-area, .image-lab, .learning, .site-footer"
  );

  revealTargets.forEach((element) => element.classList.add("reveal"));

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("reveal-active");
        obs.unobserve(entry.target);
      });
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -120px 0px"
    }
  );

  revealTargets.forEach((target) => observer.observe(target));
}

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
setupChoices();
setupLayers();
setupScrollReveal();
createAccessibilityPanel();
renderScores();
renderMission();
