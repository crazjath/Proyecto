var express = require('express');
var router = express.Router();
var {client, dbName} = require('../db/mongo');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/insertar', function(req, res, next) {
  insertDatos(req.body);
  res.status(200);
});


async function insertDatos(datos) {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('alumnos');
  await collection.insertOne({
    nombre:datos.nombre,
    edad:datos.edad
  });

}

module.exports = router;
