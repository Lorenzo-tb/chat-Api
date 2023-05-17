const db = require("./db");

function listarSalas(){
    let salas = db.findAll("salas");  
}

let buscarSala = async (idsala)=>{
    return db.findOne("salas",idsala);
}

let atualizarMensagens = async (sala)=>{
    return await db.updateOne("salas", sala,{_id:sala.id});
}

module.exports = {listarSalas};


