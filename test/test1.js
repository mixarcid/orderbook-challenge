var assert = require('assert');
var Exchange = require('../lib/index.js');

var exchange = new Exchange();

//very basic sanity check. Can we match two traders with same price?

var buy = exchange.buy(10, 10);
var sell = exchange.sell(10, 10);

var buy_complete = exchange.getOrder(buy.id);
var sell_complete = exchange.getOrder(sell.id);

assert(buy_complete.id == buy.id);
assert(buy_complete.executedQuantity == 10);

assert(sell_complete.id == sell.id);
assert(sell_complete.executedQuantity == 10);
