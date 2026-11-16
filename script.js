// MENU RESPONSIVO
const botaoMenu = document.getElementById("botaoMenu");
const menu = document.querySelector(".menu");

if (botaoMenu && menu) {
  botaoMenu.addEventListener("click", () => {
    menu.classList.toggle("menu-aberto");
    botaoMenu.textContent = menu.classList.contains("menu-aberto") ? "✕" : "☰";
  });

  const linksMenu = menu.querySelectorAll("a");

  linksMenu.forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("menu-aberto");
      botaoMenu.textContent = "☰";
    });
  });
}

// SAUDACAO (executada somente se o elemento existir na página)
const saudacao = document.getElementById("saudacao");

if (saudacao) {
  const hora = new Date().getHours();

  if (hora < 12) {
    saudacao.textContent = "Bom dia, viajante.";
  } else if (hora < 18) {
    saudacao.textContent = "Boa tarde, guerreiro.";
  } else {
    saudacao.textContent = "Boa noite, caçador das sombras.";
  }
}

// MODO DA GUILDA (executado somente se houver botão na página)
const botaoModo = document.getElementById("botaoModo");
const modoSalvo = localStorage.getItem("modoGuilda");

if (modoSalvo === "ativo") {
  document.body.classList.add("modo-guilda");
}

if (botaoModo) {
  botaoModo.textContent = document.body.classList.contains("modo-guilda")
    ? "Desativar modo da Guilda"
    : "Ativar modo da Guilda";

  botaoModo.addEventListener("click", () => {
    document.body.classList.toggle("modo-guilda");

    if (document.body.classList.contains("modo-guilda")) {
      localStorage.setItem("modoGuilda", "ativo");
      botaoModo.textContent = "Desativar modo da Guilda";
    } else {
      localStorage.setItem("modoGuilda", "inativo");
      botaoModo.textContent = "Ativar modo da Guilda";
    }
  });
}

// HISTORIA DO HEROI
const botaoHistoria = document.getElementById("botaoHistoria");
const historiaCompleta = document.getElementById("historiaCompleta");

if (botaoHistoria && historiaCompleta) {
  botaoHistoria.addEventListener("click", () => {
    historiaCompleta.classList.toggle("revelado");

    botaoHistoria.textContent = historiaCompleta.classList.contains("revelado")
      ? "Ver menos"
      : "Ver história completa";
  });
}

// INVENTARIO E LISTA DE EQUIPAMENTOS
const inventario = [
  {
    nome: "Arco Negro",
    tipo: "arma",
    raridade: "lendario",
    descricao: "Arma principal para disparos precisos à distância."
  },
  {
    nome: "Medalhão Antigo",
    tipo: "acessorio",
    raridade: "unico",
    descricao: "Reluz quando se aproxima das energias do Véu."
  },
  {
    nome: "Adaga de Prata",
    tipo: "arma",
    raridade: "raro",
    descricao: "Lâmina usada contra criaturas sombrias."
  },
  {
    nome: "Grimório",
    tipo: "acessorio",
    raridade: "raro",
    descricao: "Registra hábitos e fraquezas dos monstros."
  },
  {
    nome: "Espada Curta",
    tipo: "arma",
    raridade: "comum",
    descricao: "Uma arma reserva para combates próximos."
  },
  {
    nome: "Capa de Camuflagem",
    tipo: "equipamento",
    raridade: "comum",
    descricao: "Ajuda a esconder a silhueta nas sombras."
  }
];

const listaInventario = document.getElementById("listaInventario");
const contadorItens = document.getElementById("contadorItens");
const filtros = document.querySelectorAll(".filtro");

function mostrarInventario(tipoEscolhido) {
  if (!listaInventario) {
    return;
  }

  listaInventario.innerHTML = "";

  const itensVisiveis = inventario.filter((item) => {
    return tipoEscolhido === "todos" || item.tipo === tipoEscolhido;
  });

  itensVisiveis.forEach((item) => {
    const card = document.createElement("article");
    card.classList.add("card", "item-" + item.raridade);

    const raridade = document.createElement("span");
    raridade.classList.add("raridade");
    raridade.textContent = item.raridade;

    const titulo = document.createElement("h4");
    titulo.textContent = item.nome;

    const descricao = document.createElement("p");
    descricao.textContent = item.descricao;

    card.appendChild(raridade);
    card.appendChild(titulo);
    card.appendChild(descricao);

    listaInventario.appendChild(card);
  });

  if (contadorItens) {
    contadorItens.textContent =
      itensVisiveis.length + " itens exibidos de " + inventario.length + " conquistados";
  }
}

if (listaInventario) {
  mostrarInventario("todos");

  filtros.forEach((botao) => {
    botao.addEventListener("click", () => {
      const tipo = botao.dataset.tipo;
      mostrarInventario(tipo);

      filtros.forEach((filtro) => {
        filtro.classList.remove("filtro-ativo");
      });

      botao.classList.add("filtro-ativo");
    });
  });
}

// EXPERIENCIA DO HEROI (XP)
const valorXP = document.getElementById("valorXP");
const barraXP = document.getElementById("barraXP");
const botaoXP = document.getElementById("botaoXP");
const mensagemXP = document.getElementById("mensagemXP");

let xp = Number(localStorage.getItem("xpAldren")) || 0;

function atualizarXP() {
  if (valorXP && barraXP) {
    valorXP.textContent = xp;
    barraXP.style.width = xp + "%";
  }

  if (mensagemXP) {
    if (xp >= 100) {
      mensagemXP.textContent = "Nível up! Aldren completou sua missão.";
    } else {
      mensagemXP.textContent = "Continue suas missões para evoluir.";
    }
  }
}

atualizarXP();

if (botaoXP) {
  botaoXP.addEventListener("click", () => {
    if (xp < 100) {
      xp = xp + 20;

      if (xp > 100) {
        xp = 100;
      }

      localStorage.setItem("xpAldren", xp);
      atualizarXP();
    }
  });
}

// FORMULARIO DA GUILDA
const formGuilda = document.getElementById("formGuilda");
const mensagemFormulario = document.getElementById("mensagemFormulario");

if (formGuilda) {
  formGuilda.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();

    if (!mensagemFormulario) {
      return;
    }

    if (nome === "" || email === "" || mensagem === "") {
      mensagemFormulario.textContent = "Preencha todos os campos antes de enviar.";
      mensagemFormulario.style.color = "var(--cor-vermelho)";
      return;
    }

    const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formatoEmail.test(email)) {
      mensagemFormulario.textContent = "Digite um endereço de e-mail válido.";
      mensagemFormulario.style.color = "var(--cor-vermelho)";
      return;
    }

    mensagemFormulario.textContent =
      "Juramento recebido, " + nome + "! A Guilda agradece seu contato.";
    mensagemFormulario.style.color = "var(--cor-azul)";

    formGuilda.reset();
  });
}
