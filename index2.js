// CRUD -> CREATE READ UPDATE    DELETE
// CRUD -> CRIAR  LER  ATUALIZAR APAGAR

// 1 - Criem os dados dentro do db2.json para salvar
// as informações do produto integrador de voces.
// Grupos -> nomes dos integrantes, nome do grupo, 
// praça selecionada e lista de materiais

// 2 - Criar a função loadDB para carregar o aquivo json em uma
// variavel e printar no console os dados do arquivo json

const prompt = require("prompt-sync")();
const fs = require('fs');

const loadDB = () => {
    try {
        let raw = fs.readFileSync("./db2.json", "utf8");
        return JSON.parse(raw);
    } catch (error) {
        return { grupos:[] }
    }
}
let db = loadDB();

// 3 - Criar a função saveDB para atualizar os dados do aquivo json 
// teste mudar algum valor, e verifique se o dado esta aparecendo
// no arquivo

// criar a funcao savedb
// atualizar algum dado
// chamar a funcao savedb