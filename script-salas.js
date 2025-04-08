const form = document.getElementById("formSala");
const lista = document.getElementById("listaSalas");
const modalSala = new bootstrap.Modal(document.getElementById("modalSala"));

function abrirModal(index = null) {
  if (index !== null) {
    const salas = JSON.parse(localStorage.getItem("salas")) || [];
    const sala = salas[index];
    document.getElementById("indiceSala").value = index;
    document.getElementById("nome").value = sala.nome;
    document.getElementById("capacidade").value = sala.capacidade;
    document.getElementById("tipo").value = sala.tipo;
  } else {
    form.reset();
    document.getElementById("indiceSala").value = "";
  }
}

function salvarSala(e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const capacidade = parseInt(document.getElementById("capacidade").value);
  const tipo = document.getElementById("tipo").value;
  const indice = document.getElementById("indiceSala").value;

  const novaSala = { nome, capacidade, tipo };
  let salas = JSON.parse(localStorage.getItem("salas")) || [];

  if (indice === "") {
    salas.push(novaSala);
  } else {
    salas[indice] = novaSala;
  }

  localStorage.setItem("salas", JSON.stringify(salas));
  form.reset();
  modalSala.hide();
  carregarSalas();
}

function carregarSalas() {
  const salas = JSON.parse(localStorage.getItem("salas")) || [];
  lista.innerHTML = "";

  salas.forEach((sala, index) => {
    const col = document.createElement("div");
    col.className = "col-md-6 sala-card";

    const card = document.createElement("div");
    card.className = "card shadow";

    const cadeirasHTML = gerarCadeirasSVG(sala.capacidade);

    card.innerHTML = `
      <div class="card-body">
        <h5 class="card-title">${sala.nome}</h5>
        <p><strong>Capacidade:</strong> ${sala.capacidade}</p>
        <p><strong>Tipo:</strong> ${sala.tipo}</p>
        <div class="cadeiras">${cadeirasHTML}</div>
        <div class="text-end mt-3">
          <button class="btn btn-sm btn-outline-primary me-2" onclick="abrirModal(${index})" data-bs-toggle="modal" data-bs-target="#modalSala">Editar</button>
          <button class="btn btn-sm btn-outline-danger" onclick="excluirSala(${index})">Excluir</button>
        </div>
      </div>
    `;

    col.appendChild(card);
    lista.appendChild(col);
  });
}

function gerarCadeirasSVG(qtd) {
  const cadeiras = [];
  const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  for (let i = 0; i < qtd; i++) {
    const fileiraIndex = Math.floor(i / 20);
    const letra = letras[fileiraIndex] || `X${fileiraIndex}`;
    const numero = (i % 20) + 1;
    const label = `${letra}${numero}`;

    const cadeira = `
      <button class="assento-visual" disabled>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M5 9V4a2 2 0 0 1 2-2h1v7H5Zm4 0V2h6v7H9Zm8 0V2h1a2 2 0 0 1 2 2v5h-3ZM5 11h14a1 1 0 0 1 1 1v3H4v-3a1 1 0 0 1 1-1Zm-1 5h2v4H5a1 1 0 0 1-1-1v-3Zm14 0h2v3a1 1 0 0 1-1 1h-1v-4Zm-4 0v4h-4v-4h4Z"/>
        </svg>
        <span class="assento-label">${label}</span>
      </button>
    `;
    cadeiras.push(cadeira);
  }

  return cadeiras.join("");
}

function excluirSala(index) {
  if (confirm("Tem certeza que deseja excluir esta sala?")) {
    const salas = JSON.parse(localStorage.getItem("salas")) || [];
    salas.splice(index, 1);
    localStorage.setItem("salas", JSON.stringify(salas));
    carregarSalas();
  }
}

form.addEventListener("submit", salvarSala);
window.onload = carregarSalas;
