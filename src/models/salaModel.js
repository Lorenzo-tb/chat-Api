import { Timestamp } from "mongodb";
import { findAll, findOne, updateOne } from "./db";

async function listarSalas(){
    let salas = findAll("salas");  
}

async function buscarSala(idsala) {
    return findOne("salas", idsala);
}

async function atualizarMensagens(sala) {
    return await updateOne("salas", sala, { _id: sala.id });
}

async function buscarMensagem(idsala, timestamp) {
    let sala = await buscarSala(idsala);
    if (sala.msgs) {
        let msgs = [];
        sala.msgs.forEach((msg) => {
            if (msg.timestamp >= timestamp) {
                msgs.push(msg);
            }
        });
        return msgs;
    }
    return [];
}

export default {listarSalas, buscarSala, atualizarMensagens, buscarMensagem};


