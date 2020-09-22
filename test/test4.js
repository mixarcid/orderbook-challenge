var assert = require('assert');
var Exchange = require('../lib/index.js');

var exchange = new Exchange();

//Tests for file I/O

exchange.buy(10, 2);
exchange.buy(5, 3);
exchange.sell(50, 8);
exchange.sell(5, 12);
exchange.buy(51, 9);

var exchange2 = new Exchange();
exchange2.sync('orders.json');

//more stuff from Readme
exchange2.sell(10, 12);
exchange2.sell(1, 12);
exchange2.sell(2, 12);
exchange2.buy(15, 13);

assert(exchange2.getQuantityAtPrice(12) == 3);

