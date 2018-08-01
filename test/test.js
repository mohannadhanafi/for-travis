const test = require('tape');
const supertest = require('supertest');
const fs = require('fs');
const router = require('../src/router');

test('Initialise', (t) => {
  const num = 2;
  t.equal(num, 2, 'Should return 2');
  t.end();
});


test('Test for the statuscode of the home page', (t) => {
  supertest(router)
    .get('/')
    .expect(200)
    .end((err, res) => {
      t.error(err);
      t.equal(res.statusCode, 200, 'Should equal 200');
      t.end();
    });
});


test('Test of statuscode of failed route', (t) => {
  supertest(router)
    .get('/qqwe')
    .expect(404)
    .end((err, res) => {
      t.error(err);
      t.equal(res.statusCode, 404, 'Should equal 404');
      t.end();
    });
});


test('Test of the text of failed route', (t) => {
  supertest(router)
    .get('/qwq')
    .expect('Content-Type', /html/)
    .end((err, res) => {
      t.error(err);
      t.equal(res.text, '<h1>404 Error hahahaha</h1>', 'Should return 404 message');
      t.end();
    });
});


test('Test of the text of the home route', (t) => {
  supertest(router)
    .get('/')
    .end((err, res) => {
      fs.readFile(__dirname + '/../public/index.html', (err, data) => {
        if (err) throw err;
        t.error(err);
        t.equal(res.text, data.toString(), 'Should return the html file');
        t.end();
      });
    });
});


test('Test of the text of failed route', (t) => {
  supertest(router)
    .get('/')
    // .expect('Content-Type', /html/)
    .end((err, res) => {
      t.error(err);
      t.equal(res.header['content-type'], 'text/html', 'Should return html');
      t.end();
    });
});
