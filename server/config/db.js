import mongoose from 'mongoose';
  async function connectToDb(){
      mongoose.set("strictQuery",true) ;
      let isConnected = false;

 return  mongoose.connect('mongodb+srv://Ozodbek-Bakhtiyorov:ozodbek%40dev2000@cluster0.oyttms2.mongodb.net/otp_auth', err=>{
     if(!err){
       console.log("mongodb Connected successfully")
         isConnected=true
     }
     else{
       throw err
     }
  })

}

export default connectToDb;