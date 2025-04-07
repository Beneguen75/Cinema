// script.js

console.log("Sistema de Cinema iniciado!");

// Escutar o envio do formulário de filmes
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-filme");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const filme = {
        titulo: document.getElementById("titulo").value.trim(),
        descricao: document.getElementById("descricao").value.trim(),
        genero: document.getElementById("genero").value,
        classificacao: document.getElementById("classificacao").value,
        duracao: parseInt(document.getElementById("duracao").value),
        estreia: document.getElementById("estreia").value,
      };

      // Recuperar filmes existentes
      const filmes = JSON.parse(localStorage.getItem("filmes")) || [];

      // Adicionar novo filme
      filmes.push(filme);

      // Salvar no localStorage
      localStorage.setItem("filmes", JSON.stringify(filmes));

      // Alerta de sucesso
      alert("Filme salvo com sucesso!");

      // Limpar formulário
      form.reset();
    });
  }
});
