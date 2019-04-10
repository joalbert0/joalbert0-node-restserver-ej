// ============================
//            puerto
// ============================

process.env.PORT = process.env.PORT || 3000;

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ============================
//      venc token
// ============================
//60 segs
//60 minutos
//24 horas
//30 dias
process.env.CADUCIDAD_TOKEN = '48h';

// ============================
//       seed de autent
// ============================
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo'


// ============================
//       base de datos
// ============================

let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
    console.log("desarollo");
} else {

    // urlDB = 'mongodb+srv://hayabusaryu:ivnOXwd2v0H4vNX1@cluster0-ittoy.mongodb.net/cafe';
    urlDB = process.env.MONGO_URI;
    console.log("produccion");

}

process.env.URLDB = urlDB;

// ============================
//       Google client ID
// ============================
process.env.CLIENT_ID = process.env.CLIENT_ID || '24875942171-01nq15o54skaodh5vqpodpf1e52hfju6.apps.googleusercontent.com';