const fs = require('fs');
const path = require('path');
const request = require('request');

const contentType = {
  html: 'text/html',
  css: 'text/css',
  jpg: 'images/jpg',
  ico: 'images/ico',
  js: 'text/javascript',
};

const serveHome = (res, endpoint) => {
  const filePath = path.join(__dirname, '..', 'public', endpoint);
  const ext = endpoint.split('.')[1];
  res.writeHead(200, { 'content-type': `${contentType[ext]}` });
  fs.readFile(filePath, (err, file) => {
    if (err) {
      res.end(err);
    } else {
      res.end(file);
    }
  });
};


const getData = (url, cb) => {
  request.get(url, (err, data) => {
    if (err) {
      cb(new TypeError('page not found'));
    } else {
      cb(null, JSON.parse(data.body));
    }
  });
};

const serveAPI = (req, res) => {
  let city = '';
  req.on('data', (data) => {
    city += data;
    req.on('end', () => {
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=4638dc94ad7887e67dc768fd6a6c909c`;

      getData(url, (err, data1) => {
        if (err) {
          res.writeHead(404);
          res.end(err.message);
        } else {
          res.end(JSON.stringify(data1));
        }
      });
    });
  });
};


const pageNotFound = (res) => {
  res.writeHead(404, { 'Content-Type': 'text/html' });
  res.end('<h1>404 Error hahahaha</h1>');
};

module.exports = { serveHome, pageNotFound, serveAPI };
