// ✅ Função para validar o filme
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
  
  document.getElementById("form-filme").addEventListener("submit", function(event) {
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
  
    const filmes = JSON.parse(localStorage.getItem("filmes")) || [];
    filmes.push(filme);
    localStorage.setItem("filmes", JSON.stringify(filmes));
  
    document.getElementById("mensagens").innerHTML = `
      <div class="alert alert-success">Filme salvo com sucesso!</div>
    `;
    document.getElementById("form-filme").reset();
  });
  