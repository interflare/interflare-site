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
     * @param {array} sub_data data points for the subject (e.g. ['p', 2], ['w', 3] - player id and world id)
     * 
     * @returns {string}
     * 
     * @example Util.buildStorageKey('player', 'blockCount', ['p', 2], ['w', 3]);
     */
    static buildLStorageKey(subject, object, ...sub_data) {
        var key = ''+subject; // Ensure a string
        sub_data.forEach((el) => {
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
     * @param {Date} ttl time-to-live (how long until it is supposed to expire)
     * 
     * @returns {boolean} true if it has timed out, false if it's still alive
     */
    static getLStorageTimeout(key, ttl, supplied_data = null) {
        try {
            let data = supplied_data || this.selectLStorage(key);
            if (data === null) return true; // doesn't exist in storage, grab new copy
            let stored_ts = new Date(data.__IFLR_TS);
            return stored_ts < ttl ? true : false;
        } catch (err) {
            return true; // Default to HAS timed out, so we at least have fresh data
        }
    }

    /**
     * Save an entry into local storage.
     * 
     * @static
     * 
     * @param {string} key for the data entry in storage
     * @param {Object} data object to be converted to JSON and saved
     * 
     * @returns {boolean} true if saved successfully, false on error
     */
    static insertLStorage(key, data) {
        try {
            data.__IFLR_TS = new Date(); // set timestamp
            let json_data = JSON.stringify(data);
            window.localStorage.setItem(key, json_data);
            return true;
        } catch (err) {
            return false;
        }
    }

    /**
     * Get an entry from local storage.
     * 
     * @static
     * 
     * @param {string} key where the entry is stored
     * 
     * @returns {Object|boolean} object if successful, false if not
     */
    static selectLStorage(key) {
        try {
            let raw = window.localStorage.getItem(key);
            return data = JSON.parse(raw);
        } catch (err) {
            return false;
        }
    }

    static passLCache(key, ttl, data_req) {
        let data = this.selectLStorage(key);
        if (data === null) {
            return data_req(resp => {
                // ask the caller to fill-in the data for us
                this.insertLStorage(key, resp);
                return resp;
            });
        } else {
            if (this.getLStorageTimeout(key, ttl, data)) {
                // expired data
                return data_req(resp => {
                    this.insertLStorage(key, resp);
                    return resp;
                });
            } else return data;
        }
    }

    /**
     * Get a param value from a key in the url
     * 
     * @static
     * 
     * @param {string} param_name ?theParameterName
     */
    static get(param_name) {
        var result = null, decode = [];
        var items = location.search.substr(1).split('&');
        for (var index = 0; index < items.length; index++) {
            decode = items[index].split('=');
            if (decode[0] === param_name) result = decodeURIComponent(decode[1]);
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