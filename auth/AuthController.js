var express = require("express");
var authRouter = express.Router();

var jwt = require("jsonwebtoken");
var cryptoJs = require("bcryptjs");
var config = require("../config");
const bodyParser = require("body-parser");
var User = require("../user/User");
authRouter.use(bodyParser.json());
var dbhelper = require('./dbHelper')
var verifyJwtToken = require("./VerifyToken");
const { use } = require("../app");
authRouter.post("/register", function (req, res) {
  console.log(req.body);
  var hashedpassword = cryptoJs.hashSync(req.body.password, 8);
  try {
      dbhelper.checkDBStatus();
        User.create(
          {
            email: req.body.email,
            password: hashedpassword,
            timeStamp:Date.now()
          },
          function (err, user) {
            if (err) {
              console.log(err);
              return res.status(500).send({
                statusCode: 500,
                message: "Internal server error",
              });
            } else {
            const token = jwt.sign({id: user._id}, config.secret,{
                expiresIn: config.tokenLife
            })
            let dataResult  = {}
            dataResult.value = user
             dataResult.token = token
              res.status(200).send({ message: "success", result: dataResult });
            }
          }
        );
  } catch (e) {
    console.log(e);
    // res.status(200).send({message:"success", result:user})
  }



});

authRouter.post("/login",async function(req,res){
    try{
        dbhelper.checkDBStatus();
        User.findOne({email:req.body.email},function(err,user){
            if(err) return res.status(500).send({
                message:"error"
            })
            if(!user) return res.status(200).send({
                message:"user not found"
            })
            var isValidPassword = cryptoJs.compareSync(req.body.password , user.password)
            if(!isValidPassword) return res.status(401).send({message:"oops not valid password or username"});

            // res.send(isValidPassword)
            const token = jwt.sign({id: user._id}, config.secret,{
                expiresIn: config.tokenLife
            })
            let dataResult  = {}
             dataResult.token = token
            res.status(200).send({
                statusCode:200,
                message:"Logged in succesfully",
                resut:dataResult
            })
        })
    }catch(e){

    }
})

authRouter.get('/validate', verifyJwtToken, function(req,res){
    // console.log(req.headers['auth-header'])
    try{
        dbhelper.checkDBStatus();
        console.log(req.userId)
        User.findById(req.userId,{password : 0 , timeStamp : 0}, function(err,user){
            if(err) return res.status(500).send({
                statusCode: 500,
                message: "Internal server error",
              });
            if(!user)  return res.status(200).send({
                statusCode: 404,
                message: "user Not found",
              });
            res.status(200).send(user) 
        })
    }catch(e){

    }
  })


module.exports = authRouter;
