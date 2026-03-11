const fs = require("fs");

function logMensaje() {

  let salida = new Date().toISOString() ;

  for (let parametro of arguments){
    salida += " - " + parametro;
  }

  console.log(salida);

  fs.appendFileSync("app.log", salida + "\n");
}

function logErrorSQL(err){
  console.error('Error de MySQL:');
  console.error('Code:', err.code);
  console.error('Errno:', err.errno);
  console.error('SQL Message:', err.sqlMessage);
  console.error('SQL State:', err.sqlState);
}

module.exports = { logMensaje, logErrorSQL };