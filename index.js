const prompt = require("prompt-sync")();
const fs = require('fs');
const path = require('path');

while (true) {
    const escolha = prompt(`
0: Sair

Escolha uma opção do menu
    `);

    if (escolha == "0") {
        break;
    } else {
        continue;
    }
}

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

function saveDB(db) {
    try {
        fs.writeFileSync("./bd.json", JSON.stringify(db, null, 4), 'utf8');
        return true;
    } catch (err) {
        console.error('Erro ao salvar bd.json:', err.message);
        return false;
    }
}

function getNextId(name) {
    const db = loadDB(); // objeto

    const values = db.name || [];

    let maxId = 0;
    for (let i = 0; i < usuarios.length; i++) {
        const u = usuarios[i];
        if (typeof u.id === 'number' && u.id > maxId) {
            maxId = u.id;
        }
    }
    const newId = maxId !== 0 ? maxId + 1 : 1; // if one line
    //condição (true ou false) ? valor se verdadeiro : valor se falso 

    // if (maxId !== 0) {
    //     const newId = maxId + 1
    // } else {
    //      const newId = 1
    // }
}

function cadastrarUsuario(nome) {
    
}