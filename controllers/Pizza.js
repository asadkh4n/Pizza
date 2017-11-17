'use strict';

var url = require('url');

var Pizza = require('./PizzaService');

module.exports.addPizza = function addPizza (req, res, next) {
  Pizza.addPizza(req.swagger.params, res, next);
};

module.exports.createTopping = function createTopping (req, res, next) {
  Pizza.createTopping(req.swagger.params, res, next);
};

module.exports.deletePizza = function deletePizza (req, res, next) {
  Pizza.deletePizza(req.swagger.params, res, next);
};

module.exports.deleteToppingById = function deleteToppingById (req, res, next) {
  Pizza.deleteToppingById(req.swagger.params, res, next);
};

module.exports.getPizzaById = function getPizzaById (req, res, next) {
  Pizza.getPizzaById(req.swagger.params, res, next);
};

module.exports.getPizzas = function getPizzas (req, res, next) {
  Pizza.getPizzas(req.swagger.params, res, next);
};

module.exports.getToppingById = function getToppingById (req, res, next) {
  Pizza.getToppingById(req.swagger.params, res, next);
};

module.exports.listToppings = function listToppings (req, res, next) {
  Pizza.listToppings(req.swagger.params, res, next);
};

module.exports.updatePizza = function updatePizza (req, res, next) {
  Pizza.updatePizza(req.swagger.params, res, next);
};
