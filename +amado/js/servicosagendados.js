const usuario = JSON.parse(localStorage.getItem("usuario"));

if (usuario && usuario.id) {
    fetch(`http://localhost:5050/agendamentos/${usuario.id}`)
        .then(res => {
            if (!res.ok) {
                throw new Error(`Erro HTTP: ${res.status}`);
            }
            return res.json();
        })
        .then(data => {
            const container = document.getElementById("idcontainer-agendados");
            container.innerHTML = ""; // Limpa o container
            
            // Verifica se existem agendamentos
            if (!data.agendamentos || data.agendamentos.length === 0) {
                container.innerHTML = `<div class="idno-appointments">
                    <i class="fas fa-calendar-times"></i>
                    <p>Você ainda não possui agendamentos.</p>
                </div>`;
                return;
            }
            
            // Ordena os agendamentos por data (mais recente primeiro)
            const agendamentosOrdenados = data.agendamentos.sort((a, b) => 
                new Date(b.data_agenda) - new Date(a.data_agenda)
            );
            
            // Cria e adiciona os cards de agendamento
            agendamentosOrdenados.forEach(agenda => {
                const data = new Date(agenda.data_agenda);
                const dataFormatada = data.toLocaleDateString('pt-BR');

                
                const card = document.createElement("div");
                card.className = "idcard-servico";
                card.innerHTML = `
                    <div class="idservico-info">
                        <h3>${agenda.nome || 'Serviço'}</h3>
                        <div class="idinfo-row">
                            <span><i class="fas fa-calendar-alt"></i> ${dataFormatada}</span>
                        </div>
                        <div class="idinfo-row">
                            <span><i class="fas fa-map-marker-alt"></i> ${agenda.local || 'Local não especificado'}</span>
                        </div>
                        ${agenda.descricao ? `<p class="iddescricao"><i class="fas fa-info-circle"></i> ${agenda.descricao}</p>` : ''}
                        <div class="idinfo-row">
                        </div>
                    </div>
                `;
                container.appendChild(card);
            });
        })
        .catch(error => {
            console.error("Erro ao carregar agendamentos:", error);
            document.getElementById("idcontainer-agendados").innerHTML = `
                <div class="iderro">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p>Erro ao carregar agendamentos. Tente novamente mais tarde.</p>
                    <p class="iderror-detail">${error.message}</p>
                </div>
            `;
        });
}
