/**
 * The blockstats class manages the requests to
 * the server for block placement, destruction,
 * and rollback data, displaying it to the user.
 * 
 * @author interflare
 */
class BlockStats {
    constructor() {
        this.endpoints = {
            _base: 'https://us-central1-interflare-minecraft.cloudfunctions.net/',
            blockcounts: 'gameinfo-blockcounts?pid={pid}&wid={wid}'
        };
    }

    getBlockData(pid, wid, next) {
        if (Util.getLStorageTimeout(
            Util.buildLStorageKey('player', 'blockData', ['p', pid], ['w', wid]),
            '__iflr_TS', Util.datePlusDays(-2))) {
            // Only try to connect when the data in local storage is older than 2 days

            console.info('Player('+ pid +').getBlockData('+ wid +'): cache miss');
            console.info('Player('+ pid +').getBlockData('+ wid +'): refreshing from endpoint');

            var uri = this.endpoints._base + this.endpoints.blockcounts;
            
            if (typeof pid !== 'undefined' && pid !== null && pid !== '') {
                uri = uri.replace('{pid}', pid);
            } else {
                uri = uri.replace('{pid}', '');
            }
            
            if (typeof wid !== 'undefined' && wid !== null && wid !== '') {
                uri = uri.replace('{wid}', wid);
            } else {
                uri = uri.replace('{wid}', '');
            }
    
            console.info('Player('+ pid +').getBlockData('+ wid +'): connecting to '+ uri);
            let xhrStart = new Date();
    
            $.getJSON(uri)
                .done((payload) => {
                    let xhrTSDiff = new Date() - xhrStart;
                    console.info('Player('+ pid +').getBlockData('+ wid +'): completed xhr in '+ xhrTSDiff +'ms');
    
                    this.localCachePayload(payload, next);
                })
                .fail((xhr, txtStatus, err) => {
                    let xhrTSDiff = new Date() - xhrStart;
                    console.error('Player('+ pid +').getBlockData('+ wid +'): failed ('+ xhrTSDiff +'ms) - '+ err);
                });
        } else {
            console.info('Player('+ pid +').getBlockData('+ wid +'): cache hit');
            let payload = {
                pid: pid,
                wid: wid,
                data: JSON.parse(window.localStorage.getItem(
                    Util.buildLStorageKey('player', 'blockData', ['p', pid], ['w', wid])))
            };

            return next(payload);
        }
    }

    localCachePayload(payload, next) {
        if (payload !== null) {
            try {
                // Upsert data to local storage
                // if we had to connect to an endpoint
                payload.data.__iflr_TS = new Date();

                window.localStorage
                    .setItem(Util.buildLStorageKey('player', 'blockData', ['p', payload.pid], ['w', payload.wid]),
                        JSON.stringify(payload.data));

                return next(payload);
            } catch (err) {
                console.error('Player(?).localCachePayload(payload): failed - '+ err);
            }
        } else {
            console.error('Player(?).localCachePayload(payload): payload was null');
        }
    }
}