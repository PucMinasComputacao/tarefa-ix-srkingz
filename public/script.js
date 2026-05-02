// ======================================================
// B.1 - Base de dados em JSON
// ======================================================

const data = {
  produtos: [
    {
      id: 1,
      nome: "iPhone 14",
      preco: 3999.90,
      categoria: "Celulares",
      imagem: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400",
      descricao: "Smartphone Apple com ótima câmera, desempenho rápido e design moderno.",
      emEstoque: true
    },
    {
      id: 2,
      nome: "Samsung Galaxy S23",
      preco: 3499.90,
      categoria: "Celulares",
      imagem: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400",
      descricao: "Celular Samsung com tela de alta qualidade e excelente desempenho.",
      emEstoque: true
    },
    {
      id: 3,
      nome: "Notebook Dell Inspiron",
      preco: 4599.90,
      categoria: "Notebooks",
      imagem: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400",
      descricao: "Notebook ideal para estudos, trabalho e tarefas do dia a dia.",
      emEstoque: true
    },
    {
      id: 4,
      nome: "MacBook Air M1",
      preco: 6999.90,
      categoria: "Notebooks",
      imagem: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
      descricao: "Notebook Apple leve, rápido e com excelente duração de bateria.",
      emEstoque: false
    },
    {
      id: 5,
      nome: "Mouse Gamer RGB",
      preco: 149.90,
      categoria: "Acessórios",
      imagem: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400",
      descricao: "Mouse gamer com iluminação RGB e alta precisão.",
      emEstoque: true
    },
    {
      id: 6,
      nome: "Teclado Mecânico",
      preco: 299.90,
      categoria: "Acessórios",
      imagem: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400",
      descricao: "Teclado mecânico confortável, resistente e indicado para jogos.",
      emEstoque: true
    },
    {
      id: 7,
      nome: "PlayStation 5",
      preco: 3799.90,
      categoria: "Games",
      imagem: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400",
      descricao: "Console de nova geração com gráficos avançados e jogos exclusivos.",
      emEstoque: false
    },
    {
      id: 8,
      nome: "Controle Xbox",
      preco: 399.90,
      categoria: "Games",
      imagem: "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=400",
      descricao: "Controle sem fio confortável para Xbox e PC.",
      emEstoque: true
    }
  ]
};

// ======================================================
// B.2 - Seleção de elementos do DOM
// ======================================================

const productList = document.getElementById("product-list");
const productDetails = document.getElementById("product-details");

const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");
const btnRender = document.querySelector("#btnRender");

// ======================================================
// B.3 - Função para formatar preço
// ======================================================

function formatPrice(preco) {
  return `R$ ${preco.toFixed(2)}`;
}

// ======================================================
// B.3 - Função para criar card de produto
// ======================================================

function createProductCard(produto) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.setAttribute("data-id", produto.id);

  card.style.border = "1px solid #ddd";
  card.style.padding = "16px";

  const imagem = document.createElement("img");
  imagem.setAttribute("src", produto.imagem);
  imagem.setAttribute("alt", produto.nome);

  const titulo = document.createElement("h3");
  titulo.classList.add("card-title");
  titulo.textContent = produto.nome;

  const preco = document.createElement("p");
  preco.classList.add("card-price");
  preco.textContent = formatPrice(produto.preco);

  const categoria = document.createElement("p");
  categoria.classList.add("card-category");
  categoria.textContent = produto.categoria;

  const btnDetails = document.createElement("button");
  btnDetails.classList.add("btn-details");
  btnDetails.textContent = "Ver detalhes";

  btnDetails.addEventListener("click", function() {
    showProductDetails(produto);
  });

  const btnHighlight = document.createElement("button");
  btnHighlight.classList.add("btn-highlight");
  btnHighlight.textContent = "Destacar";

  btnHighlight.addEventListener("click", function() {
    card.classList.add("highlight");
  });

  card.appendChild(imagem);
  card.appendChild(titulo);
  card.appendChild(preco);
  card.appendChild(categoria);
  card.appendChild(btnDetails);
  card.appendChild(btnHighlight);

  return card;
}

// ======================================================
// B.3 - Função para renderizar produtos
// ======================================================

function renderProducts(produtos) {
  productList.innerHTML = "";

  produtos.forEach(function(produto) {
    const card = createProductCard(produto);
    productList.appendChild(card);
  });

  const cards = document.querySelectorAll(".card");

  cards.forEach(function(card) {
    console.log("Card renderizado com data-id:", card.getAttribute("data-id"));
  });
}

// ======================================================
// B.3 - Função para renderizar categorias
// ======================================================

function renderCategories() {
  categorySelect.innerHTML = "";

  const optionTodas = document.createElement("option");
  optionTodas.value = "Todas";
  optionTodas.textContent = "Todas";
  categorySelect.appendChild(optionTodas);

  const categorias = data.produtos.map(function(produto) {
    return produto.categoria;
  });

  const categoriasUnicas = [...new Set(categorias)];

  categoriasUnicas.forEach(function(categoria) {
    const option = document.createElement("option");
    option.value = categoria;
    option.textContent = categoria;
    categorySelect.appendChild(option);
  });
}

// ======================================================
// B.3 - Função para mostrar detalhes do produto
// ======================================================

function showProductDetails(produto) {
  const status = produto.emEstoque ? "Em estoque" : "Fora de estoque";

  productDetails.innerHTML = `
    <h2>${produto.nome}</h2>
    <p><strong>Preço:</strong> ${formatPrice(produto.preco)}</p>
    <p><strong>Categoria:</strong> ${produto.categoria}</p>
    <p><strong>Status:</strong> ${status}</p>
    <p><strong>Descrição:</strong> ${produto.descricao}</p>
  `;
}

// ======================================================
// B.3 - Função para filtrar produtos
// ======================================================

function filterProducts() {
  const textoBusca = searchInput.value.toLowerCase();
  const categoriaSelecionada = categorySelect.value;

  const produtosFiltrados = data.produtos.filter(function(produto) {
    const nomeCombina = produto.nome.toLowerCase().includes(textoBusca);
    const categoriaCombina =
      categoriaSelecionada === "Todas" || produto.categoria === categoriaSelecionada;

    return nomeCombina && categoriaCombina;
  });

  return produtosFiltrados;
}

// ======================================================
// B.4 - Eventos com addEventListener
// ======================================================

searchInput.addEventListener("input", function() {
  const produtosFiltrados = filterProducts();
  renderProducts(produtosFiltrados);
});

categorySelect.addEventListener("change", function() {
  const produtosFiltrados = filterProducts();
  renderProducts(produtosFiltrados);
});

btnRender.addEventListener("click", function() {
  const produtosFiltrados = filterProducts();
  renderProducts(produtosFiltrados);
});

// ======================================================
// Inicialização da página
// ======================================================

renderCategories();
renderProducts(data.produtos);