const fs = require('fs');
const path = require('path');
const prompt = require('prompt-sync')();

const dbPath = path.join(__dirname, 'bd.json');

function loadDB() {
    try {
        const raw = fs.readFileSync(dbPath, 'utf8');
        return JSON.parse(raw);
    } catch (err) {
        console.error('Erro ao ler bd.json:', err.message);
        return { nome_praça: '', pontos_bicicleta: [], usuarios: [], corridas: [] };
    }
}

function saveDB(db) {
    try {
        fs.writeFileSync(dbPath, JSON.stringify(db, null, 4), 'utf8');
        return true;
    } catch (err) {
        console.error('Erro ao salvar bd.json:', err.message);
        return false;
    }
}

function addUsuario(nome) {
    const db = loadDB();
    const usuarios = db.usuarios || [];
    // encontra o maior id usando um loop para maior clareza para iniciantes
    let maxId = 0;
    for (let i = 0; i < usuarios.length; i++) {
        const u = usuarios[i];
        if (typeof u.id === 'number' && u.id > maxId) {
            maxId = u.id;
        }
    }
    const newId = maxId ? maxId + 1 : 1;
    const usuario = { id: newId, nome };
    db.usuarios = db.usuarios || [];
    db.usuarios.push(usuario);
    saveDB(db);
    return usuario;
}

function addCorrida({ id_usuario, id_bicicleta, id_ponto_partida, id_ponto_chegada, inicio, duracao }) {
    const db = loadDB();
    db.corridas = db.corridas || [];
    const corrida = { id_usuario, id_bicicleta, id_ponto_partida, id_ponto_chegada, inicio, duracao };
    db.corridas.push(corrida);
    saveDB(db);
    return corrida;
}

function listarBicicletasPorTipo(tipo) {
    const db = loadDB();
    const resultado = [];
    (db.pontos_bicicleta || []).forEach(ponto => {
        (ponto.bicicletas || []).forEach(b => {
            if (b.tipo === tipo) {
                resultado.push(Object.assign({ ponto_id: ponto.id, ponto_local: ponto.local }, b));
            }
        });
    });
    return resultado;
}

// Exemplos de uso simples (menu mínimo)
function mostrarMenu() {
    console.log('\nMenu:');
    console.log('1) Listar bicicletas eletricas');
    console.log('2) Adicionar usuario de exemplo');
    console.log('3) Adicionar corrida de exemplo');
    console.log('0) Sair');
}

while (true) {
    mostrarMenu();
    const escolha = prompt('Escolha uma opcao: ');
    if (escolha === '0') break;
    if (escolha === '1') {
        const eletricas = listarBicicletasPorTipo('eletrica');
        console.log('Bicicletas eletricas encontradas:', eletricas);
        continue;
    }
    if (escolha === '2') {
        const nome = prompt('Nome do novo usuario: ');
        const u = addUsuario(nome || 'usuario_teste');
        console.log('Usuario criado:', u);
        continue;
    }
    if (escolha === '3') {
        // adiciona uma corrida de exemplo com dados simples (sem validações profundas)
        const db = loadDB();
        const id_usuario = (db.usuarios && db.usuarios[0] && db.usuarios[0].id) || 1;
        const id_bicicleta = (db.pontos_bicicleta && db.pontos_bicicleta[0] && db.pontos_bicicleta[0].bicicletas[0].id) || 1;
        const corrida = addCorrida({
            id_usuario,
            id_bicicleta,
            id_ponto_partida: 1,
            id_ponto_chegada: 2,
            inicio: new Date().toLocaleString('pt-BR'),
            duracao: '00:05:00'
        });
        console.log('Corrida adicionada:', corrida);
        continue;
    }
    console.log('Opcao invalida. Tente novamente.');
}