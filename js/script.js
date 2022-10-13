//Aqui limito a quantidade de caracteres da descrição
function limitarCaracteres() {
    for (let i = 0; i < gamesList.length; i++) {
        let el = gamesList[i];
        el.id = i;
        if (el.title.length > 90) {
            let string = el.title;
            let array = string.split('');
            array.splice(90, (array.length-90));
            array[91] = "...";
            string = array.join('');
            el.description = string
        } else {
            el.description = el.title
        }
    }
}

limitarCaracteres();

//Aleatorizo as posições do array
function randomArray (arr) {
    let i = arr.length, j, temp;
    while(--i > 0) {
      j = Math.floor(Math.random()*(i+1));
      temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
    return arr;
  }
  
gamesList = randomArray(gamesList);
let fullGames = [];
let tudesJoguinhes = [];

for (let ki of gamesList) {
    fullGames.push(ki);
    tudesJoguinhes.push(ki);
}


//Aqui irei criar dinamicamente a lista
let ol = document.querySelector(".ulsecreto");
let ul = document.querySelector(".listaItens");


function createList(arr) {
    ol.classList.add("displayNone");
    ul.classList.remove("displayNone");
    ul.innerHTML = "";
    for (let el of arr) {
        //Aqui crio a tag para o usuário clicar e já selecionar sua categoria
        let exp = "";
        if      (el.platform === "PlayStation") {exp = "playStation()"} 
        else if (el.platform === "Xbox")        {exp = "xBox()"} 
        else if (el.platform === "Switch")      {exp = "nintendo()"} 
        else if (el.platform === "PC")          {exp = "personalComputer()"}
        
        //Aqui a lista é criada
        ul.insertAdjacentHTML("beforeend", `
<li class="card">
    <picture class="listPhoto">
        <img class="imgPRoduto" src="${el.imagem}">
    </picture>
    <span class="tagCategoria" onclick="${exp}">${el.platform}</span>
    <h3 class="gameTitle" title="${el.name}">${el.name}</h3>
    <small class="gameDescription" title="${el.title}">${el.description}</small>
    <h4 class="gamePrice">${valorReal(el.price)}</h4>
    <legend onclick="add(${el.id})" class="adicionar">Adicionar ao carrinho</legend>
</li>
        `);
    }
}



function createListSecret(arr) {
    ul.classList.add("displayNone");
    ol.classList.remove("displayNone");
    ol.innerHTML = "";
    for (let el of arr) {
        //Aqui crio a tag para o usuário clicar e já selecionar sua categoria
        let exp = "";
        if      (el.platform === "PlayStation") {exp = "playStation()"} 
        else if (el.platform === "Xbox")        {exp = "xBox()"} 
        else if (el.platform === "Switch")      {exp = "nintendo()"} 
        else if (el.platform === "PC")          {exp = "personalComputer()"}
        
        //Aqui a lista é criada
        ol.insertAdjacentHTML("beforeend", `
<li class="card">
    <picture class="listPhoto">
        <img class="imgPRoduto" src="${el.imagem}">
    </picture>
    <span class="tagCategoria" onclick="${exp}">${el.platform}</span>
    <h3 class="gameTitle" title="${el.name}">${el.name}</h3>
    <small class="gameDescription" title="${el.title}">${el.description}</small>
    <h4 class="gamePrice">${valorReal(el.price)}</h4>
    <legend onclick="add(${el.id})" class="adicionar">Adicionar ao carrinho</legend>
</li>
        `);
    }
}


function todos() {
    removeBold();
    let bot = document.getElementsByClassName('categoryButton')[0];
    bot.classList.add('bolder');
    createList(fullGames);
}

todos();

let playstationGames = [];
let xboxGames = [];
let switchGames = [];
let pcGames = [];


function removeBold() {
    for (let i = 0; i < 5; i++) {
    let bot = document.getElementsByClassName('categoryButton')[i];
    bot.classList.remove('bolder');
    }
}

//Função para criar as categorias
function makeCategoryList(array, tagName) {
    array = [];
    for (let el of fullGames) {
        if (el.platform === tagName) {
            array.push(el);
        }
    }
    createList(array);
}

function playStation() {
    removeBold();
    let bot = document.getElementsByClassName('categoryButton')[1];
    bot.classList.add('bolder');
    makeCategoryList(playstationGames, "PlayStation");
}

function nintendo() {
    removeBold();
    let bot = document.getElementsByClassName('categoryButton')[2];
    bot.classList.add('bolder');
    makeCategoryList(switchGames, "Switch");
}

function xBox() {
    removeBold();
    let bot = document.getElementsByClassName('categoryButton')[3];
    bot.classList.add('bolder');
    makeCategoryList(xboxGames, "Xbox");
}

function personalComputer() {
    removeBold();
    let bot = document.getElementsByClassName('categoryButton')[4];
    bot.classList.add('bolder');
    makeCategoryList(pcGames, "PC");
}


//🟢Sistema de busca
const input = document.querySelector("#search");

let todosJogos = [];
for (let ko of tudesJoguinhes) {
    todosJogos.push(ko);
}
function procurar() {
    
    
    const textoParaBusca = document.querySelector("#search").value.toLowerCase();
    if(textoParaBusca.length > 1) {
        for (let i = 0; i < todosJogos.length; i++) {
            let arr = todosJogos;
            let nameJogo = todosJogos[i].name.toLowerCase()
            if (nameJogo.includes(textoParaBusca)) {
                createListSecret(arr);
            } else {
                arr.splice((arr.indexOf(todosJogos[i])),1);
                createListSecret(arr);
            }
          }
} 
}




document.addEventListener("keydown", function(event) {
    if (event.code === "Backspace" && document.activeElement === input) { 
        const textoParaBusca = document.querySelector("#search").value;
        if (textoParaBusca.length === 1) {
            todosJogos = []
            for (let ko of tudesJoguinhes) {
                todosJogos.push(ko);
            }
            todos();

        } 
    }
});


//🔴 Sistema de compra
let pedidos = [];
let compra = [];
let sum = 0;
function add(id) {
    let carrinho = document.querySelector(".carrinho");
    let carVazio = document.querySelector(".carEmpty");

    if (carrinho.contains(carVazio)) {
        carrinho.removeChild(carVazio);
        let div = document.createElement('div');
        div.classList.add("carFull");
        let uL = document.createElement('ul');
        uL.classList.add("carList");
        div.appendChild(uL);
        carrinho.appendChild(div);
    } 

    let carCheio = document.querySelector(".carFull");
    let carList = document.querySelector(".carList");
    
    for (let el of fullGames) {
        if (el.id === id) {
            compra.push(el);
            carList.insertAdjacentHTML("beforeend", `
                        <li class="carItem id${el.id}">
                            <picture class="carPhoto">
                                <img class="carImagem" src="${el.imagem}">
                            </picture>
                            <div>
                                <h4 class="carTitleItem" title="${el.name}">${el.name}</h4>
                                <h4 class="carGamePrice">${valorReal(el.price)}</h4>
                                <span class="remove" onclick="remover(${el.id})">Remover produto</span>
                            </div>
                        </li>
            `);
        }
    }
    changeStatus();

    let compreButton = document.querySelector(".buttonComprar");
    if (carrinho.contains(compreButton) === false) {
    carCheio.insertAdjacentHTML("afterend", `
    <button class="buttonComprar bot" onclick="buy()">Comprar</button>
    `);
    }
}

function remover(id) {
    for (let i = 0; i < fullGames.length; i++) {
        let el = fullGames[i];
        if (el.id === id) {
            compra.splice((compra.indexOf(el)),1);
        }
        changeStatus();
    }
    let carList = document.querySelector(".carList");
    let produtoRemove = document.querySelector(`.id${id}`);
    carList.removeChild(produtoRemove);

    if (sum === 0) {zerador()};
}

function changeStatus() {
    sum = 0;
    for (let iten of compra) {
        sum += iten.price;
    }
    let carCheio = document.querySelector(".carFull");
    let carStatus = document.querySelector(".carSituation");
    if (carCheio.contains(carStatus)) {
        carCheio.removeChild(carStatus);
    } 
    let carSituation = document.createElement('div');
    carSituation.classList.add("carSituation");
    carSituation.innerHTML = `
        <div class="quantos">
            <h4 class="quant">Quantidade:</h4>
            <p class="quantNum">${compra.length}</p>
        </div>
        <div class="quantos">
            <h4 class="quant">Total:</h4>
            <p class="priceFinal">${valorReal(sum)}</p>
        </div>
        `;
    carCheio.append(carSituation);
}

function zerador() {
    let carrinho = document.querySelector(".carrinho");
    carrinho.innerHTML = `
    <h4 class="carrinhoTitle">Carrinho de compras</h4>
    <div class="carEmpty">
        <h2 class="empty">Carrinho vazio</h2>
        <small>Adicione itens</small>
    </div>
    `;
}

zerador();


//-------------------------------------------------

//🟡 Sistema de envio
let estouComprando = false;
let estouLogando = false;
let jaCliqueinoCompra = false;

function buy() {
    parcelar();
    ocultarMain();
    estouComprando = true;
    let envio = document.querySelector(".pedidoEnvio");
    envio.classList.remove("displayNone");

    let botoesCategoria = document.querySelectorAll(".categoryButton");
    for (let el of botoesCategoria) {
        el.classList.add("displayNone");
    }

    let butaoFechar = document.querySelector(".fechar");
    butaoFechar.classList.remove("displayNone");

    document.querySelector(".log").classList.add("displayNone");
}

//🟣 CEP
(function(){
    // Referência https://www.mxcursos.com/blog/como-consultar-cep-utilizando-javascript/#:~:text=Agora%20vamos%20realizar%20a%20requisi%C3%A7%C3%A3o,%3E%20%7B%20const%20value%20%3D%20cep.
	const cep = document.querySelector("input[name=cep]");
  
  cep.addEventListener('blur', e=> {
  		const value = cep.value.replace(/[^0-9]+/, '');
      const url = `https://viacep.com.br/ws/${value}/json/`;
      
      fetch(url)
      .then( response => response.json())
      .then( json => {
      		
          if( json.logradouro ) {
          	document.querySelector('#rua').value = json.logradouro;
            document.querySelector('#bairro').value = json.bairro;
            document.querySelector('#cidade').value = json.localidade;
            document.querySelector('#estado').value = json.uf;
          }
      });
  });
})();

//🔵 Formas de pagamentos
let vendas = [];
let titulosVendidos = [];

function parcelar() {
    let one = document.querySelector("#x1").innerText = `1 x ${valorReal(sum)}`; 
    let two = document.querySelector("#x2").innerText = `2 x ${valorReal(sum / 2)}`;
    let four = document.querySelector("#x4").innerText = `4 x ${valorReal(sum / 4)}`;
    let six = document.querySelector("#x6").innerText = `6 x ${valorReal(sum / 6)}`;
    let eight = document.querySelector("#x8").innerText = `8 x ${valorReal(sum / 8)}`;  
    let twelve = document.querySelector("#x12").innerText = `12 x ${valorReal(sum / 12)}`;    
}

let myWayToPayment = "";
let checkSeletion = false;
function selecionar() {
    const optionPay = document.querySelector(".selection");
    let value = optionPay.options[optionPay.selectedIndex].value;
    if (value.length != 0) {
        checkSeletion = true;
        jaCliqueinoCompra = true;
        myWayToPayment = value;
    }
}

function valorReal(num) {
    return num.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
}


document.addEventListener("keydown", function(event) {
    if (event.key === "Enter" && estouComprando === true) {
        send();
    }
    if (event.key === "Enter" && estouLogando === true) {
        sing();
    }
});


let compreiUmaVez = false;

function send() {
    estouComprando = false;
    for (let i = 0; i <= 12; i++) {
        let element = document.getElementsByClassName("inputEnvio")[i].value;
        if (element.length === 0 || jaCliqueinoCompra === false) {
            alert("Digite todas as informações necessárias");
            return;
        }
    }

    compreiUmaVez = true;
    let butaoFechar = document.querySelector(".fechar");
    butaoFechar.classList.add("displayNone");

    let botoesCategoria = document.querySelectorAll(".categoryButton");
    for (let el of botoesCategoria) {
        el.classList.remove("displayNone");
    }

    

    document.querySelector(".log").classList.remove("displayNone");
    vendas.push(sum);
    titulosVendidos.push(compra);
    let body = document.querySelector('body');
    let envio = document.querySelector(".pedidoEnvio");
    envio.classList.add("displayNone");
    body.insertAdjacentHTML("afterbegin", `
    <div class="white">
    <img class="loading" src="https://i.postimg.cc/YqXLWVfd/shopping-cart.gif">
    </div>
    `)
    setTimeout(ocultarWhite, 5000);


    //Captando os dados
    let mercadoria = {};
    mercadoria.address = {};
    mercadoria.payment = {};
    mercadoria.address.nameClient = document.querySelector('#nomeInput').value;
    mercadoria.address.telefone = document.querySelector('#telefone').value;
    mercadoria.address.cep = document.querySelector('#cep').value;
    mercadoria.address.uf = document.querySelector('#estado').value;
    mercadoria.address.bairro = document.querySelector('#bairro').value;
    mercadoria.address.rua = document.querySelector('#rua').value;
    mercadoria.address.numeroCasa = document.querySelector('#numberCasa').value;
    mercadoria.address.complemento = document.querySelector('#complemento').value;
    mercadoria.payment.parcelamento = myWayToPayment; 
    mercadoria.payment.nameCard = document.querySelector('#nomeCartao').value; 
    mercadoria.payment.numberCard = document.querySelector('#numCartao').value; 
    mercadoria.payment.vencCard = document.querySelector('#vencCartao').value;
    mercadoria.payment.scCard = document.querySelector('#csCartao').value;
    mercadoria.produtos = compra;
    mercadoria.valorTotalPedido = sum;
    pedidos.push(mercadoria);
}

function ocultarWhite() {
    let body = document.querySelector('body');
    let white = document.querySelector(".white");
    body.removeChild(white);

    zerador();
    compra = [];
    sum = 0;

    mostrarMain();
    alert("Compra efetuada com sucesso!")
}

let butaoFechar = document.querySelector(".fechar");
butaoFechar.addEventListener("click", close);


function close() {
    estouComprando = false;
    estouLogando = false;
    let envio = document.querySelector(".pedidoEnvio");
    envio.classList.add("displayNone");
    document.querySelector(".report").classList.add("displayNone");
    mostrarMain();

    butaoFechar.classList.add("displayNone");
    document.querySelector(".acesso").classList.add("displayNone");
    let botoesCategoria = document.querySelectorAll(".categoryButton");
    for (let el of botoesCategoria) {
        el.classList.remove("displayNone");
    }
    document.querySelector(".log").classList.remove("displayNone");
}

function ocultarMain() {
    let marketplace = document.querySelector(".marketplace"); 
    marketplace.classList.add("displayNone");

    let aside = document.querySelector(".barraLateral"); 
    aside.classList.add("displayNone");
}


function mostrarMain() {
    let marketplace = document.querySelector(".marketplace"); 
    marketplace.classList.remove("displayNone");

    let aside = document.querySelector(".barraLateral"); 
    aside.classList.remove("displayNone");
}

//🟠Relatório Vendas
function login() {
    estouLogando = true;
    ocultarMain();
    document.querySelector(".acesso").classList.remove("displayNone");
    butaoFechar.classList.remove("displayNone");
    document.querySelector(".log").classList.add("displayNone");
    let botoesCategoria = document.querySelectorAll(".categoryButton");
    for (let el of botoesCategoria) {
        el.classList.add("displayNone");
    }
}

function sing() {
    let user = document.querySelector("#user").value;
    let passwd = document.querySelector("#senha").value;
    if (user.length === 0) {
        alert("Digite o usuário");
        return;
    } 
    else if (passwd.length === 0) {
        alert("Digite a senha");
        return;
    } 
    else if (user != "admin") {
        alert("Usuário não encontrado");
        return;
    } 
    else if (passwd != "1234") {
        alert("Senha incorreta");
        return;
    } else if (compreiUmaVez === false) {
        alert("Ainda não foram realizadas vendas");
        alert("Tente novamente mais tarde");
        return;
    }
    else {
        estouLogando = false;
        alert("Seja bem-vindo administrador");
        document.querySelector(".acesso").classList.add("displayNone");
        let body = document.querySelector('body');
        body.insertAdjacentHTML("afterbegin", `
        <div class="white">
        <img class="loading" src="https://i.postimg.cc/sXdWx69c/line-chart.gif">
        </div>
        `)
        setTimeout(ocultarWhiteVendas, 5000);
        ReportSalles();
        setTimeout(mostrarPainelVendas, 5000);
    }
}

function ocultarWhiteVendas() {
    let body = document.querySelector('body');
    let white = document.querySelector(".white");
    body.removeChild(white);
}

let dados = {}
function ReportSalles() {
    let salesReport = {};
    let totalVendas = 0;
    if (vendas.length === 1) {
        totalVendas = vendas[0];
    } else {
    for (let sale of vendas) {
        totalVendas += sale;
    }
    }
    salesReport.totalVendas = Number(totalVendas.toFixed(2));
    salesTitulosSale = []
    for (let hanbai of titulosVendidos) {
        for (let el of hanbai) {
            salesTitulosSale.push(el);
        }
    }

    salesReport.salesTitulosSale = salesTitulosSale;


    let matriz = [];
    let maisVendidos = [];
    for (let title of salesReport.salesTitulosSale) {
        if (matriz.includes(title)) {
            let obj = {};
            obj.titulo = title.name;
            obj.identificador = title.id;
            obj.videogame = title.platform;
            obj.valor = title.price;
            obj.copiasVendidas = 1;
            maisVendidos.push(obj);
        }
        matriz.push(title);
    }

    for (let i = 0; i < maisVendidos.length; i++) {
        for (let j = 0; j < maisVendidos.length; j++) {
            if (maisVendidos[i].identificador === maisVendidos[j].identificador) {
                maisVendidos[i].copiasVendidas++
            }
        }
    }

    for (let elementary of maisVendidos) {
        let copys = elementary.copiasVendidas;
        let valorGame = elementary.valor;
        let lucrosporGame = copys*valorGame;
        lucrosporGame = Number(lucrosporGame.toFixed(2));
        elementary.totalGeradoPorEsseGame = lucrosporGame;
    }
    
    
    maisVendidos = removerDuplicatas(maisVendidos);
    

    if (maisVendidos.length > 0) {
    let outrosJogos = 0;
    let somaMaisVendidos = 0;
    for (let jogo of maisVendidos) {
        somaMaisVendidos += jogo.totalGeradoPorEsseGame;
    }
    if (maisVendidos.length === 0) {

    } else {
    outrosJogos = totalVendas - somaMaisVendidos;
    outrosJogos = Number(outrosJogos.toFixed(2));
    maisVendidos.push({
        titulo: 'Outros jogos',
        totalGeradoPorEsseGame: outrosJogos, 
    });
    }
    }
    //🔴 Se der problema pode ser aqui
    let cleanMaisvendidos = maisVendidos;

    salesReport.maisVendidos = cleanMaisvendidos;




    vendasPorPlataforma = {
        Xbox: 0,
        Computer: 0,
        NintendoSwitch: 0,
        PlayStation: 0,
    }


    for (let el of salesTitulosSale) {
        if (el.platform === "PlayStation") {
            vendasPorPlataforma.PlayStation += el.price;
        } else if (el.platform === "Xbox") {
            vendasPorPlataforma.Xbox += el.price;
        } else if (el.platform === "PC") {
            vendasPorPlataforma.Computer += el.price;
        } else if (el.platform === "Switch") {
            vendasPorPlataforma.NintendoSwitch += el.price;
        }
    }

    vendasPorPlataforma.Xbox = Number(vendasPorPlataforma.Xbox.toFixed(2));
    vendasPorPlataforma.PlayStation = Number(vendasPorPlataforma.PlayStation.toFixed(2));
    vendasPorPlataforma.NintendoSwitch = Number(vendasPorPlataforma.NintendoSwitch.toFixed(2));
    vendasPorPlataforma.Computer = Number(vendasPorPlataforma.Computer.toFixed(2));

    salesReport.vendasPorPlataforma = vendasPorPlataforma;

    salesReport.totalDePedidos = vendas.length;
    
    return salesReport;
}

let dataGames = [];
let dataPlataformas = [];
let relatorioVendas = {};
function mostrarPainelVendas() {
    dados = ReportSalles();
    document.querySelector(".report").classList.remove("displayNone");
    buildMostSalesGames();
    buildChartPlataform();
    showGameMostSold();
    showTotalPedidos();
    showTotalGerado(); 
    showPlataforma();
    mostrarCadaJogo();
    showCanvasPlataformas();
    showCanvasGames();
}



function removerDuplicatas(lista) {
    let arrayUnique = [];
    let arrayTitle = [];
    for (let el of lista) {
      let test = el.titulo;
      if (arrayTitle.includes(test) === false) {
        arrayTitle.push(test);
      }
    }
  
    for (let index of lista) {
      let verificar = index.titulo;
      if (arrayTitle.includes(verificar)) {
        arrayUnique.push(index);
        let position = arrayTitle.indexOf(verificar);
        arrayTitle.splice(position,1);
      }
    }
  
    return arrayUnique;
}

function focado(){
    document.getElementsByClassName("carrinhoTitle")[0].classList.remove("desfocado");
    document.getElementsByClassName("carrinhoTitle")[0].classList.add("focado");
}

function desfocado(){
    document.getElementsByClassName("carrinhoTitle")[0].classList.add("desfocado");
    document.getElementsByClassName("carrinhoTitle")[0].classList.remove("focado");
}
