const express = require('express');
const router = express.Router();
const DataService = require('../services/dataService');
const dataService = new DataService();

router.get('/tags', (req, res) => {
    limit = (req.query.limit != undefined) ? parseInt(req.query.limit) : 10;

    dataService.getTags(limit, (err, data) => {
        if (err) {
            res.send({success: false, msg: err});
        } else {
            res.send(data);
        }
    })
});

router.get('/questions', (req, res) => {
    limit = (req.query.limit != undefined) ? parseInt(req.query.limit) : 10;

    dataService.getQuestions(limit, (err, data) => {
        if (err) {
            res.send({success: false, msg: err});
        } else {
            res.send(data);
        }
    })
});

router.get('/tag/:tag_id', (req, res) => {
    tag_id = (req.params.tag_id != undefined) ? parseInt(req.params.tag_id) : 1;
    limit = (req.query.limit != undefined) ? parseInt(req.query.limit) : 10;

    dataService.getQuestionsByTagId(tag_id, limit, (err, data) => {
        if (err) {
            res.send({success: false, msg: err});
        } else {
            res.send(data);
        }
    })
})

router.get('/question/:question_id', (req, res) => {
    question_id = (req.params.question_id != undefined) ? parseInt(req.params.question_id) : 1;

    dataService.getQuestionById(question_id, (err, data) => {
        if (err) {
            res.send({success: false, msg: err});
        } else {
            res.send(data);
        }
    })
})

router.get('/tags/:question_id', (req, res) => {
    question_id = (req.params.question_id != undefined) ? parseInt(req.params.question_id) : 1;

    dataService.getTagsByQuestionId(question_id, (err, data) => {
        if (err) {
            res.send({success: false, msg: err});
        } else {
            res.send(data);
        }
    })
})

router.get('/answers/:question_id', (req, res) => {
    question_id = (req.params.question_id != undefined) ? parseInt(req.params.question_id) : 1;

    dataService.getAnswersByQuestionId(question_id, (err, data) => {
        if (err) {
            res.send({success: false, msg: err});
        } else {
            res.send(data);
        }
    })
})

router.post('/new-question', (req, res) => {
    let question = {
        "title": req.body.title,
        "body": req.body.body,
        "status": req.body.status,
        "author_id": req.body.author_id,
        "tags": req.body.tags
    }

    dataService.newQuestion(question, (err, question_id) => {
        if (err) {
            res.json({
                success: false,
                msg: err
            })
        } else {
            res.json({
                success: true,
                msg: 'Question added successfully.',
                question_id: question_id
            })
        }
    });
});

module.exports = router;