const mysql = require('mysql');

const conexao = mysql.createConnection({
  host: '192.168.0.107',
  port: 3306,
  user: 'root',
  password: '1122',
  database: 'apibd'
  
});

conexao.connect((err) => {
  if (err) {
    console.error('Erro ao conectar com o MySQL: ', err);
  } else {
    console.log('Conexão estabelecida com o MySQL!');
  }
});

module.exports = conexao;

var connection = mysql.createConnection(mysql);
var del = connection._protocol._delegateError;
connection._protocol._delegateError = function(err, sequence){
  if (err.fatal) {
    console.trace('fatal error: ' + err.message);
  }
  return del.call(this, err, sequence);
};
