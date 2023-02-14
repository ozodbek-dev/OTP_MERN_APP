import mongoose from 'mongoose';
  async function connectToDb(){
      mongoose.set("strictQuery",true) ;
      let isConnected = false;

 return  mongoose.connect(process.env.MONGODB_URI, err=>{
     if(!err){
       console.log("mongodb Connected successfully ")
         isConnected=true
     }
     else{
       throw err
     }
  })

}

export default connectToDb;