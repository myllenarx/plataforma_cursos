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
    atualizarSelectCursos();
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

class Usuario {
    constructor(id, nome, email) {
        this.id = id;
        this.nome = nome;
        this.email = email;
    }
}

class Matricula {
    constructor(id, idUsuario, idCurso, data) {
        this.id = id;
        this.idUsuario = idUsuario;
        this.idCurso = idCurso;
        this.data = data;
    }
}

let usuarios = [];
let matriculas = [];

function cadastrarUsuario() {

    let nome = document.getElementById("nomeUsuario").value;
    let email = document.getElementById("emailUsuario").value;

    if (nome === "" || email === "") {
        alert("Preencha todos os campos!");
        return;
    }

    let usuario = new Usuario(Date.now(), nome, email);

    usuarios.push(usuario);

    listarUsuarios();
    atualizarSelectUsuarios();
}

function listarUsuarios() {

    let lista = document.getElementById("listaUsuarios");

    lista.innerHTML = "";

    usuarios.forEach(user => {
        lista.innerHTML += `
            <li class="list-group-item">
                ${user.nome} - ${user.email}
            </li>
        `;
    });
}

function atualizarSelectUsuarios() {
    let select = document.getElementById("selectUsuario");

    select.innerHTML = `<option value="">Selecione um usuário</option>`;

    usuarios.forEach(u => {
        select.innerHTML += `<option value="${u.id}">${u.nome}</option>`;
    });
}

function atualizarSelectCursos() {
    let select = document.getElementById("selectCursoMatricula");

    select.innerHTML = `<option value="">Selecione um curso</option>`;

    cursos.forEach(c => {
        select.innerHTML += `<option value="${c.id}">${c.titulo}</option>`;
    });
}

function realizarMatricula() {

    let idUsuario = document.getElementById("selectUsuario").value;
    let idCurso = document.getElementById("selectCursoMatricula").value;

    if (idUsuario === "" || idCurso === "") {
        alert("Selecione usuário e curso!");
        return;
    }

    let matricula = new Matricula(
        Date.now(),
        idUsuario,
        idCurso,
        new Date().toLocaleDateString()
    );

    matriculas.push(matricula);

    listarMatriculas();
}

function listarMatriculas() {

    let lista = document.getElementById("listaMatriculas");

    lista.innerHTML = "";

    matriculas.forEach(m => {

        let usuario = usuarios.find(u => u.id == m.idUsuario);
        let curso = cursos.find(c => c.id == m.idCurso);

        lista.innerHTML += `
            <li class="list-group-item">
                ${usuario?.nome} matriculado em ${curso?.titulo}
                <br>
                <small>Data: ${m.data}</small>
            </li>
        `;
    });
}