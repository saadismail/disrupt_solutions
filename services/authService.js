const bcrypt = require('bcryptjs');

class AuthService {
    registerUser(user, callback) {
        this.isEmailExist(user.email, (emailExists) => {
            if (emailExists) {
                callback("User already exists or problems accessing database");
            } else {
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(user.password, salt, (err, hash) => {
                        if (err) {
                            callback(err);
                        }
                        user.password = hash;
                        
                        var sql = "INSERT INTO user (f_name, l_name, email, password, access_level) VALUES (?, ?, ?, ?, ?)";
                        var values = [user.f_name, user.l_name, user.email, user.password, user.access_level];
                        
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
            callback(err || result.length != 0); // Return true DB returned error or result not empty
        });
    }

    getUserByEmail(email, callback) {
        var sql = "SELECT * FROM user WHERE email = ?";
        db.query(sql, [email], (err, result) => {
            if (err) callback(err);

            callback(null, JSON.parse(JSON.stringify(result[0])));
        })
    }

    comparePassword(password, hash, callback) {
        bcrypt.compare(password, hash, (err, isMatched) => {
            if (err) {
                console.log(err);
            }
            
            callback(null, isMatched);
        });
    }
}

module.exports = AuthService;