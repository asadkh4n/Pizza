'use strict';

var url = require('url');

var Order = require('./OrderService');

module.exports.createOrder = function createOrder (req, res, next) {
  Order.createOrder(req.swagger.params, res, next);
};

module.exports.deleteOrder = function deleteOrder (req, res, next) {
  Order.deleteOrder(req.swagger.params, res, next);
};

module.exports.getOrderById = function getOrderById (req, res, next) {
  Order.getOrderById(req.swagger.params, res, next);
};

module.exports.getOrders = function getOrders (req, res, next) {
  Order.getOrders(req.swagger.params, res, next);
};
