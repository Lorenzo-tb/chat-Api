var express = require("express");
var app = express();
app.use(express.urlencoded({extended : true}));
app.use(express.json());

const salaController = require("./controllers/salaController");
const TokenExpiredError = require("./util/token");

const router = express.Router();
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
    console.log(req.headers.token);
    console.log(req.headers.iduser);
    console.log(req.headers.nick);
    if(await TokenExpiredError.checkToken(req.headers.token,req.headers.iduser,req.headers.nick)){
        let resp=await salaController.get();
        res.status(200).send(resp);
    }else{
        res.status(400).send({msg:"usuario nao autorizado"});
    }    
    
}));

app.use("/entrar", router.post("/entrar", async(req, res, next)=>{
    const usuarioController = require("./controllers/usuarioController");
    let resp = await usuarioController.entrar(req.body.nick);
    res.status(200).send(resp);
}));

app.use("/sala/entrar", router.put("/sala/entrar", async (req, res, next)=>{
    console.log(req.headers.token);
    console.log(req.headers.iduser);
    console.log(req.headers.nick);
    if(!TokenExpiredError.checkToken(req.headers.token,req.headers.iduser,req.headers.nick)){
        return false;
    }
    
    let resp = await salaController.entrar(req.headers.iduser, req.query.idSala);
    res.status(200).send(resp);
}));

app.use("/sala/mensagem", router.post("/sala/mensagem", async (req, res, next)=>{
    if(!TokenExpiredError.checkToken(req.headers.token,req.headers.iduser,req.headers.nick)){
        return false;
    }
    let resp = await salaController.enviarMensagem(req.headers.nick, req.body.msg, req.body.idSala);
    res.status(200).send(resp);
}));

app.use("/sala/mensagens", router.get("/sala/mensagens", async (req, res, next)=>{
    if(!TokenExpiredError.checkToken(req.headers.token,req.headers.iduser,req.headers.nick)){
        return false;
    }
    let resp = await salaController.buscarMensagens(req.query.idSala, req.query.timestamp);
    res.status(200).send(resp);

}));

app.use("/sala/sair", router.put("/sala/sair", async (req, res, next)=>{
    if(!TokenExpiredError.checkToken(req.headers.token,req.headers.iduser,req.headers.nick)){
        return false;
    }
    let resp = await salaController.sair(req.headers.iduser);
    res.status(200).send(resp);
}));

app.use("/sala/criar", router.post("/sala/criar", async(req, res, next)=>{
    if(!TokenExpiredError.checkToken(req.headers.token,req.headers.iduser,req.headers.nick)){
        return false;
    }
    let resp = await salaController.criar(req.body.nome, req.body.tipo, req.body.chave);
    res.status(200).send(resp);
}));


module.exports=app;