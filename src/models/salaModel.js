const { Timestamp } = require("mongodb");
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

let buscarMensagem = async (idsala, timestamp)=>{
    let sala = await buscarSala(idsala);
    if(sala.msgs){
        let msgs=[];
        sala.msgs.forEach((msg)=>{
            if(msg.timestamp>=timestamp){
                msgs.push(msg);
            }
        });
        return msgs;
    }
    return [];
}

module.exports = {listarSalas};


