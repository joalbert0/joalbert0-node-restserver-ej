// ============================
//            puerto
// ============================

process.env.PORT = process.env.PORT || 3000;

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
// ============================
//       base de datos
// ============================

let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
    console.log("desarollo");
} else {

    urlDB = 'mongodb+srv://hayabusaryu:ivnOXwd2v0H4vNX1@cluster0-ittoy.mongodb.net/cafe';

    console.log("produccion");

}

process.env.URLDB = urlDB;