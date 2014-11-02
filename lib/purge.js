var debug = require('debug')('redis-cache-client:purge');

exports = module.exports = function(client, prefix) {
    return function(callback) {
        callback = callback || defaultCallback;

        client.keys(prefix + '*', function(err, keys) {
            if (keys && keys.length < 1) return callback(null, 'no data to purge for prefix: ' + prefix);
            
            client.del(keys, function(err, count) {
                count = count || 0;
                callback(err, 'purged ' + count + ' entries for prefix: ' + prefix);
            });
        });
    };
};

function defaultCallback(err) {
    if (err) debug(err);
}
