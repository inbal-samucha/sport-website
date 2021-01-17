const mongodb = require('mongodb');
const bcrypt = require('bcryptjs');
const getDb = require('../util/database').getDb;

class User {
    constructor(fname, lname, gender, email, password){
        this.firstName = fname;
        this.lastName = lname;
        this.gender = gender;
        this.email = email;
        this.password = password;
    }

    save(){
        const db = getDb();
        return db.collection('users').insertOne(this);  
    }
 

    static fetchAll(){
        const db = getDb();
        return db.collection('users').find().toArray()
        .then(users =>{
            return users;
        })
        .catch(err =>{
            console.log(err);
        });
    }

    static findBySecurity(userEmail, userPassword, cb){

        const db = getDb();
        return db.collection('users')
        .findOne({email:userEmail})
        .then(user =>{
            if(user){
                bcrypt.compare(userPassword, user.password)
                .then(ifMatch =>{ 
                    if(ifMatch){
                        cb(user) ; 
                    }   
                    else {
                        cb();
                    } 
                })
                .catch(err => console.log(err));
            }
            else{
                cb(null);
            }
         })
        .catch(err =>console.log(err));
}


    static findById(userId){
        const db = getDb();
        return db.collection('users')
        .find({_id: new mongodb.ObjectID(userId)})
        .next()
        .then(user =>{
            return user;
        })
        .catch(err =>{
            console.log(err);
        });
    }

    static deleteById(userId){
        const db = getDb();
        return db.collection('users')
        .deleteOne({_id: new mongodb.ObjectId(userId)})
        .then(result => { console.log('Deleted user');})
        .catch(err =>{ console.log(err);});
    };  

}

module.exports = User;
