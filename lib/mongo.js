const { MongoClient, ObjectId } = require('mongodb');
const { config } = require('../config/index');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);

const DB_NAME = encodeURIComponent(config.dbName);

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${DB_NAME}?retryWrites=true&w=majority`; //esto ultimo se recomienda

class MongoLib {
    constructor() {
        this.client = new MongoClient(MONGO_URI, {useNewUrlParser: true});
        this.dbName = DB_NAME;
    }

    connect() {
        if (!MongoLib.connection) {
            MongoLib.connection = new Promise((resolve, reject) => {
                this.client.connect((err) => {
                    if (err)
                        reject(err);
                    
                    console.log("Connected to Mongo was succesfully")
                    resolve(this.client.db(this.dbName))
                })
            });
        }else {
            return MongoLib.connection;
        }
    }

    getAll(collection, query) {
        return this.connect().then( db => {
            return db.collection(collection).find(query).toArray();
        });
    }

    getOne(collection, id) {
        return this.connect().then( db => {
            return db.collection(collection).findOne({ _id: ObjectId(id)});
        });
    }

    create(collection, data){
        return this.connect().then( db => {
            return db.collection(collection).insertOne(data);
        }).then( res => res.insertedId);
    }

    update(collection, id , data) {
        return this.connect().then( db => {
            return db.collection(collection).updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true });
        }).then( res => res.upsertedId || id);
    }

    delete(collection, id) {
        return this.connect().then( db => {
            return db.collection(collection).deleteOne({ _id: ObjectId(id) });
        }).then(() => id);
    }
}

module.exports = MongoLib;