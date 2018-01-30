/**
 * The PlayerStats class manages the requests to
 * the server for player information, and displays
 * it to the user.
 * 
 * @author interflare
 */
class PlayerStats {
    constructor() {
        this.base = $('[component="stats/main"]');
        this.endpoints = {
            _base: 'https://us-central1-interflare-minecraft.cloudfunctions.net/',
            worlds: 'gameinfo-worlds',
            players: 'gameinfo-players?cx={cx}',
        };

        this.players = [];
        this.worlds = [];
    }

    getPlayerList(next, cursor = null) {
        var uri = this.endpoints._base + this.endpoints.players;
        uri = uri.replace('{cx}', cursor ? cursor : '');

        console.info(`getPlayerList(): connecting to ${uri}`);
        let xhr_start = new Date();

        $.getJSON(uri)
            .done((payload) => {
                let xhr_diff = new Date() - xhr_start;
                console.info(`getPlayerList(): completed xhr in ${xhr_diff}ms`);
                
                this.players.push.apply(payload.players);
                next(null, payload);
            })
            .fail((xhr, txtStatus, err) => {
                let xhr_diff = new Date() - xhr_start;
                console.info(`getPlayerList(): failed (${xhr_diff}ms) - ${err}`);

                next(err, null);
            });
    }

    updateLayout() {
        //
    }
}