const request = require("request");
const cheerio = require("cheerio");
const url = "https://auto.ria.com/toplivo/zaporozhe/#refuel";

request(url, function (error, response, body) {
  let $ = cheerio.load(body);
  var data = $("section.fuel-mid-common div.table div.t-row").text();

  let parsedData = data.match(
    /(A-95\+|A-95|A-92|ДТ|Газ)\s{3}[0-9]+\.[0-9]+\s{2}[0-9]/g
  );

  let fuel = [];
  parsedData.forEach((e, i) => {
    let name = e.split("   ")[0].padStart(5);
    let price = e.split("  ")[1].padEnd(7);
    let dynamic = e.split("  ")[2].padStart(1);
    fuel.push(`| ${name} | ${price} | ${dynamic} |`);
  });
  console.log(fuel);
});
