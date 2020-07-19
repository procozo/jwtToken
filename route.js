
var router = express.Router();
router.get('/home', function(req,res){
    res.send("hi")
})

module.exports = router;