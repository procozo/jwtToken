
var mongoose = require("mongoose");
module.exports = {
    checkDBStatus : () =>{
        mongoose.connect(
            "mongodb+srv://hrcloud:hr@123@cluster0.icwl5.mongodb.net/hrcloud?retryWrites=true&w=majority",
            { useNewUrlParser: true, useUnifiedTopology: true },
            function (err, db) {
              if (err) return false
              return true
            });
    },
 


}
