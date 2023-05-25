import { listarSalas, buscarSala, atualizarMensagens, buscarMensagem } from "../models/salaModel";

async function get(req, res){
    return await listarSalas();
}

async function entrar(idUser,idsala){
    const sala = await buscarSala(idsala);
    let usuarioModel=require("../models/usuarioModel");
    let user=await usuarioModel.buscarUsuario(idUser);
    user.sala = {_id:sala._id, nome:sala.nome, tipo:sala.tipo};

    if(await usuarioModel.alterarUsuario(user)){
        return {msg:"OK", timestamp:timestamp=Date.now()};
    }
    return false;
}

async function enviarMensagem(nick, msg, idsala){
    const sala = await buscarSala(idsala);
    if(!sala.msgs){
        sala.msgs=[];
    }
    timestamp=Date.now();
    sala.msgs.push(
        {
            timestamp:timestamp,
            msg:msg,
            nick:nick
        }
    )
    let resp = await atualizarMensagens(sala);
    return {"msg":"OK", "timestamp":timestamp};
}

async function buscarMensagem(idsala, timestamp){
    let mensagens = await buscarMensagem(idsala, timestamp);
    return{
        "timestamp":mensagens[mensagens.lenght - 1].timestamp,
        "msgs": mensagens
    };
}

export default {get, entrar, enviarMensagem, buscarMensagem};