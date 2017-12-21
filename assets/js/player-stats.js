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
            blockcounts: 'gameinfo-blockcounts?pid={pid}&wid={wid}'
        };

        //this.initializeLayout();
    }

    initializeLayout() {
        this.base.html(``);
    }

    updateLayout() {
        //
    }
}