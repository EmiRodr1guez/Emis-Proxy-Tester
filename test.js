const httpsProxyAgent = require("https-proxy-agent");
const axios = require("axios");
const fs = require("fs");

async function tester(proxy, siteUrl) {
  let formattedproxy = proxy.split(":");
  var agent = new httpsProxyAgent(
    `http://${formattedproxy[2]}:${formattedproxy[3]}@${formattedproxy[0]}:${formattedproxy[1]}`
  );

  var config = {
    url: siteUrl,
    httpsAgent: agent,
  };

  console.time (
    proxy
  );
  let res = await axios
    .request(config)
    .then((res) => {
      // console.log(res)
    })
    .catch((err) => {
      console.log(err);
    });

    console.timeEnd (
      proxy
    );
}

let proxies = [];
fs.readFileSync("Proxies.txt", "utf-8")
  .split(/\r?\n/)
  .forEach((line) => proxies.push(line));

async function start() {
  proxies.forEach(async (proxy) => {
    await tester(proxy, "https://kith.com");
  });
}

start();
