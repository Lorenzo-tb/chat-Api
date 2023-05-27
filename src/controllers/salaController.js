const salaModel = require("../models/salaModel");

exports.get= async()=>{
    return await salaModel.listarSalas();
}

exports.entrar = async (idUser, idSala)=>{
    console.log("teste");
    const sala = await salaModel.buscarSala(idSala);
    console.log(idSala);
    let usuarioModel=require("../models/usuarioModel");
    let user = await usuarioModel.buscarUsuario(idUser);
    console.log(user);

    user.sala = {_id:sala._id, nome:sala.nome, tipo:sala.tipo};

    
    if(await usuarioModel.alterarUsuario(user)){
        return {msg:"OK", timestamp:timestamp=Date.now()};
    }
    return false;
}

exports.enviarMensagem = async(nick, msg, idSala)=>{
    const sala = await salaModel.buscarSala(idSala);
    if(!sala.msgs){
        sala.msgs=[];
    }

    console.log(sala.msgs);

    timestamp=Date.now();

    const novaMensagem={
        "timestamp":timestamp,
        "msg":msg, 
        "nick": nick
    }
    
    sala.msgs.push(novaMensagem);
    console.log(sala.msgs);
    
    let resp = await salaModel.atualizarMensagens(sala, novaMensagem);

    return {"timestamp":timestamp, "msg":OK, "nick": nick};
}

exports.buscarMensagens = async (idSala, timestamp)=>{
    let mensagens = await salaModel.buscarMensagem(idSala, timestamp);
    return{
        "timestamp": mensagens[mensagens.lenght - 1],
        "msgs": mensagens
    };
}

exports.sair = async (idUser)=>{
    let usuarioModel=require("../models/usuarioModel");
    let user = await usuarioModel.buscarUsuario(idUser);

    console.log(user);
    user.sala = {_id:"", nome:"", tipo:""};

    console.log(user);

    if(await usuarioModel.alterarUsuario(user)){
        return {msg:"OK", timestamp:timestamp=Date.now()};
    }
    return false;
}

exports.criar = async (nome, tipo, chave)=>{
    const resp = await salaModel.criarSala(nome, tipo, chave);
    if(resp.insertedId){
        return {
            "_id" : resp.insertedId,
            "nome": nome,
            "tipo": tipo,
        }
    }
}