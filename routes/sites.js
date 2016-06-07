var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/list', function(req, res, next) {
    res.render('sites/list');
});

router.get('/create', function(req, res, next) {
    res.render('sites/create');
});

router.get('/update', function(req, res, next) {
    res.render('sites/update');
});

module.exports = router;
