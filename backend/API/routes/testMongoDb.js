const express = require('express')
var router = express.Router();

const Products = require('../mongo-db/index');

router.get('/', (req, res) => {
    
    res.send(Products);

});

module.exports = router;