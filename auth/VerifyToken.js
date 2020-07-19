var jwt = require('jsonwebtoken');
var config = require('../config');



   function verifyJwtToken (req,res,next){
        var token = req.headers["auth-header"];
        console.log(token)
        if(!token) return res.status(403).send({auth:false,messaeg:"oops your token needed to validate you"});
    
        jwt.verify(token,config.secret, function(err, decoded){
            if(err) return res.status(401).send({
                auth:false,
                message:"failed to validate your auth token",
                statusCode:401
            });
    
            req.userId = decoded.id;
            next();
        })
    }
    
module.exports = verifyJwtToken
