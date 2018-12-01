const express = require('express');
const router = express.Router();
const DataService = require('../services/dataService');
const dataService = new DataService();

router.get('/tags', (req, res) => {
    dataService.getTags((err, data) => {
        if (err) {
            res.send({success: false, msg: err});
        } else {
            res.send(data);
        }
    })
});

module.exports = router;