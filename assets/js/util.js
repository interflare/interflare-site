/**
 * A set of tools and utilities used throughout
 * the client side of the website
 * 
 * @author interflare
 */
class Util {
    /**
     * Build a localStorage key string for consistency
     * across the application.
     * 
     * @static
     * 
     * @param {string} subject what the value is targeted to (e.g. 'player')
     * @param {string} object  what the value represents
     * @param {array} subData data points for the subject (e.g. ['p', 2], ['w', 3] - player id and world id)
     * 
     * @returns {string}
     * 
     * @example Util.buildStorageKey('player', 'blockCount', ['p', 2], ['w', 3]);
     */
    static buildLStorageKey(subject, object, ...subData) {
        var key = ''+subject; // Ensure a string
        subData.forEach((el) => {
            key += '['+ el[0] +':'+ el[1] +']';
        }, this);

        if (object != null) key += '.'+ object;
        return key;
    }

    /**
     * Check if a cached item in storage has expired,
     * based on a timestamp stored in the cache
     * 
     * @static
     * 
     * @param {string} key for the data in storage
     * @param {string} timestampPath where in the key is the timestamp
     * @param {Date} ttl time-to-live (how long until it is supposed to expire)
     * 
     * @returns {boolean} true if it has timed out, false if it's still alive
     */
    static getLStorageTimeout(key, timestampPath, ttl) {
        try {
            const rawData = window.localStorage.getItem(key)
            if (rawData === null) return true; // doesn't exist in storage, grab new copy

            timestampPath = 'data.' + timestampPath;
            const data = JSON.parse(rawData);
            const storedTS = new Date(eval(timestampPath));

            return storedTS < ttl ? true : false;
        } catch (err) {
            console.warn('Util.getLStorageTimeout('+ key +', '+ timestampPath +', '+ ttl +'): failed - '+ err);
            return true; // Default to HAS timed out, so we at least have fresh data
        }
    }

    /**
     * Get a param value from a key in the url
     * 
     * @static
     * 
     * @param {string} paramName ?theParameterName
     */
    static get(paramName) {
        var result = null, decode = [];
        var items = location.search.substr(1).split('&');
        for (var index = 0; index < items.length; index++) {
            decode = items[index].split('=');
            if (decode[0] === paramName) result = decodeURIComponent(decode[1]);
        }

        return result;
    }

    static datePlusSecs(secs) {
        let date = new Date();
        return date.setSeconds(date.getSeconds() + secs);
    }

    static datePlusMins(mins) {
        let date = new Date();
        return date.setMinutes(date.getMinutes() + mins);
    }

    static datePlusHours(hours) {
        let date = new Date();
        return date.setHours(date.getHours() + hours);
    }

    static datePlusDays(days) {
        let date = new Date();
        return date.setDate(date.getDate() + days);
    }

    static randNumRange(min, max) {
        return Math.floor(Math.random()*(max-min+1)+min);
    }

    /**
     * Add commas to numbers to make them easier to read.
     * 
     * @static
     * 
     * @param {number} number the number to prettify
     */
    static prettyNum(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
}