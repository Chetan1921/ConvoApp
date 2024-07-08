const express=require('express');
const multer=require('multer')
const docxTopdf = require('docx-pdf');
const cors=require('cors')
const app=express();
const path=require('path');
const port=3000;
app.use(cors())

// settinfg up storage 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
      
      cb(null, file.originalname);
    }
  })
  
  const upload = multer({ storage: storage })

  app.post('/convertFile', upload.single('file'), (req, res, next) =>{
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
     
     

     try{
        if(!req.file)
            {
               return res.status(400).json({
                   message:"no file uploaded",
               });
            }
   // defining output path
            let outputPath=path.join(__dirname,"files",`${req.file.originalname}.pdf`)

        docxTopdf(req.file.path,outputPath,(err,result)=>{
            if(err){
              console.log(err);
              return res.status(400).json({
                message:"Error converting docx to pdf",
              })
            }
            res.download(outputPath,()=>{
                console.log("file downloaded");
            })
            
          });

     }
     catch(error)
     {
        console.log(error);
          res.status(400).json({
            message:"Internal server error",
          })

     }
  })


app.listen(port,()=>{
    console.log("server is started on port",port);
})