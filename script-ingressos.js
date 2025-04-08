document.addEventListener("DOMContentLoaded", () => {
    preencherSessoes();
  
    document.getElementById("sessao").addEventListener("change", renderizarAssentos);
    document.getElementById("formIngresso").addEventListener("submit", salvarIngresso);
  });
  
  function preencherSessoes() {
    const sessoes = JSON.parse(localStorage.getItem("sessoes")) || [];
    const filmes = JSON.parse(localStorage.getItem("filmes")) || [];
    const salas = JSON.parse(localStorage.getItem("salas")) || [];
    const select = document.getElementById("sessao");

    const urlParams = new URLSearchParams(window.location.search);
    const sessaoParam = urlParams.get("sessao");
    if (sessaoParam) {
    document.getElementById("sessao").value = sessaoParam;
    renderizarAssentos();
    }

  
    sessoes.forEach((sessao, index) => {
      const filme = filmes[sessao.filmeIndex];
      const sala = salas[sessao.salaIndex];
      if (filme && sala) {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = `${filme.titulo} - ${sala.nome} - ${sessao.dataHora.replace("T", " ")}`;
        select.appendChild(option);
      }
    });
  }
  
  function renderizarAssentos() {
    const index = document.getElementById("sessao").value;
    if (!index) return;
  
    const sessoes = JSON.parse(localStorage.getItem("sessoes")) || [];
    const salas = JSON.parse(localStorage.getItem("salas")) || [];
    const ingressos = JSON.parse(localStorage.getItem("ingressos")) || [];
  
    const sessao = sessoes[index];
    const sala = salas[sessao.salaIndex];
    const ocupados = ingressos
      .filter(i => i.sessaoIndex == index)
      .map(i => i.assento);
  
    const container = document.getElementById("assentos");
    container.innerHTML = "";
  
    const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let i = 0; i < sala.capacidade; i++) {
      const letra = letras[Math.floor(i / 20)] || "X";
      const numero = (i % 20) + 1;
      const assento = `${letra}${numero}`;
      const ocupado = ocupados.includes(assento);
  
      const btn = document.createElement("div");
      btn.className = `cadeira ${ocupado ? "ocupada" : ""}`;
      btn.textContent = assento;
  
      if (!ocupado) {
        btn.addEventListener("click", () => {
          document.querySelectorAll(".cadeira.selecionada").forEach(el => el.classList.remove("selecionada"));
          btn.classList.add("selecionada");
          document.getElementById("assentoSelecionado").value = assento;
        });
      }
  
      container.appendChild(btn);
    }
  
    document.getElementById("areaAssentos").classList.remove("d-none");
  }
  
  function salvarIngresso(e) {
    e.preventDefault();
  
    const sessaoIndex = document.getElementById("sessao").value;
    const cliente = document.getElementById("cliente").value.trim();
    const cpf = document.getElementById("cpf").value.trim();
    const assento = document.getElementById("assentoSelecionado").value;
    const pagamento = document.getElementById("pagamento").value;
  
    if (!assento) {
      alert("Selecione um assento disponível.");
      return;
    }
  
    const ingressos = JSON.parse(localStorage.getItem("ingressos")) || [];
    ingressos.push({ sessaoIndex, cliente, cpf, assento, pagamento });
    localStorage.setItem("ingressos", JSON.stringify(ingressos));
  
    alert("Ingresso comprado com sucesso!");
    document.getElementById("formIngresso").reset();
    renderizarAssentos();
  }
  