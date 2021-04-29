

module.exports = app => {

    app.use((req, res, next) =>{
    
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
      )
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept , X-Auth-Token,authorization");
      if(req.method==='OPTIONS'){
        res.header(
          "Access-Control-Allow-Methods",
          "GET, POST, OPTIONS, PUT, PATCH, DELETE"
        )
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept ,X-Auth-Token,authorization");
        return res.status(200).json({});
  
      }
      next();
     });
  
    
    const fileUpload = require("../controller/Upload");    
  
    app.post("/create", fileUpload.fileRead);      
  
  
      };
  