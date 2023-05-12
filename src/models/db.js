const {MongoClient, ObjectId} = require("mongodb");

let singleton;

async function connect(){
    if(singleton) return singleton;

    const client = new MongoClient(process.env.DB_HOST);
    await client.connect();

    singleton = client.db(process.env.DB_DATABASE);
    return singleton;
}

async function findAll(){
    const db = await connect();
    return db.collection(collection).findAll().toArray();
}

async function insertOne(colletcion, objeto){
    const db = await connect();
    return db.collection(colletcion).insertOne(objeto);
}

module.exports = {findAll};