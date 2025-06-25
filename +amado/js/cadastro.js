

function checkanonimato(){
let checkanonimato = document.getElementById('checkanonimato');
let anonimo;  
if (checkanonimato.checked == true){
    anonimo="1";
    localStorage.setItem('cadastro_anonimato',anonimo)
}
else{
    anonimo="0";
    localStorage.setItem('cadastro_anonimato',anonimo)
}
}

function checknomesocial(){
let checknomsocial= document.getElementById('checknomsocial');
let nomsocial=document.getElementById('idcadastroinputnomesocial');
let lblnomsocial=document.getElementById('idcadastrolblnomesocial')
if (checknomsocial.checked == true){
    nomsocial.style.visibility='visible'
    lblnomsocial.style.visibility='visible'
}
else{
    nomsocial.style.visibility='hidden'
    lblnomsocial.style.visibility='hidden'
}
}

function cadastroproximo(){
let idcadastroinputnome= document.getElementById("idcadastroinputnome").value;
let idcadastroinputemail= document.getElementById("idcadastroinputemail").value;
let idcadastroinputCPF= document.getElementById("idcadastroinputcpf").value;
let idcadastroinputgenero= document.getElementById("idcadastroinputgenero").value;
let idcadastroinputtelefone= document.getElementById("idcadastroinputtelefone").value;
let idcadastroinputsenha= document.getElementById("idcadastroinputsenha").value;
let idcadastroinputconfsenha= document.getElementById("idcadastroinputconfsenha").value;
let idcadastroinputdtcnascimento= document.getElementById("idcadastroinputdtcnascimento").value;
let idcadastroinputnomesocial=document.getElementById('idcadastroinputnomesocial').value;
let checknomsocial= document.getElementById('checknomsocial');

if( idcadastroinputCPF !='' &&
    idcadastroinputemail !='' &&
    idcadastroinputnome !='' &&
    idcadastroinputgenero !='' &&
    idcadastroinputtelefone !='' &&
    idcadastroinputsenha !='' &&
    idcadastroinputconfsenha !='' &&
    idcadastroinputdtcnascimento !=''
){
    if(
      idcadastroinputsenha == idcadastroinputconfsenha  
    ){
        window.location.href="../+amado/cadastro2.html"
        if (checknomsocial.checked == true){
        localStorage.setItem('cadastro_nome',idcadastroinputnomesocial)   
        }
        else{
        localStorage.setItem('cadastro_nome', idcadastroinputnome);
        }
        localStorage.setItem('cadastro_email', idcadastroinputemail);
        localStorage.setItem('cadastro_cpf', idcadastroinputCPF);
        localStorage.setItem('cadastro_genero', idcadastroinputgenero);
        localStorage.setItem('cadastro_telefone', idcadastroinputtelefone);
        localStorage.setItem('cadastro_senha', idcadastroinputsenha);
        localStorage.setItem('cadastro_confsenha', idcadastroinputconfsenha);
        localStorage.setItem('cadastro_nascimento', idcadastroinputdtcnascimento);
    }
    else{
        alert('Por favor verifique sua senha,ambas devem ser iguais.')
    }

}
else{
    alert('Por favor preencha todos os campos.')
}
}

function cadastroproximo2(){
    let idcadastroinputrua = document.getElementById("idcadastroinputrua").value;
    let idcadastroinputnumero = document.getElementById("idcadastroinputnumero").value;
    let idcadastroinputcomplemento = document.getElementById("idcadastroinputcomplemento").value;
    let idcadastroinputbairro = document.getElementById("idcadastroinputbairro").value;
    let idcadastroinputcidade = document.getElementById("idcadastroinputcidade").value;
    let idcadastroinputcep = document.getElementById("idcadastroinputcep").value;

    if(
        idcadastroinputrua != '' &&
        idcadastroinputbairro != '' &&
        idcadastroinputcomplemento != '' &&
        idcadastroinputnumero != '' &&
        idcadastroinputcep != '' &&
        idcadastroinputcidade != ''
    ){
        localStorage.setItem('cadastro_rua', idcadastroinputrua);
        localStorage.setItem('cadastro_numero', idcadastroinputnumero);
        localStorage.setItem('cadastro_complemento', idcadastroinputcomplemento);
        localStorage.setItem('cadastro_bairro', idcadastroinputbairro);
        localStorage.setItem('cadastro_cidade', idcadastroinputcidade);
        localStorage.setItem('cadastro_cep', idcadastroinputcep);
        window.location.href="../+amado/confcadastro.html"
    }
    else{
        alert('Por favor preencha todos os campos.');
    }
}

