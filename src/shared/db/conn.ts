import { MongoClient, Db } from "mongodb";

const connStr = process.env.MONGO_URI || 'mongodb+srv://system:GU9yZXXiyJeYidZN@octavioconlapochoclera.1bx6aqr.mongodb.net/'

const cli = new MongoClient(connStr)
await cli.connect()

export let db:Db=cli.db('tp-dsw')