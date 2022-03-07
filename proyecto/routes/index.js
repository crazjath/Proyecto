var express = require('express');
const async = require('hbs/lib/async');
var router = express.Router();
var {client, dbName} = require('../db/mongo');

/* GET home page. */
router.get('/', function(req, res, next) {
  mostrarDatos()
    .then((elementos)=>{
      console.log(elementos);
      res.render('index', { data:elementos});
    })
    .catch((err)=>{
      console.log(err);
    });
});

async function mostrarDatos(){
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection('alumnos');
  let datos = await collection.find().toArray();
  return datos;
};

router.post('/insertar', function(req, res, next) {
  insertDatos(req.body);
  res.redirect('/');
});


async function insertDatos(datos) {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('alumnos');
  await collection.insertOne({
    nombre:datos.nombre,
    edad:datos.edad,
    email:datos.email
  });

}

module.exports = router;
