import express, { urlencoded, json, Router } from "express";
var app = express();
app.use(urlencoded({extended : true}));
app.use(json());

const router = Router();
app.use('/', router.get('/',(req, res)=>{
    res.status(200).send("<h1>API - CHAT</h1>")
}));

app.use("/sobre",router.get("/sobre",(req, res, next)=>{
    res.status(200).send({
        "nome":"API-CHAT",
        "versao":"0.1.0",
        "autor":"Lorenzo Teixeira Bolfe"
    })
}));

app.use("/salas", router.get("/salas",async(req, res, next)=>{
    if(await TokenExpiredError.checkToken(req.headers.token,req.headers.idUser,req.headers.nick)){
        let resp=await salaController.get();
        res.status(200).send(resp);
    }else{
        res.status(400).send({msg:"usuario nao autorizado"});
    }    
    
}));

app.use("/entrar", router.post("/entrar", async(req, res, next)=>{
    const usuarioController = require("./controllers/usuarioController");
    let resp = await usuarioController.entrar(req,body,nick);
    res.status(200).send(resp);
}));

app.use("/sala/entrar", router.put("/sala/entrar", async (req, res)=>{
    if(!token.checkToken(req.headers.token,req.headers.idUser,req.headers.nick)){
        return false;
    }
    let resp = await salaController.entrar(req.headers.idUser, req.query.idsala);
    res.status(200).send(resp);
}));

app.use("/sala/mensagem", router.post("sala/mensagem", async (req, res)=>{
    if(!token.checkToken(req.headers.token,req.headers.idUser,req.headers.nick)){
        return false;
    }
    let resp = await salaController.enviarMensagem(req.headers.nick, req.body.msg, req.body.idsala);
    res.status(200).send(resp);
}))


export default app;