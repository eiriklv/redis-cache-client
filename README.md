Redis Cache Client
==================

#### Introduction:
Provides an abstraction layer/wrapper for node-redis caching

#### Example usage:

```js
var redis = require('redis');
var CacheClient = require('redis-cache-client');

var cache = CacheClient({
    client: redis.createClient();
    prefix: 'myprefix:'
});

var myData = {
    firstName: 'Philip J.',
    lastName: 'Fry'
};

// set cache with 6 minute TTL (time-to-live)
cache.set('mykey', myData, 360, function(err) {
    // err is null unless something bad happens
});

// set cache without TTL
cache.set('mykey', myData, null, function(err) {
    // err is null unless something bad happens
});

// get cache from the same key as above (myprefix:mykey)
cache.get('mykey', function(err, result) {
    // err is null unless something bad happens
    // result is your data object
});

// purge all keys under your prefix
cache.purge();

// pass a callback to .purge
cache.purge(function(err) {
    // err is null unless purging was unsuccessful
});
```
