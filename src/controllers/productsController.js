const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator");
const db = require('../database/models');
const sequalize = db.sequelize;

const productsFilePath = path.join(__dirname, "../data/products.json");

// Rutas y vistas
const productsController = {
  shoppingCart: (req, res) => {
    res.redirect("/productList/");
  },
  shoppingCartProductDetail: (req, res) => {
    db.Products.findByPk(req.params.id)
      .then(product => {
        let features = [];

              if(product.features1 != null && product.features1 != ""){
                features.push(product.features1);
              }
              if(product.features2 != null && product.features2 != ""){
                features.push(product.features2);
              }
              if(product.features3 != null && product.features3 != ""){
                features.push(product.features3);
              }
              if(product.features4 != null && product.features4 != ""){
                features.push(product.features4);
              }
        res.render("shopping-cart", { productToBuy: product, features });
      }).catch (error => {
        res.send(error);
      });    
  },
  productDetail: (req, res) => {
    db.Products.findByPk(req.params.id)
            .then(product => {
              let features = [];

              if(product.features1 != null && product.features1 != ""){
                features.push(product.features1);
              }
              if(product.features2 != null && product.features2 != ""){
                features.push(product.features2);
              }
              if(product.features3 != null && product.features3 != ""){
                features.push(product.features3);
              }
              if(product.features4 != null && product.features4 != ""){
                features.push(product.features4);
              }
              res.render('productDetail', {productDetail: product, features}); 
            }) 
  },
  productEdit: (req, res) => {
    db.Products.findByPk(req.params.id)
    .then(product => {
      let features = [];

      if(product.features1 != null && product.features1 != ""){
        features.push(product.features1);
      }
      if(product.features2 != null && product.features2 != ""){
        features.push(product.features2);
      }
      if(product.features3 != null && product.features3 != ""){
        features.push(product.features3);
      }
      if(product.features4 != null && product.features4 != ""){
        features.push(product.features4);
      }
      res.render('productEdit', {productToEdit: product, features}); 
    }) 
  },
  productUpdate: (req, res) => {
    if (validationResult(req).errors.length > 0) {
      db.Products.findByPk(req.params.id)
      .then(product => {
        let features = [];
  
        if(product.features1 != null && product.features1 != ""){
          features.push(product.features1);
        }
        if(product.features2 != null && product.features2 != ""){
          features.push(product.features2);
        }
        if(product.features3 != null && product.features3 != ""){
          features.push(product.features3);
        }
        if(product.features4 != null && product.features4 != ""){
          features.push(product.features4);
        }
        res.render("productEdit", {
          productToEdit: product, 
          features: features,
          errors: validationResult(req).mapped(),
          oldData: req.body,
        });
      }) 
      
    } else {
      
      let featuresEntry = req.body.features;
      let featuresEntrySize = featuresEntry.length;
      let categoryConvert = 0;
      if(req.body.categoria == "drone"){
        categoryConvert = 1;
      } else{
        categoryConvert = 2;
      }

      db.Products.update (
        {
          id: 0,
          product_name: req.body.nombre,
          reference: req.body.reference,
          image: req.file ? req.file.filename : req.body.image_default,
          category_id: categoryConvert,
          price: req.body.precio,
          features1: featuresEntrySize >=1 ? featuresEntry[0] : null,
          features2: featuresEntrySize >=2 ? featuresEntry[1] : null,
          features3: featuresEntrySize >=3 ? featuresEntry[2] : null,
          features4: featuresEntrySize >=4 ? featuresEntry[3] : null
        },
        {
            where: {product_id: req.params.id}
        })
        .then(()=> {
          return res.redirect("/productList/productDetail/" + req.params.id)})           
        .catch(error => res.send(error));
    }
  },
  productCreate: (req, res) => {
    res.render("productCreate");
  },
  productList: (req, res) => {
    db.Products.findAll()
    .then(products => {
      res.render("productList", {
        products,
      });
    }).catch (error => {
      res.send(error);
    });
  },
  productCreatePOST: (req, res) => {
    if (validationResult(req).errors.length > 0) {
      return res.render("productCreate", {
        errors: validationResult(req).mapped(),
        inputProduct: req.body,
      });
    } else {
      db.Products.findAll({
        where: {
            product_name: req.body.nombre
        }
      })
          .then(product => {
              if (product == 0) {
                let featuresEntry = req.body.features;
                let featuresEntrySize = featuresEntry.length;
                let categoryConvert = 0;
                if(req.body.categoria == "drone"){
                  categoryConvert = 1;
                } else{
                  categoryConvert = 2;
                }

                db.Products.create (
                  {
                    id: 0,
                    product_name: req.body.nombre,
                    reference: req.body.reference,
                    image: req.file.filename,
                    category_id: categoryConvert,
                    price: req.body.precio,
                    features1: featuresEntrySize >=1 ? featuresEntry[0] : null,
                    features2: featuresEntrySize >=2 ? featuresEntry[1] : null,
                    features3: featuresEntrySize >=3 ? featuresEntry[2] : null,
                    features4: featuresEntrySize >=4 ? featuresEntry[3] : null
                  })
                  .then(()=> {
                    return res.redirect("/productList")})            
                  .catch(error => res.send(error));
              } else{
                return res.render("productCreate", {
                  errors: {
                    nombre: {
                      msg: 'The product name is already registered'
                    }
                  },
                  inputProduct: req.body,
                });
              }
          });
    }
  },
  productDelete: (req, res) => {
    let productId = req.params.id;
    db.Products.destroy({
      where: {product_id: productId}, force: true
    })
    .then(()=>{
      return res.redirect('/productList')})
    .catch(error => res.send(error))
  },
};

module.exports = productsController;
