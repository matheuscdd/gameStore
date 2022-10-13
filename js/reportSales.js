

function showCanvasGames() {
    if (dados.maisVendidos.length === 0) {
        document.getElementById("gameMostSold").classList.add('displayNone');
        document.getElementById("erroFaltaMaisVendidos").classList.remove('displayNone');
    } else {
        document.getElementById("erroFaltaMaisVendidos").classList.add('displayNone');
        let pai = document.querySelector("#paiDoGame");
        pai.innerHTML = "";
        pai.innerHTML = `
        <canvas id="gameMostSold" width="600" height="400"></canvas>
        `
        var ctx = document.getElementById("gameMostSold").getContext("2d");
        new Chart(ctx).Pie(dataGames);
    }
}





function showCanvasPlataformas() {
    let pai = document.querySelector("#paiDaPlat");
    pai.innerHTML = "";
    pai.innerHTML =
    `
    <canvas id="plataformMostSold" width="600" height="400"></canvas>
    `
    var ctx = document.getElementById("plataformMostSold").getContext("2d");
    new Chart(ctx).Pie(dataPlataformas);
}



function verificarMaiorTotalGeradoGame() {
    let array = dados.maisVendidos;
    if (array === undefined) {return}
    let nome = "";
    let most = 0;
    for (el of array) {
        if (el.totalGeradoPorEsseGame > most) {
            most = el.totalGeradoPorEsseGame; 
            nome = el.titulo;
        }
    }
    return {nome, most}
}

function verificarPlataformaQueMaisVendeu() {
    let obj = dados.vendasPorPlataforma;
    let most = 0;
    let plataforma = "";
    for (let el in obj) {
        if (obj[el] > most) {
            most = obj[el];
            plataforma = el;
        }
    }
    return {plataforma, most};
}

function gerarNumeros(min,max) {
    min = Math.ceil(min);
    max = Math.floor(max+1);
    let result = Math.floor(Math.random() * (max - min) + min);
    if (result >= max) {
      result = max-1;
    }
    return result;
}

function gerarCores() {
    let red = gerarNumeros(0,255);
    let green = gerarNumeros(0,255);
    let blue = gerarNumeros(0,255);
    let cor = `rgb(${red},${green},${blue})`;
    let cora = `rgba(${red},${green},${blue},0.5)`;
    return {cor, cora};
}

function vendasPlataformaPorcentagem() {
    let dispositivos = dados.vendasPorPlataforma;
    let a = dados.totalVendas;
    let b = 100;
    let obj = {};
    for (let el in dispositivos) {
        let c = dispositivos[el];
        let x = (b*c)/a;
        x = x.toFixed(2);
        obj[el] = `${el}: ${x}%  -  R$`;
    }
    return obj;
}



function buildChartPlataform() {
    let array = [];
    let percentagem = vendasPlataformaPorcentagem();
    for (let el in dados.vendasPorPlataforma) {
        let one = {};
        one['$'+el] = dados.vendasPorPlataforma[el];
        for (let key in percentagem) {
            if (key === el) {
                one['%'+key] = percentagem[key];
            }
        }
        array.push(one);
    }

    for (let index of array) {
        let obj = {};
        for (let el in index) {
            
            if (el[0] === '$') {
                obj.value = Number(index[el].toFixed(2));
            } 
            if (el[0] === '%') {
                obj.label = index[el];
            }
            let colorar = gerarCores();
            obj.color = colorar.cor;
            obj.highlight = colorar.cora;
            
        }
        dataPlataformas.push(obj);
    }
    return dataPlataformas
}


function buildMostSalesGames() {
    let lista = dados.maisVendidos;
    if (lista === undefined) {return} 
    let array = [];
    let percentagem = vendasGamesPorcentagem();

    for (let index of lista) {
        let one = {};
        for (let key in index) {
            if (key === 'titulo') {
                one[key] = index[key];
            } else if (key === 'totalGeradoPorEsseGame') {
                one[key] = index[key];
            }
        }
        array.push(one);
    }

    for (let jogo of array) {
        for (let propety in jogo) {
            for (let key in percentagem) {
                if (key === jogo[propety]) {
                    jogo.proporcao = percentagem[key];
                }
            }
        }
    } 

    for (let index of array) {
        let obj = {};
        for (let chave in index) {
            if (chave === 'totalGeradoPorEsseGame') {
                obj.value = index[chave];
            } 
            if (chave === 'proporcao') {
                obj.label = index[chave];
            }
            let colorar = gerarCores();
            obj.color = colorar.cor;
            obj.highlight = colorar.cora;
        }
        dataGames.push(obj);
    }
    return dataGames
}

