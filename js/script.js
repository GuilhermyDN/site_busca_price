function buscarProdutosComTermoBusca(elementoBusca) {
    var termoBusca = elementoBusca.toLowerCase();
    var url = 'http://fakestoreapi.com/products';
    // Limpar o conteúdo anterior
    var resultadoContainer = document.querySelector('.resultado');
    resultadoContainer.innerHTML = '';

    // Lista de lojas
    var lojas = ['Amazon', 'Mercado Livre', 'Shopee', 'Magazine Luiza', 'Casas Bahia'];
    // Realizar uma requisição AJAX usando a API Fetch
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro ao carregar os dados dos produtos. Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            var produtosFiltrados = data.filter(function (produto) {
                return produto.title.toLowerCase().includes(termoBusca);
                
            });
            
            // Construir a estrutura HTML com os produtos filtrados
            produtosFiltrados.forEach(function (produto) {
                var container = document.createElement('div');
                container.className = 'container';

                var wrapper = document.createElement('div');
                wrapper.className = 'wrapper';

                
                var imagem = document.createElement('img');
                imagem.src = produto.image;

                var nome = document.createElement('p');
                nome.textContent = produto.title;


                var h1 = document.createElement('h1');
                var nomeSpan = document.createElement('span');
                nomeSpan.textContent = produto.title;
                h1.appendChild(nomeSpan);

                var preco = document.createElement('p');
                preco.textContent = 'Preço: $' + produto.price.toFixed(2);

                var loja = document.createElement('p');
                loja.textContent = 'Loja: ' + lojas[Math.floor(Math.random() * lojas.length)];

                var buttonWrapper = document.createElement('div');
                buttonWrapper.className = 'button-wrapper';

                var verMaisBtn = document.createElement('button');
                verMaisBtn.className = 'btn fill';
                verMaisBtn.textContent = 'VER MAIS';
                verMaisBtn.onclick = function () {
                    redirecionarParaLojaFicticia(loja.textContent);
                };

                // Adicionar elementos ao DOM
                container.appendChild(wrapper);
                wrapper.appendChild(imagem);
                wrapper.appendChild(h1);
                wrapper.appendChild(preco);
                wrapper.appendChild(loja);
                container.appendChild(buttonWrapper);
                buttonWrapper.appendChild(verMaisBtn);

                resultadoContainer.appendChild(container);
            });
        })
        .catch(error => {
            alert(error);
        });
}


function redirecionarParaLojaFicticia(loja) {
    // Redireciona para uma URL fictícia da loja
    var mensagem = 'Redirecionando para a página fictícia da loja: ' + loja;
    alert(mensagem);

    // Cria um novo elemento para a mensagem
    var mensagemElement = document.createElement('p');
    mensagemElement.textContent = mensagem;

    // Substitui o conteúdo existente com o novo elemento de mensagem
    var resultadoContainer = document.querySelector('.resultado');
    resultadoContainer.innerHTML = '';
    resultadoContainer.appendChild(mensagemElement);

    // window.location.href = 'https://lojaficticia.com/' + loja;
}
