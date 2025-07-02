const usuario = JSON.parse(localStorage.getItem("usuario"));

if (usuario && usuario.id) {
    fetch(`http://localhost:5050/agendamentos/${usuario.id}`)
        .then(res => res.json())
        .then(data => {
            const container = document.getElementById("idcontainer-agendados");
            container.innerHTML = ""; // limpa os cards fixos

            const agendamentos = data.agendamentos;

            if (!agendamentos || agendamentos.length === 0) {
                container.innerHTML = "<p>Você ainda não possui agendamentos.</p>";
                return;
            }

            agendamentos.forEach(agenda => {
                // Converte data para formato dd/mm/yyyy
                const data = new Date(agenda.data_agenda);
                const dataFormatada = data.toLocaleDateString('pt-BR');

                const card = document.createElement("div");
                card.className = "idcard-servico";
                card.innerHTML = `
                    <div class="idservico-info">
                        <h3>Dr. João Silva</h3>
                        <p><strong>Data:</strong> ${dataFormatada}</p>
                        <p><strong>Hora:</strong> 09:00</p>
                        <p><strong>Local:</strong> ${agenda.local}</p>
                        <p><strong>Descrição:</strong> ${agenda.descricao}</p>
                    </div>
                    <button class="idbtn-cancelar"><i class="fas fa-times-circle"></i> Cancelar</button>
                `;
                container.appendChild(card);
            });
        })
        .catch(error => {
            console.error("Erro ao buscar agendamentos:", error);
        });
    }