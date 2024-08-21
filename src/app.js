const out = require("./plugins/output"); out.info("Importing some packages...");
const main = require("./main");

out.info("Reading config.json...");
const config = require("../config.json");

out.info("Reading items.json...");
const all = require("../items.json");

out.info("ItemsDat version: " + all.version);
out.info("Items count: " + all.item_count);
out.info("Starting downloading RTTEX...");
(async () => {
    for (let item of all.items) {
        //if (main.downloaded.includes(item.texture) || !item.texture) continue;
        await main.getRTTEX(item.item_id, `/game/${item.texture}`);
        if (item.extra_file.length) await main.getRTTEX(item.item_id, "/"+item.extra_file);
    }
    out.success("Process completed!")
})();