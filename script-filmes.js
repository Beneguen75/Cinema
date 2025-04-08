document.addEventListener("DOMContentLoaded", () => {
    exibirFilmes();
  });
  
  function validarFilme(filme) {
    const mensagens = [];
  
    if (!filme.titulo || !filme.descricao || !filme.genero || !filme.classificacao || !filme.duracao || !filme.dataEstreia) {
      mensagens.push("Todos os campos são obrigatórios.");
    }
  
    if (filme.duracao < 40) {
      mensagens.push("A duração mínima deve ser de 40 minutos.");
    }
  
    const hoje = new Date().toISOString().split("T")[0];
    if (filme.dataEstreia < hoje) {
      mensagens.push("A data de estreia não pode ser anterior ao dia atual.");
    }
  
    return mensagens;
  }
  
  function exibirMensagens(mensagens) {
    const divMensagens = document.getElementById("mensagens");
    divMensagens.innerHTML = "";
  
    mensagens.forEach(msg => {
      const alert = document.createElement("div");
      alert.className = "alert alert-danger";
      alert.textContent = msg;
      divMensagens.appendChild(alert);
    });
  }
  
  function salvarFilme(filme, index = null) {
    const filmes = JSON.parse(localStorage.getItem("filmes")) || [];
  
    if (index !== null) {
      filmes[index] = filme;
    } else {
      filmes.push(filme);
    }
  
    localStorage.setItem("filmes", JSON.stringify(filmes));
    exibirFilmes();
  
    document.getElementById("mensagens").innerHTML = `
      <div class="alert alert-success">Filme salvo com sucesso!</div>
    `;
    document.getElementById("form-filme").reset();
  }
  
  function exibirFilmes() {
    const filmes = JSON.parse(localStorage.getItem("filmes")) || [];
    const lista = document.getElementById("lista-filmes");
  
    if (!lista) return;
  
    lista.innerHTML = "";
  
    filmes.forEach((filme, index) => {
      const card = document.createElement("div");
      card.className = "col-md-4 mb-4";
  
      card.innerHTML = `
        <div class="card h-100 shadow-sm">
          <div class="card-body">
            <h5 class="card-title text-capitalize">${filme.titulo}</h5>
            <p><strong>Descrição:</strong> ${filme.descricao}</p>
            <p><strong>Gênero:</strong> ${filme.genero}</p>
            <p><strong>Classificação:</strong> ${filme.classificacao}</p>
            <p><strong>Duração:</strong> ${filme.duracao} min</p>
            <p><strong>Estreia:</strong> ${filme.dataEstreia}</p>
            <div class="d-flex justify-content-between">
              <button class="btn btn-sm btn-outline-primary" onclick="editarFilme(${index})" data-bs-toggle="modal" data-bs-target="#modalCadastro">Editar</button>
              <button class="btn btn-sm btn-outline-danger" onclick="confirmarExclusao(${index})" data-bs-toggle="modal" data-bs-target="#modalConfirmacaoExclusao">Excluir</button>
            </div>
          </div>
        </div>
      `;
      lista.appendChild(card);
    });
  }
  
  function confirmarExclusao(index) {
    const btn = document.getElementById("btnConfirmarExclusao");
    btn.onclick = () => {
      const filmes = JSON.parse(localStorage.getItem("filmes")) || [];
      filmes.splice(index, 1);
      localStorage.setItem("filmes", JSON.stringify(filmes));
      exibirFilmes();
      const modal = bootstrap.Modal.getInstance(document.getElementById("modalConfirmacaoExclusao"));
      modal.hide();
    };
  }
  
  function editarFilme(index) {
    const filmes = JSON.parse(localStorage.getItem("filmes")) || [];
    const filme = filmes[index];
  
    document.getElementById("titulo").value = filme.titulo;
    document.getElementById("descricao").value = filme.descricao;
    document.getElementById("genero").value = filme.genero;
    document.getElementById("classificacao").value = filme.classificacao;
    document.getElementById("duracao").value = filme.duracao;
    document.getElementById("data-estreia").value = filme.dataEstreia;
  
    const form = document.getElementById("form-filme");
    form.onsubmit = function (event) {
      event.preventDefault();
  
      const filmeEditado = {
        titulo: document.getElementById("titulo").value.trim(),
        descricao: document.getElementById("descricao").value.trim(),
        genero: document.getElementById("genero").value,
        classificacao: document.getElementById("classificacao").value,
        duracao: parseInt(document.getElementById("duracao").value),
        dataEstreia: document.getElementById("data-estreia").value
      };
  
      const erros = validarFilme(filmeEditado);
      if (erros.length > 0) {
        exibirMensagens(erros);
        return;
      }
  
      salvarFilme(filmeEditado, index);
      bootstrap.Modal.getInstance(document.getElementById("modalCadastro")).hide();
    };
  }
  
  document.getElementById("form-filme").addEventListener("submit", function (event) {
    event.preventDefault();
  
    const filme = {
      titulo: document.getElementById("titulo").value.trim(),
      descricao: document.getElementById("descricao").value.trim(),
      genero: document.getElementById("genero").value,
      classificacao: document.getElementById("classificacao").value,
      duracao: parseInt(document.getElementById("duracao").value),
      dataEstreia: document.getElementById("data-estreia").value
    };
  
    const erros = validarFilme(filme);
    if (erros.length > 0) {
      exibirMensagens(erros);
      return;
    }
  
    salvarFilme(filme);
  });
  