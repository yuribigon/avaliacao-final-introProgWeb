let db = JSON.parse(localStorage.getItem("usuarios"));
let userSession = JSON.parse(sessionStorage.getItem("userSession"));
let descricao = document.querySelector('#descricao');
let detalhe = document.querySelector('#detalhes');
let tbody = document.querySelector("#tbody");
let recadosUser = userSession.recados

//EVENTO LISTENER
document.querySelector('#salvar').addEventListener('click', (e)=>{
    e.preventDefault();
    salvarRecado(descricao.value,detalhe.value);
    preencherTabela();
    saveLocal();
});

// LOGOFF
function logoff(){
    sessionStorage.clear;
    window.location='./index.html';
}

//SALVAR RECADOS
function salvarRecado(descricao, detalhe){
    let userSession = JSON.parse(sessionStorage.getItem("userSession"));
    let recadosUser = userSession.recados
    let recado = {
    idRec : recadosUser.length + 1,
    descricao,
    detalhe,
    };
    recadosUser.push(recado);
        
    sessionStorage.setItem('userSession', JSON.stringify(userSession));    
};

//SOBRESCREVER O LOCALSTORAGE
function saveLocal(){
    let db = JSON.parse(localStorage.getItem("usuarios"));
    let userSession = JSON.parse(sessionStorage.getItem("userSession"));
    let recadosUser = userSession.recados
    for(const usuario of db){
        if(usuario.id === userSession.id){
            usuario.recados = recadosUser
            localStorage.setItem('usuarios', JSON.stringify(db));
        }
    };
}

//APRESENTAR OS DADOS
const preencherTabela = ()=>{
    let userSession = JSON.parse(sessionStorage.getItem("userSession"));
    let recadosUser = userSession.recados
    tbody.innerHTML = "";
    for(const recado of recadosUser){
        tbody.innerHTML += `
            <tr>
                <td>${recado.idRec}</td>
                <td>${recado.descricao}</td>
                <td>${recado.detalhe}</td>
                <td>
                    <button onclick="editar(${recado.idRec})">Editar</button>
                    <button onclick="remover(${recado.idRec})">Deletar</button>
                </td>
            </tr>
        `
    }
}

//ATUALIZA ID DE RECADOS
const atualizaIdRec = ()=>{
    let userSession = JSON.parse(sessionStorage.getItem("userSession"));
    let recadosUser = userSession.recados;
    recadosUser.forEach((e,i) => {
        e.idRec = i + 1;
    });
    sessionStorage.setItem('userSession', JSON.stringify(userSession));
};

//BOTÃO REMOVER
const remover = (idRec) => {
    let userSession = JSON.parse(sessionStorage.getItem("userSession"));
    let recadosUser = userSession.recados;
    
    const posicao = recadosUser.findIndex((el)=>el.idRec == idRec);
    recadosUser.splice(posicao, 1);
    sessionStorage.setItem('userSession', JSON.stringify(userSession));
    atualizaIdRec();    
    preencherTabela();
    saveLocal();
}

//BOTÃO EDITAR
const editar = (idRec) => {
    
    let userSession = JSON.parse(sessionStorage.getItem("userSession"));
    let recadosUser = userSession.recados;
    console.log(recadosUser);
    for (const recado of recadosUser) {
        console.log(recado);
        if(idRec === recado.idRec){
            recado.descricao = descricao.value;
            recado.detalhe = detalhe.value;
        }
    }

    sessionStorage.setItem('userSession', JSON.stringify(userSession));
    preencherTabela();
    saveLocal();
}

document.addEventListener("DOMContentLoaded", preencherTabela);


