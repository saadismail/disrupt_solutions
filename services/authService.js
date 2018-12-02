const bcrypt = require('bcryptjs');

class AuthService {
    registerUser(user, callback) {
        this.isEmailExist(user.email, (err) => {
            if (err) {
                callback(err);
            } else {
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(user.password, salt, (err, hash) => {
                        if (err) {
                            callback(err);
                        }
                        user.password = hash;
                        
                        var sql = "INSERT INTO user (name, email, password, access_level) VALUES (?, ?, ?, ?)";
                        var values = [user.name, user.email, user.password, user.access_level];
                        
                        db.query(sql, values, (err, result) => {
                            if (err) {
                                callback(err);
                            } else {
                                callback(null);
                            }
                        });
                    })
                });
            }
        })
    }
    
    isEmailExist(email, callback) {
        var sql = "SELECT * FROM user WHERE email = ?";
        db.query(sql, [email], (err, result) => {
            if (err) {
                callback(err);
            } else {
                if (result.length != 0) {
                    callback("User already exists");
                } else {
                    callback(null);
                }
            }
        });
    }

    getUserByEmail(email, callback) {
        var sql = "SELECT * FROM user WHERE email = ?";
        db.query(sql, [email], (err, result) => {
            if (err) callback(err);
            else callback(null, JSON.parse(JSON.stringify(result[0])));
        })
    }

    comparePassword(password, hash, callback) {
        bcrypt.compare(password, hash, (err, isMatched) => {
            if (err) console.log(err);
            else callback(null, isMatched);
        });
    }
}

module.exports = AuthService;