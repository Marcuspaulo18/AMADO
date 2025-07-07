document.addEventListener("DOMContentLoaded", () => {
 fetch(`http://localhost:5050/selavaliacoes`)
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("idlista-avaliacoes");
      container.innerHTML = "";

      if (!data || data.length === 0) {
        container.innerHTML = "<p>Nenhuma avaliação no momento.</p>";
        return;
      }

      data.avaliacoes.forEach(ava => {
        const card = document.createElement("div");
        card.className = "idavaliacoes-card";

        card.innerHTML = `
          <img src="https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 80)}.jpg" />
          <div class="avaliacoes-info">
            <h3>${ava.nome}</h3>
            <p><strong>nota:</strong> ${ava.nota}</p>
            <p><strong>comentario:</strong> ${ava.comentario }</p>
          </div>
        `;
        container.appendChild(card);
      });
    })
    .catch(error => {
      console.error("Erro ao buscar profissionais:", error);
      document.getElementById("idlista-avaliacoes").innerHTML = "<p>Erro ao carregar avaliações.</p>";
    });
    });
