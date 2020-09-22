var assert = require('assert');
var Exchange = require('../lib/index.js');

var exchange = new Exchange();

//Does the buying happen in the correct order?

var sell1 = exchange.sell(10, 7);
var sell2 = exchange.sell(7, 5);
var sell3 = exchange.sell(10, 10);

var buy = exchange.buy(10, 10);

var buy_complete = exchange.getOrder(buy.id);
var sell1_complete = exchange.getOrder(sell1.id);
var sell2_complete = exchange.getOrder(sell2.id);
var sell3_complete = exchange.getOrder(sell3.id);

assert(sell1.executedQuantity == 3);
assert(sell2.executedQuantity == 7);
assert(sell3.executedQuantity == 0);
