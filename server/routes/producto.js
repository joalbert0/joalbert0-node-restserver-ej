const express = require('express');
const { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');

let app = express();
let Producto = require('../models/producto');

//----------------obtener productos
//trae todos los productos
//populate: usuario categoria
//paginado
app.get('/producto', verificaToken, (req, res) => {
    let desde = req.query.desde || 0;
    desde = Number(desde);
    let limite = req.query.limite || 5;
    limite = Number(limite);
    Producto.find({ disponible: true })
        .skip(desde)
        .limit(limite)
        .sort('nombre')
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descrpcion')
        .exec((err, productos) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                productos
            });
        })
});
//------------------------producto por id

app.get('/producto/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    Producto.findById(id)
        .populate('usuario,', 'nombre email')
        .populate('categoria', 'nombre')
        .exec((err, productoDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            if (!productoDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'El ID no es correcto'
                    }
                });
            }
            res.json({
                ok: true,
                producto: productoDB
            });
        });
});

//------------------------Buscar productos
app.get('/producto/buscar/:termino', verificaToken, (req, res) => {

    let termino = req.params.termino;
    let regex = new RegExp(termino, 'i');
    Producto.find({ nombre: regex })
        .populate('categoria', 'nombre')
        .exec((err, productos) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });

            }


            res.json({
                ok: true,
                productos
            })
        })


})
















//------------------------crear un producto
//grabar un usuario
//grabar una categoria del listado



app.post('/producto', verificaToken, (req, res) => {
    let body = req.body;

    let producto = new Producto({
        usuario: req.usuario._id,
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria

    });
    producto.save((err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.status(201).json({
            ok: true,
            producto: productoDB
        });
    });
});


//------------------------actualizar un producto
//grabar un usuario
//grabar una categoria del listado



app.put('/producto/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    let body = req.body;

    let actProd = {
        nombre: body.nombre,
        precioUni: body.precioUni,
        categoria: body.categoria,
        descripcion: body.descripcion,
        disponible: body.disponible
    };
    Producto.findByIdAndUpdate(id, actProd, { new: true, runValidators: true }, (err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }


        res.json({
            ok: true,
            producto: productoDB
        });
    })
});




//------------------------borrar un producto
//disponible = falso

app.delete('/producto/:id', verificaToken, (req, res) => {

    let id = req.params.id;
    let actProd = {
        disponible: false
    };

    Producto.findByIdAndUpdate(id, actProd, (err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'producto no encontrado'
                }
            });
        }
        //!categoriaBorraado

        res.json({
            ok: true,
            message: 'producto Borrad0',
            producto: productoDB
        });
    });
});



module.exports = app;