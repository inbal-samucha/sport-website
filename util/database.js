const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;

let db;

const mongoConnect = (callback) =>{
    mongoClient.connect('mongodb+srv://inbal_sam:is9792845@cluster0.qnl2e.mongodb.net/sport?retryWrites=true&w=majority', {useUnifiedTopology: true})
    .then(client => {
        console.log('Connected');
        db = client.db();
        callback();
    })
    .catch(err =>{
        console.log(err);
        throw err;
    }); 
};

const getDb = () =>{
    if(db){
        return db;
    }
    throw 'No database found';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