function cadastrodados(){
    const nome = localStorage.getItem('cadastro_nome');
    const email = localStorage.getItem('cadastro_email');
    const cpf = localStorage.getItem('cadastro_cpf');
    const genero = localStorage.getItem('cadastro_genero');
    const telefone = localStorage.getItem('cadastro_telefone');
    const nascimento = localStorage.getItem('cadastro_nascimento');
    const rua = localStorage.getItem('cadastro_rua');
    const numero = localStorage.getItem('cadastro_numero');
    const complemento = localStorage.getItem('cadastro_complemento');
    const bairro = localStorage.getItem('cadastro_bairro');
    const cidade = localStorage.getItem('cadastro_cidade');
    const cep = localStorage.getItem('cadastro_cep');

    document.getElementById("idcadastropnome").textContent = nome || 'Não informado';
    document.getElementById("idcadastropemail").textContent = email || 'Não informado';
    document.getElementById("idcadastropcpf").textContent = cpf || 'Não informado';
    document.getElementById("idcadastropgenero").textContent = genero || 'Não informado';
    document.getElementById("idcadastroptelefone").textContent = telefone || 'Não informado';
    document.getElementById("idcadastropdtcnascimento").textContent = nascimento || 'Não informado';
    document.getElementById("idcadastroprua").textContent = rua || 'Não informado';
    document.getElementById("idcadastropnumero").textContent = numero || 'Não informado';
    document.getElementById("idcadastropcomplemento").textContent = complemento || 'Não informado';
    document.getElementById("idcadastropbairro").textContent = bairro || 'Não informado';
    document.getElementById("idcadastropcidade").textContent = cidade || 'Não informado';
    document.getElementById("idcadastropcep").textContent = cep || 'Não informado';
}

 async function enviacadastro(){
const formcadastro = {
  nome: localStorage.getItem('cadastro_nome'),
  cpf: localStorage.getItem('cadastro_cpf'),
  email: localStorage.getItem('cadastro_email'),
  senha: localStorage.getItem('cadastro_senha'),  
  anonimato: localStorage.getItem('cadastro_anonimato'),
  telefone: localStorage.getItem('cadastro_telefone'),
  genero: localStorage.getItem('cadastro_genero'),
  nascimento: localStorage.getItem('cadastro_nascimento'), 
};

const formendereco = {
  cpf: localStorage.getItem('cadastro_cpf'), 
  cidade: localStorage.getItem('cadastro_cidade'),
  rua: localStorage.getItem('cadastro_rua'),    
  bairro: localStorage.getItem('cadastro_bairro'),
  cep: localStorage.getItem('cadastro_cep'),
  complemento: localStorage.getItem('cadastro_complemento'),
  numero: localStorage.getItem('cadastro_numero'),
};

try {

  const respostaUsuario = await fetch('http://localhost:5050/insereusuario', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formcadastro)
  });

  if (!respostaUsuario.ok) {
    const errorData = await respostaUsuario.json();
    throw new Error(errorData.error || 'Erro ao cadastrar usuário');
  }

   console.log('Resposta do servidor (usuário):', {
    status: respostaUsuario.status,
    statusText: respostaUsuario.statusText
  });

  // If user registration succeeds, make the address request
  const respostaEndereco = await fetch('http://localhost:5050/insereendereco', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formendereco)
  });

    console.log('Resposta do servidor (endereço):', {
    status: respostaEndereco.status,
    statusText: respostaEndereco.statusText
  });

  if (!respostaEndereco.ok) {
    const errorData = await respostaEndereco.json();
    throw new Error(errorData.error || 'Erro ao cadastrar endereço');
  }

  window.location.href = "../+amado/home.html";

} catch (error) {
  console.error("Erro:", error);
  alert("Erro no cadastro: " + error.message);
}
}

function carregacep(){
    let idcadastroinputrua = document.getElementById("idcadastroinputrua");
    let idcadastroinputcomplemento = document.getElementById("idcadastroinputcomplemento");
    let idcadastroinputbairro = document.getElementById("idcadastroinputbairro");
    let idcadastroinputcidade = document.getElementById("idcadastroinputcidade");
    let idcadastroinputcep = document.getElementById("idcadastroinputcep").value;

    let bairro = document.querySelector("#bairro")
    let localidade = document.querySelector("#localidade")
    let complemento = document.querySelector("#complemento")
    let logradouro = document.querySelector("#logradouro")

    fetch("https://viacep.com.br/ws/"+idcadastroinputcep+"/json/")
    .then(response=>response.json())
    .then(data=>{
    console.log(data)
    idcadastroinputrua.value = data.logradouro;
    idcadastroinputcidade.value = data.localidade;
    idcadastroinputbairro.value = data.bairro;
    idcadastroinputcomplemento.value = data.complemento;   
    })


}
