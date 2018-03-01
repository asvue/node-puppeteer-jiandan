var mysql = require("mysql");

var option = {
     host: 'localhost',
    user: 'root',//数据库用户名
    password: '',//数据库密码
    database: 'weal',//数据库名
    port: 3306,//数据库服务器端口
};

function _exec(sqls,values,after) {
    var client = mysql.createConnection(option);

    client.connect(function(err){
        if (err) {
            console.log(err);
            return;
        }

        client.query(sqls || '', values || [],function(err,r){
            after(err,r);
        });
        client.end();

    });
    client.on('error',function(err) {
        if (err.errno != 'ECONNRESET') {
            after("err01",false);
            throw err;
        } else {
            after("err02",false);
        }
    });
}
exports.exec = _exec;