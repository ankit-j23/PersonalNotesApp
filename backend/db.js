const mongoose = require ('mongoose')

const mongoURI = "mongodb://localhost:27017/inotebook"

// const connectToMongo = ()=> {
//     mongoose.connect(mongoURI, ()=>{
//         console.log("Connected to mongo Successfully");
//     })
// }

const connectToMongo = async () => {
    mongoose.connect(mongoURI, await console.log("Connected to mongo Successfully")
       );
   }

module.exports  = connectToMongo