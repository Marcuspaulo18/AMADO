document.addEventListener("DOMContentLoaded", () => {
  const tipoSelecionado = localStorage.getItem("tipo_atendimento_selecionado");

  if (!tipoSelecionado) {
    document.getElementById("idlista-profissionais").innerHTML = "<p>Tipo de serviço não selecionado.</p>";
    return;
  }

  fetch(`http://localhost:5050/profissionais/${tipoSelecionado}`)
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("idlista-profissionais");
      container.innerHTML = "";

      if (!data || data.length === 0) {
        container.innerHTML = "<p>Nenhum profissional disponível.</p>";
        return;
      }

      data.forEach(prof => {
        const card = document.createElement("div");
        card.className = "idprofissional-card";

        card.innerHTML = `
          <img src="https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 80)}.jpg" />
          <div class="idprofissional-info">
            <h3>${prof.nome || "Profissional"}</h3>
            <p><strong>Área:</strong> ${prof.area_atua || "Não informado"}</p>
            <p><strong>Bio:</strong> ${prof.bio || "Sem descrição"}</p>
            <p><strong>Atendimento:</strong> 
              ${prof.atende_online ? "Online" : ""} ${prof.atende_presencial ? "Presencial" : ""}
            </p>
          </div>
        `;
        container.appendChild(card);
      });
    })
    .catch(error => {
      console.error("Erro ao buscar profissionais:", error);
      document.getElementById("idlista-profissionais").innerHTML = "<p>Erro ao carregar profissionais.</p>";
    });
});
