const express = require('express');
const router = express.Router();
const request = require('request');
// require('dotenv').config();

router.get('/repos', function (req, res) {

  let username = req.query.username;
  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;
  const count = 5;
  let sort = 'created: asc';
  sort = encodeURIComponent(sort);


  let uri = 'https://api.github.com/users/' + username + '/repos?per_page=' + count + '&sort=' + sort +
    '&client_id=' + clientId + '&client_secret=' + clientSecret;

  let options = {
    url: uri,
    headers: {
      'User-Agent': 'node.js'
    }
  };

  request(options, function (error, response) {
    if (error) {
      res.send(error)
    } else {
      res.send(response.body)
    }
  });

});

module.exports = router;
