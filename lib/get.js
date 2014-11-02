var debug = require('debug')('redis-cache-client:get');

exports = module.exports = function(client, prefix) {
    return function(key, callback) {
        var output;

        callback = callback || defaultCallback;

        if (!key) return callback('no key supplied for cache retrieval');

        client.get(prefix + key, function(err, result) {
            if (err) {
                return callback(err);
            } else if (!result) {
                return callback(null, null);
            } else {
                try {
                    output = JSON.parse(result);
                } catch (e) {
                    return callback('error on JSON.parse: ' + e);
                }
                callback(null, output);
            }
        });
    };
};

function defaultCallback(err) {
    if (err) console.log('sol-redis-cache:get -' + err);
}
