Namebase Orderbook Coding Challenge
==

This took me 2 hours to complete. I believe everything is feature complete, though I was a bit confused about the specification of the `sync()` function (I would have asked, but I was already in too deep in the challenge). Ultimately, I ended up backing up the current orderbook in an "orders.json" file at every buy/sell instance, and this file can be (synchronously) reloaded with `sync()`. All the tests are in the "test/" folder and can all be run with `npm run test`.

While my algorithm is straighforward, I could reduce the total amount of code by using higher-order functions over the `buyOrders` and `sellOrders` arrays. The code for `buy` and `sell` looks uncomfortably similar except for the greater than vs. less than signs. Had I allotted myself more time, I would have simplified this code (and written more tests for edge cases).