// index.js
const Mustache = require('mustache');
const fs = require('fs');
const urllib = require('urllib');
const xmlreader = require('xmlreader');
const MUSTACHE_MAIN_DIR = './main.mustache';
const MAX = 10;
/**
  * DATA is the object that contains all
  * the data to be provided to Mustache
  * Notice the "name" and "date" property.
*/

urllib.request('https://blog.zimo.wiki/atom.xml', function (err, data, res) {
  if (err) {
    console.log(err);
    throw err;
  }
  // console.log(res.statusCode);
  // console.log(res.headers);
  // console.log(data.toString())
  xmlreader.read(data.toString(), function(errors, response){
    if (errors){
      console.log(errors);
      throw errors;
    }

    let arts = []
    for (var i = 0;i < MAX;i++) {
      var article = {}
      article.title = response.feed.entry.at(i).title.text();
      article.url = response.feed.entry.at(i).link.attributes().href;
      // console.log(article);
      arts.push(article);
    }

    // console.log(arts);

    let DATA = {
      user: {
          'name': '子墨',
          'address': '中国，四川，成都',
          'school': '成都信息工程大学'
      },
      date: new Date().toUTCString(),
      articles: arts
    };

    // console.log(DATA)

    // console.log(response.feed.entry.at(0));
    generateReadMe(DATA)
  });
});


/**
  * A - We open 'main.mustache'
  * B - We ask Mustache to render our file with the data
  * C - We create a README.md file with the generated output
  */
function generateReadMe(DATA) {
  fs.readFile(MUSTACHE_MAIN_DIR, (err, data) =>  {
    if (err) throw err;
    const output = Mustache.render(data.toString(), DATA);
    fs.writeFileSync('README.md', output);
  });
}
