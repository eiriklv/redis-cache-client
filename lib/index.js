exports = module.exports = function(options) {
    if (!options.client) return console.log('redis-cache-client: you must supply a redis client connection');
    if (!options.prefix) return console.log('redis-cache-client: you must provide a prefix!');

    return {
        get: require('./get')(options.client, options.prefix),
        set: require('./set')(options.client, options.prefix),
        purge: require('./purge')(options.client, options.prefix)
    };
};
