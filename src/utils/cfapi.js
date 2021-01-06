const request = require("request");

const cfapi = (userName, callback) => {
  const url = `https://codeforces.com/api/user.status?handle=${userName}`;

  request({ url, json: true }, (err, res) => {
    var type = {};
    var cnt = 0;
    var lang = {};
    if (err || res.body.status === "FAILED") {
      callback({ error: "An Unknown Error occured" });
      return;
    }

    const resultArray = res.body.result;

    for (var i = 0; i < resultArray.length; i++) {
      if (resultArray[i].creationTimeSeconds < 1577840401) {
        break;
      }
      if(resultArray[i].creationTimeSeconds >=1609459199) continue;
      if (resultArray[i].verdict === "OK") cnt++;

      if (lang[resultArray[i].programmingLanguage] !== undefined)
        lang[resultArray[i].programmingLanguage]++;
      else lang[resultArray[i].programmingLanguage] = 0;

      resultArray[i].problem.tags.map((tag) => {
        if (type[tag] === undefined) type[tag] = 0;
        else type[tag]++;
      });
    }
    callback({ cnt, type, lang });
  });
};

module.exports = cfapi;
