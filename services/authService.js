class AuthService {

    registerUser(user, callback) {        
        this.isEmailExist(user.email, (emailExists) => {
            if (emailExists) {
                console.log("email exists");
                callback("User already exists or problems accessing database");
            } else {
                var sql = "INSERT INTO user (f_name, l_name, email, password, access_level) VALUES (?, ?, ?, ?, ?)";
                var values = [user.f_name, user.l_name, user.email, user.password, user.access_level];
                
                db.query(sql, values, (err, result) => {
                    if (err) {
                        callback(err);
                    } else {
                        callback(null);
                    }
                });
            }
        })
    }
    
    isEmailExist(email, callback) {
        var sql = "SELECT * FROM user WHERE email = ?";
        db.query(sql, [email], (err, result, fields) => {
            callback(err || result.length != 0); // Return true DB returned error or result not empty
        });
    }
}

module.exports = AuthService;