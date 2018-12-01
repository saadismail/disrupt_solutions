class DataService {
    getTags(callback) {
        var sql = "SELECT * FROM tag";
        db.query(sql, (err, result) => {
            if (err) callback(err);
            else callback(null, JSON.parse(JSON.stringify(result)));
        })
    }
}

module.exports = DataService;