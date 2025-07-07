const usuarioSalvo = JSON.parse(localStorage.getItem("usuario"))

const nomeIdade = document.querySelector("#nomeIdade")

localStorage.setItem("ideusuario",usuarioSalvo.id)

const primeiroNome = usuarioSalvo.nome.split(' ')[0];

const primeiroNomeFormatado =
    primeiroNome.charAt(0).toUpperCase() + primeiroNome.slice(1).toLowerCase();

nomeIdade.textContent = `${primeiroNomeFormatado}, ${usuarioSalvo.idade}`
 
 function formatarData(dataString) {
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR'); 
}
 
 const subcategorias = {
      "Saude": ["Clínico Geral", "Dentista", "Enfermagem", "Psicologia", "Fisioterapia"],
      "Juridico": ["Advocacia Civil", "Advocacia Criminal", "Direito Trabalhista", "Mediação"],
      "Comunicacao": ["Marketing", "Design Gráfico", "Jornalismo", "Publicidade", "Redes Sociais"],
      "Educacao": ["Reforço Escolar", "Idiomas", "Aulas Particulares", "Alfabetização"],
      "Contabilidade": ["Imposto de Renda", "Abertura de Empresa", "Gestão Fiscal", "Folha de Pagamento"],
      "Relacoes": ["Tradução", "Consultoria Internacional", "Mediação Cultural", "Relações Diplomáticas"]
    };

    function atualizarSubcategorias() {
    const categoriaSelect = document.getElementById("idselectcategoria");
    const subcategoriaSelect = document.getElementById("idselectsubcategoria");
    const profissionalSelect = document.getElementById("idselectprofissional");
    const categoriaEscolhida = categoriaSelect.value;

    // Limpa subcategoria e profissionais
    subcategoriaSelect.innerHTML = '<option value="">Selecione uma subcategoria...</option>';
    profissionalSelect.innerHTML = '<option value="">Selecione um profissional...</option>';
    
    if (subcategorias[categoriaEscolhida]) {
        subcategorias[categoriaEscolhida].forEach(sub => {
            const option = document.createElement("option");
            option.value = sub;
            option.text = sub;
            subcategoriaSelect.appendChild(option);
        });

        if (subcategoriaSelect.value) {
            selprofissionais();
        }
    }
    }

  function selprofissionais() {
    const tipoSelecionado = document.getElementById("idselectcategoria").value;
    const subtipoSelecionado = document.getElementById("idselectsubcategoria").value;
    

    if (!tipoSelecionado || !subtipoSelecionado) {
        const container = document.getElementById("idselectprofissional");
        container.innerHTML = "<option value=''>Selecione um profissional...</option>";
        return;
    }
    
    fetch(`http://localhost:5050/profissionalselecionado/${tipoSelecionado}/${subtipoSelecionado}`)
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById("idselectprofissional");
        container.innerHTML = "<option value=''>Selecione um profissional...</option>";

        if (!data || data.length === 0) {
            container.innerHTML += "<option value=''>Nenhum profissional disponível</option>";
            return;
        }

        data.forEach(prof => {
            const option = document.createElement("option");
            option.value = prof.ideprofissional;
            option.textContent = `${prof.nome || "Profissional"} - ${prof.atende_online ? "Online" : ""} ${prof.atende_presencial ? "Presencial" : ""}`;
            container.appendChild(option);
            const ideprofissional = prof.ideprofissional
            return ideprofissional
        });

        data.forEach(dados=>{
            const ideprofissional =dados.ideprofissional
            const ideservico = dados.ideservico
            localStorage.setItem("ideprofissional",ideprofissional)
            localStorage.setItem("ideservico",ideservico)
        })
    })
    .catch(error => {
        console.error("Erro ao buscar profissionais:", error);
        document.getElementById("idselectprofissional").innerHTML = "<option value=''>Erro ao carregar profissionais</option>";
    }); 
}

function carregarDatasDisponiveis(ideprofissional) {
    fetch(`http://localhost:5050/disponibilidade/${ideprofissional}`)
        .then(res => res.json())
        .then(data => {
            const containerdata = document.getElementById("idselectdata");
            containerdata.innerHTML = "<option value=''>Selecione uma data...</option>";

            if (!data || data.length === 0) {
                containerdata.innerHTML += "<option value=''>Nenhuma data disponível</option>";
                return;
            }
            data.forEach(item => {
                const option = document.createElement("option");
                option.value = item.data_consulta;
                option.textContent = formatarData(item.data_consulta); 
                localStorage.setItem("data_consulta",formatarData(item.data_consulta))
                containerdata.appendChild(option);
            });

        })
        .catch(error => {
            console.error("Erro ao buscar datas:", error);
            document.getElementById("idselectdata").innerHTML = "<option value=''>Erro ao carregar datas</option>";
        });
}

function carregarHorariosDisponiveis(ideprofissional) {
    fetch(`http://localhost:5050/disponibilidade/${ideprofissional}`)
        .then(res => res.json())
        .then(data => {
            const containerhora = document.getElementById("idselecthora");
            containerhora.innerHTML = "<option value=''>Selecione um horário...</option>";

            if (!data || data.length === 0) {
                containerhora.innerHTML += "<option value=''>Nenhum horário disponível</option>";
                return;
            }

            data.forEach(horario => {
                const option = document.createElement("option");
                option.value = horario.horainicio;
                option.value = horario.horafim;
                option.textContent = `${horario.horainicio}-${horario.horafim}`; 
                containerhora.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Erro ao buscar horários:", error);
            document.getElementById("idselecthora").innerHTML = "<option value=''>Erro ao carregar horários</option>";
        });
}

function seldatahoraconsulta() {
    const ideprofissional = document.getElementById("idselectprofissional").value;
    const containerdata = document.getElementById("idselectdata");
    const containerhora = document.getElementById("idselecthora");

    containerdata.innerHTML = "<option value=''>Selecione uma data...</option>";
    containerhora.innerHTML = "<option value=''>Selecione um horário...</option>";

    if (!ideprofissional) return;

    carregarDatasDisponiveis(ideprofissional);
    containerdata.addEventListener("change", function() {
        const dataSelecionada = this.value;
        if (dataSelecionada) {
            carregarHorariosDisponiveis(ideprofissional, dataSelecionada);
        }
    });
}
function gerarToken() {
    return localStorage.getItem("data_consulta")
    +localStorage.getItem("ideprofissional")
    +localStorage.getItem("ideservico")
    +localStorage.getItem("ideusuario");
}
async function inseriragendamento(){
    try {
        const formagendamento = {
            ideprofissional: localStorage.getItem("ideprofissional") || "null",
            ideservico:localStorage.getItem("ideservico") || "null",
            ideusuario: localStorage.getItem("ideusuario") || "null",
            data_agenda: localStorage.getItem("data_consulta") || "null",
            local: document.getElementById("idselectlocal").value,
            notas: document.getElementById("idinputnota").value,
            codigo: await gerarToken(),
        };

        console.log("Dados sendo enviados:", formagendamento); // Debug

        const respostaUsuario = await fetch('http://localhost:5050/insereagendamento', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formagendamento),
        });

        const data = await respostaUsuario.json();

        if (!respostaUsuario.ok) {
            throw new Error(data.error || "Erro desconhecido no servidor");
        }

        console.log("Resposta do servidor:", data); 

        alert("Agendamento feito com sucesso! Código: " + formagendamento.codigo);
        window.location.href = "landingpage.html";

    } catch (error) {
        console.error("Erro detalhado:", error);
        alert("Erro no agendamento: " + error.message);
    }
}