const prompt = require("prompt-sync")();
const fs = require('fs');

function loadDB() {
    try {
        const raw = fs.readFileSync("./bd.json", 'utf8');
        return JSON.parse(raw);
    } catch (err) {
        console.error('Erro ao ler bd.json:', err.message);
        return { 
            nome_praça: '', 
            pontos_bicicleta: [], 
            usuarios: [], 
            corridas: [] 
        };
    }
}
let db = loadDB();
// console.log(db["pontos_bicicleta"][0]["bicicletas"][3]["valor"]) // ex

// acessem o nome de primeiro usuario registrado
// acessem o "inicio" da primeira corrida registrada
// todas as bicicletas do pronto B
// tipo da bicicleta id 12

function saveDB(db) {
    try {
        fs.writeFileSync("./bd.json", JSON.stringify(db, null, 4), 'utf8');
        return true;
    } catch (err) {
        console.error('Erro ao salvar bd.json:', err.message);
        return false;
    }
}

db["usuarios"][1]["nome"] = "Isabela"; // atualiza
db["usuarios"].push({"id": 3,"nome": "Isaque"}); //adiciona
saveDB(db)

//adcionem uma nova bicicleta eletrica no ponto B
// alterem todas as bicicletas no ponto A para manual
// adicionem um novo usuario chamado Roberto
// adicionem uma nova corrida, com o usuario Roberto

// while (true) {
//     const escolha = prompt(`
// 0: Sair

// Escolha uma opção do menu
//     `);

//     if (escolha == "0") {
//         break;
//     } else {
//         continue;
//     }
// }



// function getNextId(name) {
//     const db = loadDB(); // objeto

//     const values = db.name || [];

//     let maxId = 0;
//     for (let i = 0; i < usuarios.length; i++) {
//         const u = usuarios[i];
//         if (typeof u.id === 'number' && u.id > maxId) {
//             maxId = u.id;
//         }
//     }
//     const newId = maxId !== 0 ? maxId + 1 : 1; // if one line
//     //condição (true ou false) ? valor se verdadeiro : valor se falso 

//     // if (maxId !== 0) {
//     //     const newId = maxId + 1
//     // } else {
//     //      const newId = 1
//     // }
// }

// function cadastrarUsuario(nome) {
    
// }