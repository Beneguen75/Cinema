document.addEventListener("DOMContentLoaded", listarSessoes);

function listarSessoes() {
  const sessoes = JSON.parse(localStorage.getItem("sessoes")) || [];
  const filmes = JSON.parse(localStorage.getItem("filmes")) || [];
  const salas = JSON.parse(localStorage.getItem("salas")) || [];
  const ingressos = JSON.parse(localStorage.getItem("ingressos")) || [];
  const container = document.getElementById("lista-sessoes");

  container.innerHTML = "";

  sessoes.forEach((sessao, index) => {
    const filme = filmes[sessao.filmeIndex] || {};
    const sala = salas[sessao.salaIndex] || {};
    const ocupados = ingressos
      .filter(i => i.sessaoIndex == index.toString())
      .map(i => i.assento);

    const cadeirasId = `cadeiras-${index}`;
    const cadeirasHTML = gerarCadeiras(sala.capacidade, ocupados);

    const card = document.createElement("div");
    card.className = "col-md-4 mb-4";

    card.innerHTML = `
      <div class="card h-100 shadow-sm">
        <div class="card-body">
          <h5 class="card-title">${filme.titulo}</h5>
          <p><strong>Sala:</strong> ${sala.nome}</p>
          <p><strong>Data e Hora:</strong> ${sessao.dataHora.replace("T", " ")}</p>
          <p><strong>Preço:</strong> R$ ${parseFloat(sessao.preco).toFixed(2)}</p>

          <button class="btn btn-sm btn-outline-secondary mb-2" onclick="toggleCadeiras('${cadeirasId}', this)">
            Mostrar Cadeiras
          </button>

          <div class="cadeiras d-none" id="${cadeirasId}">
            ${cadeirasHTML}
          </div>

          <div class="text-end mt-3">
            <a href="venda-ingressos.html?sessao=${index}" class="btn btn-primary btn-sm">
              Comprar Ingresso
            </a>
          </div>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

function gerarCadeiras(qtd, ocupados) {
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
