var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("adminMiddleware");
    if(!req.cookies.token) {
        res.redirect('/');
    }
    next();
});

module.exports = router;
