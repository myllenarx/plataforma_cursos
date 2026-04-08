// =====================
// ARRAYS (BANCO FAKE)
// =====================
let categorias = [];
let cursos = [];

// =====================
// CLASSES
// =====================
class Categoria {
    constructor(id, nome, descricao) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
    }
}

class Curso {
    constructor(id, titulo, descricao, idCategoria) {
        this.id = id;
        this.titulo = titulo;
        this.descricao = descricao;
        this.idCategoria = idCategoria;
    }
}

// =====================
// CATEGORIA
// =====================
function cadastrarCategoria() {

    let nome = document.getElementById("nomeCategoria").value;
    let descricao = document.getElementById("descCategoria").value;

    if (nome === "") {
        alert("Nome obrigatório!");
        return;
    }

    let categoria = new Categoria(Date.now(), nome, descricao);

    categorias.push(categoria);

    limparCamposCategoria();
    listarCategorias();
    atualizarSelectCategorias();
}

function limparCamposCategoria() {
    document.getElementById("nomeCategoria").value = "";
    document.getElementById("descCategoria").value = "";
}

function listarCategorias() {

    let lista = document.getElementById("listaCategorias");

    lista.innerHTML = "";

    categorias.forEach(cat => {
        lista.innerHTML += `
            <li class="list-group-item">
                <strong>${cat.nome}</strong> - ${cat.descricao}
            </li>
        `;
    });
}

// =====================
// SELECT DE CATEGORIA
// =====================
function atualizarSelectCategorias() {

    let select = document.getElementById("selectCategoria");

    select.innerHTML = `<option value="">Selecione uma categoria</option>`;

    categorias.forEach(cat => {
        select.innerHTML += `
            <option value="${cat.id}">
                ${cat.nome}
            </option>
        `;
    });
}

// =====================
// CURSO
// =====================
function cadastrarCurso() {

    let titulo = document.getElementById("tituloCurso").value;
    let descricao = document.getElementById("descCurso").value;
    let idCategoria = document.getElementById("selectCategoria").value;

    if (titulo === "" || idCategoria === "") {
        alert("Preencha os campos obrigatórios!");
        return;
    }

    let curso = new Curso(Date.now(), titulo, descricao, idCategoria);

    cursos.push(curso);

    listarCursos();
}

function listarCursos() {

    let lista = document.getElementById("listaCursos");

    lista.innerHTML = "";

    cursos.forEach(curso => {

        let categoria = categorias.find(c => c.id == curso.idCategoria);

        lista.innerHTML += `
            <li class="list-group-item">
                <strong>${curso.titulo}</strong> 
                - ${curso.descricao} 
                <br>
                <small>Categoria: ${categoria ? categoria.nome : "Não encontrada"}</small>
            </li>
        `;
    });
}