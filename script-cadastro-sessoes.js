document.addEventListener("DOMContentLoaded", () => {
  carregarFilmesESalas();
  exibirSessoes();

  document.getElementById("formSessao").addEventListener("submit", function (e) {
    e.preventDefault();

    const sessao = {
      filmeIndex: document.getElementById("filme").value,
      salaIndex: document.getElementById("sala").value,
      dataHora: document.getElementById("dataHora").value,
      preco: document.getElementById("preco").value,
      idioma: document.getElementById("idioma").value,
      formato: document.getElementById("formato").value
    };

    const sessoes = JSON.parse(localStorage.getItem("sessoes")) || [];
    sessoes.push(sessao);
    localStorage.setItem("sessoes", JSON.stringify(sessoes));

    alert("Sessão cadastrada com sucesso!");
    document.getElementById("formSessao").reset();
    bootstrap.Modal.getInstance(document.getElementById("modalSessao")).hide();

    exibirSessoes();
  });
});

function carregarFilmesESalas() {
  const filmes = JSON.parse(localStorage.getItem("filmes")) || [];
  const salas = JSON.parse(localStorage.getItem("salas")) || [];

  const selectFilme = document.getElementById("filme");
  const selectSala = document.getElementById("sala");

  filmes.forEach((filme, i) => {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = filme.titulo;
    selectFilme.appendChild(option);
  });

  salas.forEach((sala, i) => {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = sala.nome;
    selectSala.appendChild(option);
  });
}

function exibirSessoes() {
  const sessoes = JSON.parse(localStorage.getItem("sessoes")) || [];
  const filmes = JSON.parse(localStorage.getItem("filmes")) || [];
  const salas = JSON.parse(localStorage.getItem("salas")) || [];
  const ingressos = JSON.parse(localStorage.getItem("ingressos")) || [];

  const container = document.getElementById("lista-sessoes");
  if (!container) return;

  container.innerHTML = "";

  sessoes.forEach((sessao, index) => {
    const filme = filmes[sessao.filmeIndex];
    const sala = salas[sessao.salaIndex];
    const ocupados = ingressos
      .filter(i => i.sessaoIndex == index.toString())
      .map(i => i.assento);

    const idCadeiras = `cadeiras-${index}`;
    const cadeirasHTML = gerarCadeirasComOcupados(sala.capacidade, ocupados);

    const card = document.createElement("div");
    card.className = "col-md-6 col-lg-4 mb-4";
    card.innerHTML = `
      <div class="card shadow-sm h-100">
        <div class="card-body">
          <h5 class="card-title">${filme?.titulo || "Filme"}</h5>
          <p><strong>Sala:</strong> ${sala?.nome || "Sala"}</p>
          <p><strong>Data e Hora:</strong> ${sessao.dataHora.replace("T", " ")}</p>
          <p><strong>Idioma:</strong> ${sessao.idioma}</p>
          <p><strong>Formato:</strong> ${sessao.formato}</p>
          <p><strong>Preço:</strong> R$ ${parseFloat(sessao.preco).toFixed(2)}</p>

          <button class="btn btn-sm btn-outline-secondary mb-2" onclick="toggleCadeiras('${idCadeiras}', this)">
            Mostrar Cadeiras
          </button>
          
          <div class="d-flex flex-wrap cadeiras mt-3 d-none" id="${idCadeiras}">
            ${cadeirasHTML}
          </div>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

function gerarCadeirasComOcupados(qtd, ocupados = []) {
  const cadeiras = [];
  const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  for (let i = 0; i < qtd; i++) {
    const letra = letras[Math.floor(i / 20)] || "X";
    const numero = (i % 20) + 1;
    const assento = `${letra}${numero}`;
    cadeiras.push(`
      <div class="cadeira ${ocupados.includes(assento) ? 'ocupada' : ''}" title="${assento}">
        ${assento}
      </div>
    `);
  }

  return cadeiras.join("");
}

function toggleCadeiras(id, btn) {
  const container = document.getElementById(id);
  container.classList.toggle("d-none");
  btn.textContent = container.classList.contains("d-none") ? "Mostrar Cadeiras" : "Ocultar Cadeiras";
}
