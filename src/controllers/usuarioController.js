const token = require("../util/token").default;
const usuarioModel = require("../models/usuarioModel").default;

exports.entrar=async(nick)=>{
    const resp = await usuarioModel.registrarUsuario(nick);
    if(resp.insertedId){
        return {
            "idUser" : resp.isertedId,
            "token" : await token.setToken(JSON.stringify(resp.insertedId).replace(/"/g, ''),nick),
            "nick" : nick
        }
    }
}