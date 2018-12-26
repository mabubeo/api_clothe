var express = require('express');
var router = express.Router();
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'tungnguyen123',
    database: 'clothes'
});

/* GET users listing. */
router.get('/', function (req, res, next) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'tungnguyen123',
        database: 'android002'
    })

    connection.query("SELECT * FROM user", (err, row, field) => {
        console.log(err)
        console.log(field)
        res.json(row);

    })
    //Ket qua cua viec request tren may cua
});

/*router.get('/login',function (req,res,next) {
    console.log(req.headers)
    //const cnnQuery = 'Select * from user where phone_number = ' + "'" + '?' + "'";
    const  cnnQuery = 'Select * from user where phone_number = ?';
    var result;
        connection.query(cnnQuery, req.query.phone_number , function (err, rows) {
        if(err){
            result = {
                status: 0,
                code: 2,
                msg: "Truy van loi",
                data: []
            };
        }else{
            console.log(rows)
            console.log(rows.length)
            if(rows.length > 0 && rows != null){
                result = {
                    status: 1,
                    code: 1,
                    msg: "Thanh cong",
                    data: {
                        "id": rows[0].id,
                        "phone_number": rows[0].phone_number,
                        "token": rows[0].token,
                        "id_account": rows[0].id_account,
                        "name": rows[0].name,
                        "password": rows[0].password,
                        "address": rows[0].address
                    }
                };
            }
        }
        res.json(result);
    })
});*/

router.get('/login', function (req, res, next) {
    const cnnQuery = 'Select * from user where user_name = ? and password = ?';
    var result;
    connection.query(cnnQuery, [req.query.user_name, req.query.password], function (err, rows) {
        if (err) {
            console.log(err)
            result = {
                status: 0,
                message: "Truy vấn lỗi",
                data: []
            };
        } else {
            if (rows.length > 0 && rows != null) {
                result = {
                    status: 1,
                    message: "Thành công",
                    data: {
                        "id": rows[0].id,
                        "user_name": rows[0].user_name
                    }
                };
            } else {
                result = {
                    status: 0,
                    message: "Tài khoản hoặc mật khẩu không đúng",
                    data: []
                }
            }
        }
        res.json(result);
    })
});


router.post('/register', function (req, res, next) {
    const queryCheckUser = 'Select * from user where user_name = ?';
    const cnnQuery = 'INSERT INTO user (`user_name`, `password`) VALUES (?, ?) ';
    var result;
    connection.query(queryCheckUser, [req.query.user_name], function (err, rows) {
        if (err) {
            result = {
                status: 0,
                message: "Truy vấn lỗi",
                data: []
            };
        } else {
            if (rows.length > 0 && rows != null) {
                result = {
                    status: 0,
                    message: "Tài khoản đã tồn tại. ",
                    data: []
                };
            } else {
                connection.query(cnnQuery, [req.query.user_name, req.query.password], function (err1, rows1) {
                })
                result = {
                    status: 1,
                    message: "Đăng kí thành công",
                    data: []
                };
            }
        }
        res.json(result);
    })
});

router.get('/products', function (req, res, next) {
    const cnnQuery = 'Select * from products';
    var result;
    connection.query(cnnQuery, null, function (err, rows) {
        if (err) {
            result = {
                status: 0,
                message: "Truy vấn lỗi",
                data: []
            };
        } else {
            result = {
                status: 1,
                message: "Thành công",
                data: rows
            };
        }
        res.json(result);
    })
})

router.get('/detailProduct', function (req, res, next) {
    const cnnQuery = 'Select * from products where product_id = ?';
    var result;
    connection.query(cnnQuery, [req.query.product_id], function (err, rows) {
        if (err) {
            result = {
                status: 0,
                message: "Thất bại",
                data: []
            };
        } else {
            if (rows.length > 0 && rows != null) {
                result = {
                    status: 1,
                    message: "Thành công",
                    data: rows
                };
            } else {
                result = {
                    status: 1,
                    message: "Mã sản phẩm không hợp lệ",
                    data: []
                };
            }
        }
        res.json(result);
    })

})

module.exports = router;
