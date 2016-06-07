var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/list', function(req, res, next) {
    res.render('communities/list');
});

router.get('/create', function(req, res, next) {
    res.render('communities/create');
});

router.get('/update', function(req, res, next) {
    res.render('communities/update');
});

module.exports = router;
