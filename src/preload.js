const { YMApi } = require('ym-api');
const api = new YMApi();

(async () => {
  try {
    // await api.init({ username: "@.", password: "" });
    const result = await api.searchArtists("gorillaz");
    console.log({ result });
  } catch (e) {
    console.log(`api error ${e.message}`);
  }
})();

console.log('smth');
alert("It Worked!") // Remove this line once you confirm it worked
