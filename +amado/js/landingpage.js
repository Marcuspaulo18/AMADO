const usuarioSalvo = JSON.parse(localStorage.getItem("usuario"))

const nomeIdade = document.querySelector("#nomeIdade")

localStorage.setItem("ideusuario",usuarioSalvo.id)

const primeiroNome = usuarioSalvo.nome.split(' ')[0];

const primeiroNomeFormatado =
    primeiroNome.charAt(0).toUpperCase() + primeiroNome.slice(1).toLowerCase();

nomeIdade.textContent = `${primeiroNomeFormatado}, ${usuarioSalvo.idade}`