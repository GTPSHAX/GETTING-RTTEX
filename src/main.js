const fs = require("fs");
const axios = require("axios");
const path = require("path")
const out = require("./plugins/output");
const conf = require("../config.json")
let downloaded = [];

async function getRTTEX(id, paths) {
    let url = conf.cdn;
    if (conf.log) out.info(`Getting {${paths} [${id}]} on [${url}]`)
    try {
        const realUrl = url+paths;
        const req = await axios({
            'url': realUrl,
            'method': "GET",
            'responseType': "arraybuffer"
        });
        let folders = paths.split('/');
        let pathss = '';
        for (let i = 0; i < folders.length - 1; i++) {
            pathss += "/"+  folders[i];
        }
        const set = {
            recursive: true
        };
        fs.mkdirSync("cache"+pathss, set);
        fs.writeFileSync("./cache" + paths, req.data);
        downloaded.push(paths);
        if (conf.log) out.success(`Success getting {${paths} [${id}]} and saved on [./cache${url+paths}]`)
    } catch (error) {
        out.error(error);
        out.error("Error getting "+paths+" from: " + url + (conf.auto_retry ? " Retrying..." : ""));
        if (conf.auto_retry) getRTTEX(id, url, paths);
    }
}

module.exports = {
    getRTTEX,
    downloaded
}