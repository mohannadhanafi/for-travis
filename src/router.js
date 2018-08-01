const logic = require('./functions');

const router = (req, res) => {
  const endpoint = req.url;

  if (endpoint === '/') {
    logic.serveHome(res, '/index.html');
  } else if (['/favicon.ico', '/css/style.css', '/js/dom.js', '/js/request.js', '/js/fetch.js', '/js/logic.js', '/img/bg.jpg'].includes(endpoint)) {
    logic.serveHome(res, endpoint);
  } else if (endpoint === '/weather') {
    logic.serveAPI(req, res);
  } else {
    logic.pageNotFound(res);
  }
};

module.exports = router;
