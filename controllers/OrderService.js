'use strict';
var low	= require('lowdb');
const db = low('orderFile.json');

//creating a random 3 digit number for ID
function uuid() {
	return Math.floor(Math.random()*(999-100+1)+100);
}

exports.createOrder = function(args, res, next) {
  /**
   * Place an order.
   **/

  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 201;

  var result = db.get('orders')
  .push({ id: uuid(), orderItems: args.body.value.orderItems, totalPrice: args.body.value.totalPrice, recipient: args.body.value.recipient })
  .value()
res.end(JSON.stringify(result));
}

exports.deleteOrder = function(args, res, next) {
  /**
   * Delete purchase order by ID
   *
   * orderId Long ID of the order to be deleted
   * no response value expected for this operation
   **/
  if(args.orderId.value === '') {
    res.statusCode = 500;
    res.end('ID Required');
 }
 res.setHeader('Content-Type', 'application/json');
 res.statusCode = 204;
 db.get('orders')
   .remove({ id: args.orderId.value })
   .value()
   res.end("deleted");
 res.end();
}

exports.getOrderById = function(args, res, next) {
  /**
   * Find purchase order by ID
   *
   * orderId Long ID of order to be returned
   * returns Order
   **/
  if(args.orderId.value === '') {
    res.statusCode = 500;
    res.end('ID Required');
 }
 res.setHeader('Content-Type', 'application/json');
 res.statusCode = 200;
 res.end(JSON.stringify(db.get('orders').find({ id: args.orderId.value }).value()));
}

exports.getOrders = function(args, res, next) {
  /**
   * Returns a list of orders.
   * 
   *
   * returns List
   **/
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 200;
  res.end(JSON.stringify(db.get('orders').value()));
}

