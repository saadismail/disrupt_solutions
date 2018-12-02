class DataService {
    getTags(limit, callback) {
        var sql = "SELECT * FROM tag LIMIT ?";
        db.query(sql, [limit], (err, result) => {
            if (err) callback(err);
            else callback(null, JSON.parse(JSON.stringify(result)));
        })
    }

    getQuestions(limit, callback) {
        var sql = "SELECT * FROM question ORDER BY id DESC LIMIT ?";
        db.query(sql, [limit], (err, result) => {
            if (err) callback(err);
            else callback(null, JSON.parse(JSON.stringify(result)));
        })
    }

    getQuestionsByTagId(tag_id, limit, callback) {
        var sql = "SELECT * FROM question_tag JOIN question ON question_tag.question_id = question.id WHERE question_tag.tag_id = ? LIMIT ?";
        db.query(sql, [tag_id, limit], (err, result) => {
            if (err) callback(err);
            else callback(null, JSON.parse(JSON.stringify(result)));
        })
    }

    getQuestionById(question_id, callback) {
        var sql = "SELECT question.*, user.name, user.email FROM question JOIN user on question.author_id = user.id WHERE question.id = ?";
        db.query(sql, [question_id], (err, result) => {
            if (err) callback(err);
            else callback(null, JSON.parse(JSON.stringify(result)));
        })
    }

    getTagsByQuestionId(question_id, callback) {
        var sql = "SELECT question_tag.tag_id, tag.name FROM question_tag JOIN tag ON tag.id = question_tag.tag_id WHERE question_id = ?";
        db.query(sql, [question_id], (err, result) => {
            if (err) callback(err);
            else callback(null, JSON.parse(JSON.stringify(result)));
        })
    }

    getAnswersByQuestionId(question_id, callback) {
        var sql = "SELECT answer.body, user.name from answer JOIN user ON user.id = answer.author_id WHERE question_id = ?";
        db.query(sql, [question_id], (err, result) => {
            if (err) callback(err);
            else callback(null, JSON.parse(JSON.stringify(result)));
        })
    }

    newQuestion(question, callback) {
        var sql = "INSERT INTO question (title, body, status, author_id) VALUES (?, ?, ?, ?)";
        var values = [question.title, question.body, question.status, question.author_id];
        
        db.query(sql, values, (err, result) => {
            if (err) {
                callback(err);
            } else {
                callback(null, result.insertId)
            }
        });
    }
}

module.exports = DataService;