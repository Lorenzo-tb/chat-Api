import { insertOne, findOne, updateOne } from "./db";

async function registrarUsuario(nick){
    return await insertOne("usuario",{"nick":nick})
};

let buscarUsuario = async (idUser)=>{
    let user = await findOne("usuarios",idsala);
    return user;
};

let alterarUsuario = async (user)=>{
    return await updateOne("usuarios", user,{_id:user.id});
}

export default {registrarUsuario, buscarUsuario, alterarUsuario};