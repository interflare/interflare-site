$(document).foundation();

fetch("https://interflare.net/api/server/status")
    .then(res => res.json())
    .then(data => {
        // Server status
        if (data.hasOwnProperty("status")) {
            let className = "pending"
            let status = "pending";

            switch (data.status) {
                case "pending":
                    break;
                case "online":
                    className = "online";
                    status = "online";
                    break;
                case "offline":
                    className = "offline";
                    status = "offline";
                    break;
                case "timeOut":
                    className = "issues";
                    status = "experiencing issues";
                    break;
                default:
                    className = "unknown";
                    status = "unknown";
                    break;
            }

            $("[component='quickinfo/server/status']")
                .removeClass()
                .addClass(`status ${className}`)
                .text(status);
        }

        // Player information
        if (data.hasOwnProperty("players")
        && data.players.hasOwnProperty("online")
        && data.players.hasOwnProperty("maximum")
        && data.players.online > 0) {
            $("[component='quickinfo/players/count']").text(`${data.players.online}/${data.players.maximum}`);
            $("[component='quickinfo/players/tag']").text("Online now");
        }
    });