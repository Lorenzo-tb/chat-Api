const salaModel = require("../models/salaModel");

exports.get=async()=>{
    return await salaModel.listarSalas();
}

exports.entrar = async (idUser,idsala)=>{
    const sala = await salaModel.buscarSala(idsala);
    let usuarioModel=require("../models/usuarioModel");
    let user=await usuarioModel.buscarUsuario(idUser);
    user.sala = {_id:sala._id, nome:sala.nome, tipo:sala.tipo};

    if(await usuarioModel.alterarUsuario(user)){
        return {msg:"OK", timestamp:timestamp=Date.now()};
    }
    return false;
}

exports.enviarMensagem = async(nick, msg, idsala)=>{
    const sala = await salaModel.buscarSala(idsala);
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
    let resp = await salaModel.atualizarMensagens(sala);
    return {"msg":"OK", "timestamp":timestamp};
}

exports.buscarMensagem = async (idsala, timestamp)=>{
    let mensagens = await salaModel.buscarMensagem(idsala, timestamp);
    return{
        "timestamp":mensagens[mensagens.lenght - 1].timestamp,
        "msgs": mensagens
    };
}