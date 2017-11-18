'use strict';
var low	= require('lowdb');
const db = low('orderFile.json');

//creating a random ID
function uuid() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {var r = Math.random()*16|0,v=c=='x'?r:r&0x3|0x8;return v.toString(16);});
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
  res.end();
}

exports.getOrderById = function(args, res, next) {
  /**
   * Find purchase order by ID
   *
   * orderId Long ID of order to be returned
   * returns Order
   **/
  var examples = {};
  examples['application/json'] = {
  "totalPrice" : 5.962133916683182377482808078639209270477294921875,
  "recipient" : "aeiou",
  "id" : 0,
  "orderItems" : [ {
    "quantity" : 1,
    "pizzaId" : 6
  } ]
};
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
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

  // var examples = {};
  // examples['application/json'] = [ 0 ];
  // if (Object.keys(examples).length > 0) {
  //   res.setHeader('Content-Type', 'application/json');
  //   res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  // } else {
  //   res.end();
  // }
}

