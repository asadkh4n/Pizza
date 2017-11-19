'use strict';
var low	= require('lowdb');
const db = low('pizzaFile.json');

//creating a random 3 digit number for ID
function uuid() {
	return Math.floor(Math.random()*(999-100+1)+100);
}

exports.createOrder = function(args, res, next) {
  /**
   * Place an order.
   **/
  var unikId = uuid();
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 201;
  
  var result = db.get('orders')
  .push({ id: unikId, orderItems: args.body.value.orderItems, totalPrice: args.body.value.totalPrice, recipient: args.body.value.recipient })
  .value()
  var result1 = db.get('orders')
  .find({id: unikId})
  .assign({ totalPrice: calculateTotal(unikId)})
  .value()
  
  res.end(JSON.stringify(result1));
  
}

function calculateTotal (orderid){
  var orderID = orderid;
  var pizzaID = JSON.stringify(db.get('orders').filter({id: orderID}).map((order) => { return order.orderItems[0].pizzaId; }).value()[0]);
  console.log(pizzaID);
  
  var pizzaPrice = JSON.stringify(db.get('pizzas').filter({id: parseInt(pizzaID)}).map((pizza) => { return pizza.price; }).value()[0]);
  console.log(parseFloat(pizzaPrice));

  var toppingPrice = JSON.stringify(db.get('toppings').filter({pizzaId: parseInt(pizzaID)}).map((topping) => { return topping.price; }));
  
  toppingPrice = JSON.parse(toppingPrice);
  const total = toppingPrice.reduce(function(sum, value) {
    return sum + value;
  });

  console.log(total);
  
  var orderTotal = parseFloat(pizzaPrice) + parseFloat(total);
  console.log("The total for this order is : " + orderTotal);
  console.log("order id: " + orderID);

  return parseFloat(orderTotal);
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
  res.end(JSON.stringify(db.get('orders').map((pizza) => { return pizza.id; })));
}

