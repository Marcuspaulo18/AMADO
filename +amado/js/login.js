async function getlogin() {
const formlogin = {
    email: document.getElementById('idlogininputemail').value,
    senha: document.getElementById('idlogininputsenha').value,
    tipo_user: "1"
};

if (!formlogin.email || !formlogin.senha) {
    alert('Por favor, preencha todos os campos');
    return;
}

try {
    const respostalogin = await fetch('http://localhost:5050/verifilogin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formlogin)
    });

    const data = await respostalogin.json(); 

    if (respostalogin.ok) {
        const usuario = data.usuario;

        if (!usuario || !usuario.data_nascimento) {
            throw new Error('Dados do usuário incompletos');
        }
        
        localStorage.setItem("usuario", JSON.stringify(usuario));
        const nascimentoStr = usuario.data_nascimento.split('T')[0];
        const partes = nascimentoStr.split('-');
        const agenascimento = new Date(partes[0], partes[1] - 1, partes[2]);

        const hoje = new Date();

        let idade = hoje.getFullYear() - agenascimento.getFullYear();
        const m = hoje.getMonth() - agenascimento.getMonth();

        if (m < 0 || (m === 0 && hoje.getDate() < agenascimento.getDate())) {
            idade--;
        }

        const usuarioComIdade = { ...usuario, idade };

        localStorage.setItem("usuario", JSON.stringify(usuarioComIdade));

        window.location.href = "../+amado/landingpage.html";
    } else {
        alert(data.error || 'Por favor verifique se o email ou senha estão corretos');
    }

} catch (error) {
    console.error("Erro:", error);
    alert("Erro no login: " + (error.message || "Ocorreu um erro durante o login"));
}
}
