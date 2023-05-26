const db = require("./db");

async function registrarUsuario(nick){
    return await db.insertOne("usuario",{"nick":nick})
};

let buscarUsuario = async (idUser)=>{
    let user = await db.findOne("usuarios",idsala);
    return user;
};

let alterarUsuario = async (user)=>{
    return await db.updateOne("usuarios", user,{_id:user.id});
}

module.exports = {registrarUsuario};