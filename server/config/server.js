 const PORT = process.env.PORT || 5001
const connectToServer = (app)=>{
     return app.listen(PORT,err=>{
          if(!err){
              console.log(`Server Connected successfully :) ${PORT}`)
        }
          else{
              console.log(`Error occurred while connecting to the server `)
          }
    })
}
export default  connectToServer;