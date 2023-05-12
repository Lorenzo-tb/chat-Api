const db = require("./db");

function listarSalas(){
    return db.findAll("salas"),
        {
            "_id":{
                "$oid": "skdfv23inevfpf76vinirefo10"
            },
            "nome": "Guerreiros da Info 63 (melhor info)",
            "tipo": "publica"
        },
        {
            "_id":{
                "$oid": "skdfv23inevfpf76vinirefo12"
            },
            "nome": "Fracassados da Info 63 AB (pior info)",
            "tipo": "publica"
        },
        {
            "_id":{
                "$oid": "skdfv23inevfpf76vinirefo15"
            },
            "nome": "alguma sala privada",
            "tipo": "privada",
            "chave": "melhorInfo=63SemLetra"
        }
}

module.exports = {listarSalas};


