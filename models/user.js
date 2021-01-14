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
            // console.log(users);
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
                    // console.log(ifMatch);
                    // console.log(user);
                    if(ifMatch){
                        // console.log(user);
                        
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
            // console.log(user);
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
// const fs = require('fs');
// const path = require('path');

// const p = path.join(path.dirname(process.mainModule.filename), 
//         'data', 
//         'users.json'
//         );

// module.exports = class User {
//     constructor(fname, lname, gender){
//         this.firstName = fname;
//         this.lastName = lname;
//         this.gender = gender;
//     }

//     save(){
//         fs.readFile(p, (err, fileContent) =>{
//             let users = [];
//             if(!err){
//                 users = JSON.parse(fileContent);
//             }
//             users.push(this);
//             fs.writeFile(p, JSON.stringify(users), (err) =>{
//                 console.log(err);
//             });
//         });
//     }
//     static fatchAll(cb){
//         let users =[];
//         users =fs.readFile(p, (err, fileContent) =>{
//             if(err){
//                 cb([]);
//             }
//             users = JSON.parse(fileContent);
//             cb(users);
//         });  
//     }
// }
