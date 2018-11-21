fs = require("fs");

module.exports = (robot) => {
  let keywords = {};

  if (process.env.HUBOT_SIMPLE_RESPONSES) {
    const responses = process.env.HUBOT_SIMPLE_RESPONSES.split(',');

    for (const response of responses) {
      [keyword, reply] = response.replace(/^\s*|\s*$/g, '').split(':')
      keywords[keyword] = reply
    }
  } else if (fs.existsSync('responses.json')) {
    const file = fs.readFileSync('responses.json', 'utf8');
    keywords = JSON.parse(file)
  }

  for (const keyword in keywords) {
    robot.hear(new RegExp(keyword, 'i'), msg => msg.send(keywords[keyword]));
  }
}
