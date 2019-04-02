// ============================
//            puerto
// ============================

process.env.PORT = process.env.PORT || 3000;

// ============================
//       base de datos
// ============================

let urlDB;
if (process.env.NODE_ENV !== 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {

    urlDB = 'mongodb+srv://hayabusaryu:ivnOXwd2v0H4vNX1@cluster0-ittoy.mongodb.net/cafe';



}

process.env.URLDB = urlDB;