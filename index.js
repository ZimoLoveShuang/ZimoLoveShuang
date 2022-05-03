// index.js
const Mustache = require('mustache');
const fs = require('fs');
const urllib = require('urllib');
const xmlreader = require('xmlreader');
const MUSTACHE_MAIN_DIR = './main.mustache';
const MAX = 10;

let DATA = {
    user: {
        'name': '子墨'
    },
    date: new Date().toUTCString()
};

generateReadMe(DATA)

function generateReadMe(DATA) {
    console.log(DATA)
    fs.readFile(MUSTACHE_MAIN_DIR, (err, data) => {
        if (err) {
            console.log(err);
            throw err;
        }
        const output = Mustache.render(data.toString(), DATA);
        fs.writeFileSync('README.md', output);
    });
}