function vendasGamesPorcentagem() {
    let jogos = dados.maisVendidos;
    if (jogos === undefined) {return}
    let a = dados.totalVendas;
    let b = 100;
    let obj = {};
    let title = "";
    for (let el of jogos) {
       for (let propriedade in el) {
        if (propriedade === "titulo") {
            title = el[propriedade];
        }
        if (propriedade === "totalGeradoPorEsseGame") {
        let c = el[propriedade];
        let x = (b*c)/a;
        x = x.toFixed(2);
        obj[title] = `${title}: ${x}%  -  R$`;
    }
    
}
}
    return obj;
}

function showTotalGerado() {
    let info = valorReal(dados.totalVendas);
    document.querySelector("#totalGerado").innerText = info;
}



function showGameMostSold() {
    if (dados.maisVendidos.length === 0) {
        document.querySelector("#jogoMaisVendidoTotal").innerText = "Não foram encontrados jogos suficientes para essa análise"
    } else {
    let obj = verificarMaiorTotalGeradoGame();
    let info = valorReal(obj.most);
    document.querySelector("#jogoMaisVendidoTotal").innerText = `${obj.nome}: ${info}`;
    }
}



function showPlataforma() {
    let obj = verificarPlataformaQueMaisVendeu();
    let info = valorReal(obj.most);
    document.querySelector("#plataformaMaisVendeu").innerText = `${obj.plataforma}: ${info}`;
}




function showTotalPedidos() {
    document.querySelector("#somaPedidos").innerText = `${dados.totalDePedidos}`;
}




function showConsole() {
    console.log(pedidos);
}


function calcQuantidadeGeradaPorCadaJogo() {
    let array = [];
    let work = dados.salesTitulosSale;
    for (let el of work) {
        let obj = {
            titulo: "",
            copiasVendidas: 0,
            precoUnitario: 0,
            totalGerado: 0,
        }
        obj.titulo = el.name;
        obj.precoUnitario = el.price;
        array.push(obj);
    }

    
    for (let index of array) {
        for (let el of array) {
            if (index.titulo === el.titulo) {
                index.copiasVendidas++;
            }
        }
    }

    array = removerDuplicatas(array)

    for (let indice of array) {
        indice.totalGerado = indice.copiasVendidas * indice.precoUnitario;
    }
    
    for (let element of array) {
        element.precoUnitario = valorReal(element.precoUnitario);
        element.totalGerado = valorReal(element.totalGerado);
    }

    return array
}

function mostrarCadaJogo() {
    let array = calcQuantidadeGeradaPorCadaJogo();
    let tabela = document.querySelector('table');
    tabela.innerHTML = "";
    tabela.innerHTML =
    `<tr>
    <td class="thR th">Nome do Jogo</td>
    <td class="meio th">Preço Unitário</td>
    <td class="meio th">Cópias vendidas</td>
    <td class="thL th">Total Gerado</td>
    </tr>`;
    for (let i = 0; i < array.length; i++) {
        let el = array[i];
        if (i % 2 === 0) {
        tabela.insertAdjacentHTML("beforeend", `
            <tr style="background-color: #d4d4d4">
                <td>${el.titulo}</td>
                <td>${el.precoUnitario}</td>
                <td>${el.copiasVendidas}</td>
                <td>${el.totalGerado}</td>
            </tr>
        `);
        } else {
            tabela.insertAdjacentHTML("beforeend", `
            <tr>
                <td>${el.titulo}</td>
                <td>${el.precoUnitario}</td>
                <td>${el.copiasVendidas}</td>
                <td>${el.totalGerado}</td>
            </tr>
        `);
        }
    }
}