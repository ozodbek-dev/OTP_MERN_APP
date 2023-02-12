
const connectToServer = (app)=>{
     return app.listen(5000,err=>{
          if(!err){
              console.log(`Server Connected successfully :)`)
        }
          else{
              console.log(`Error occurred while connecting to the server `)
          }
    })
}
export default  connectToServer;