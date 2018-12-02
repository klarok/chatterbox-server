var request = require('request');
var expect = require('chai').expect;

var meme1 = 
`░░░░░░░░░░░░░░░░░░░░░░░░░░█▄
░▄▄▄▄▄▄░░░░░░░░░░░░░▄▄▄▄▄░░█▄
░▀▀▀▀▀███▄░░░░░░░▄███▀▀▀▀░░░█▄
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░█
░▄▀▀▀▀▀▄░░░░░░░░░░▄▀▀▀▀▀▄░░░░█
█▄████▄░▀▄░░░░░░▄█░▄████▄▀▄░░█▄
████▀▀██░▀▄░░░░▄▀▄██▀█▄▄█░█▄░░█
██▀██████░█░░░░█░████▀█▀██░█░░█
████▀▄▀█▀░█░░░░█░█████▄██▀▄▀░░█
███████▀░█░░░░░░█░█████▀░▄▀░░░█
░▀▄▄▄▄▄▀▀░░░░░░░░▀▀▄▄▄▄▀▀░░░░░█
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░█
░░▓▓▓▓▓▓▓░░░░░░░░░░▓▓▓▓▓▓▓░░░░█
░░░▓▓▓▓▓░░░░░░░░░░░░▓▓▓▓▓░░░░░█
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░█
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░█▀
░░░░░░░░░▄▄███████▄▄░░░░░░░░░█
░░░░░░░░█████████████░░░░░░░█▀
░░░░░░░░░▀█████████▀░░░░░░░█▀
░░░░░░░░░░░░░░░░░░░░░░░░░░█▀
░░░░░░░░░░░░░░░░░░░░░░░░░█▀`;

var lapras = 
`─────────────────███▓ ─────████───────█────▓ ───██░───██────█░░────▓ ──█░───────█───█░░░░──▓ ──█░░─░─────███████░░░─▓ ─█░░░░██────█──────██░░▓ ─█░░░█░░█───▓────────█░▓██ ─█░░░░░░░█────────────██──█ ──█░░░░░░█───────────░░───█ ──█░░░░░░█░──────────────█ ───██░░░█░░░──────────░─░█ ─────███░░░░░▓██░░▒────░░█ ──────█░░░░░────█░░▒──────▓ ──────█░░▓░░───▒─█░▒──────▓ ──────█░▓▓░░░░─█▒█░▒──────▓ ──────█░▓░░░░░░▓███────────▓ ──────█░░░░▒█░░░░░░░░─────░█ ───────█░░▒▒▒█░░░░░░░░░░░░░█ ───────█░░▒▒▒▒▓░░░░░░░░░░░░█ ───────█░░▒▒▒▒▒██░░░░░░░▓░░█ ────────█░▒▒▓▒▒▒▒███▓▓░░░░█ ────────█░░▒▒▓▓▒▒▒▒▒▒▒▓▓░░█ ────────█░░▒▒▒▒▓▓██████─██ ────────█░░▒▒▒▒▒▒█`;

var salt = `▒▒▒▒▒▒▒▒▒▒▒▒▒▒▄▄██████▄ ▒▒▒▒▒▒▒▒▒▒▄▄████████████▄ ▒▒▒▒▒▒▄▄██████████████████ ▒▒▒▄████▀▀▀██▀██▌███▀▀▀████ ▒▒▐▀████▌▀██▌▀▐█▌████▌█████▌ ▒▒█▒▒▀██▀▀▐█▐█▌█▌▀▀██▌██████ ▒▒█▒▒▒▒████████████████████▌ ▒▒▒▌▒▒▒▒█████░░░░░░░██████▀ ▒▒▒▀▄▓▓▓▒███░░░░░░█████▀▀ ▒▒▒▒▀░▓▓▒▐█████████▀▀▒ ▒▒▒▒▒░░▒▒▐█████▀▀▒▒▒▒▒▒ ▒▒░░░░░▀▀▀▀▀▀▒▒▒▒▒▒▒▒▒ ▒▒▒░░░░░░░░▒▒▒▒▒▒▒▒▒▒`;

describe('server', function() {
  it('should respond to GET requests for /classes/messages with a 200 status code', function(done) {
    request('http://127.0.0.1:3000/classes/messages', function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it('should send back parsable stringified JSON', function(done) {
    request('http://127.0.0.1:3000/classes/messages', function(error, response, body) {
      expect(JSON.parse.bind(this, body)).to.not.throw();
      done();
    });
  });

  it('should send back an object', function(done) {
    request('http://127.0.0.1:3000/classes/messages', function(error, response, body) {
      var parsedBody = JSON.parse(body);
      expect(parsedBody).to.be.an('object');
      done();
    });
  });

  it('should send an object containing a `results` array', function(done) {
    request('http://127.0.0.1:3000/classes/messages', function(error, response, body) {
      var parsedBody = JSON.parse(body);
      expect(parsedBody).to.be.an('object');
      expect(parsedBody.results).to.be.an('array');
      done();
    });
  });

  it('should accept POST requests to /classes/messages', function(done) {
    var requestParams = {method: 'POST',
      uri: 'http://127.0.0.1:3000/classes/messages',
      json: {
        username: 'NotSoBonoJono',
        text: '⠄⠄⠄⠄⠄⠄⣀⣀⣀⣤⣶⣿⣿⣶⣶⣶⣤⣄⣠⣴⣶⣿⣿⣿⣿⣶⣦⣄⠄⠄ ⠄⠄⣠⣴⣾⣿⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦ ⢠⠾⣋⣭⣄⡀⠄⠄⠈⠙⠻⣿⣿⡿⠛⠋⠉⠉⠉⠙⠛⠿⣿⣿⣿⣿⣿⣿⣿⣿ ⡎⣾⡟⢻⣿⣷⠄⠄⠄⠄⠄⡼⣡⣾⣿⣿⣦⠄⠄⠄⠄⠄⠈⠛⢿⣿⣿⣿⣿⣿ ⡇⢿⣷⣾⣿⠟⠄⠄⠄⠄⢰⠁⣿⣇⣸⣿⣿⠄⠄⠄⠄⠄⠄⠄⣠⣼⣿⣿⣿⣿ ⢸⣦⣭⣭⣄⣤⣤⣤⣴⣶⣿⣧⡘⠻⠛⠛⠁⠄⠄⠄⠄⣀⣴⣿⣿⣿⣿⣿⣿⣿ ⠄⢉⣹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣶⣦⣶⣶⣶⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿ ⢰⡿⠛⠛⠛⠛⠻⠿⠿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿ ⠸⡇⠄⠄⢀⣀⣀⠄⠄⠄⠄⠄⠉⠉⠛⠛⠻⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿ ⠄⠈⣆⠄⠄⢿⣿⣿⣿⣷⣶⣶⣤⣤⣀⣀⡀⠄⠄⠉⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿ ⠄⠄⣿⡀⠄⠸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠂⠄⢠⣿⣿⣿⣿⣿⣿⣿⣿⣿ ⠄⠄⣿⡇⠄⠄⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠃⠄⢀⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿ ⠄⠄⣿⡇⠄⠠⣿⣿⣿⣿⣿⣿⣿⣿⡿⠋⠄⠄⣠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿ ⠄⠄⣿⠁⠄⠐⠛⠛⠛⠛⠉⠉⠉⠉⠄⠄⣠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿ ⠄⠄⠻⣦⣀⣀⣀⣀⣀⣀⣤⣤⣤⣤⣶⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠋⠄'}
    };

    request(requestParams, function(error, response, body) {
      expect(response.statusCode).to.equal(201);
      done();
    });
  });

  it('should respond with messages that were previously posted', function(done) {
    var requestParams = {method: 'POST',
      uri: 'http://127.0.0.1:3000/classes/messages',
      json: {
        username: 'NotSoBonoJono',
        text: '─────────────────▄▄█▀▀▀▀▀▀▀▄▄─ ───────────────▄█▀░░░░░░░░░░▀▀ ─────────────▄█▀░░░░░░░░░░░░░░ ────────────▄▀░░░░░░░░░░░░░░░░ ──────────▄█░░░░░░▄░░░░░░░░▄░░ ──────────█░░░░░░█▀█░░░░░░█▀█░ ─────▄───█░░░░░░░█─█░░░░░░█─█░ ─▄█▀██▀▄▄▀░░░░░░░█─█░░░░░░█─█░ ▀▒▒▒▒▒▀█▀▄▄░░░░░░███░░░░░░███░ ▒▒▄▄▄▒▒█▓▓▀▀█▄░░░███░░░░░░███░ ▒▄███▄▒█▓▓▓▓▓▀█▄░█▓█░░░░░░█▓█░ ▒█████▒█▓▓▓▓▓▓▓▀██▓█░░░░░░█▓█░ ▒▀███▀▒█▓▓▓▓▓▓▓▓█▀█▀░░░░░░▀█▀░ ▄▒▀▀▀▒█▄▄▄▄▓▓▓▓▓█░░░░░░░░░░░░░ ▀▄▒▒▒▒▄▀▀████▄▄▄█░░░░░░░░░░░░░ █▒▒▒▒▒█▓▓▓▓▓▓▀▀▀█░░░░░░░░░░░░░ █▒▒▒▒█▀▓▓▓▓▓▓▓▓▓█░█░░░░░░░░█░░ █▒▀▀▒█▓▓▓▓▓▓▓▓▓▄▀░██▄▄░░▄▄██░░ █▒▒▒▒█▓▓▓█▓▓▓▓▓█▄░░▀▀████▀▀░░░ ─█▄▄██▄▄▄▀▓▓▓▓▓█▀▄░░░░░░░░░░░░ ───█▀▄▓▓▄▄▓▓▓▓▓█░░█░░░░░░░░░░░ ───█░█▓█░░█▄▓▓█░░░█░░░░░░░░░░░ ───█░█▓█░░░█▓▓█░░▄▀░░░░░░░░░░░ ───▀▄█▓█▄▀▀█▓▓█░█░░░░░░░░░░░░░ ───▄▄█▓▓▀▀▀▄▄▀█▄▀▄░░░░░░░░░░░░ ─▄▀▒▒▒█▀▀▀▀░▄▀██░█░░░░░░░░░░░░ ▄▀▒▒▒▒█░░░░░█▄▀▀█▀░░░░░░░░░░░░'}
    };

    request(requestParams, function(error, response, body) {
      // Now if we request the log, that message we posted should be there:
      request('http://127.0.0.1:3000/classes/messages', function(error, response, body) {
        var messages = JSON.parse(body).results;
        expect(messages[0].username).to.equal('NotSoBonoJono');
        expect(messages[0].text).to.equal('─────────────────▄▄█▀▀▀▀▀▀▀▄▄─ ───────────────▄█▀░░░░░░░░░░▀▀ ─────────────▄█▀░░░░░░░░░░░░░░ ────────────▄▀░░░░░░░░░░░░░░░░ ──────────▄█░░░░░░▄░░░░░░░░▄░░ ──────────█░░░░░░█▀█░░░░░░█▀█░ ─────▄───█░░░░░░░█─█░░░░░░█─█░ ─▄█▀██▀▄▄▀░░░░░░░█─█░░░░░░█─█░ ▀▒▒▒▒▒▀█▀▄▄░░░░░░███░░░░░░███░ ▒▒▄▄▄▒▒█▓▓▀▀█▄░░░███░░░░░░███░ ▒▄███▄▒█▓▓▓▓▓▀█▄░█▓█░░░░░░█▓█░ ▒█████▒█▓▓▓▓▓▓▓▀██▓█░░░░░░█▓█░ ▒▀███▀▒█▓▓▓▓▓▓▓▓█▀█▀░░░░░░▀█▀░ ▄▒▀▀▀▒█▄▄▄▄▓▓▓▓▓█░░░░░░░░░░░░░ ▀▄▒▒▒▒▄▀▀████▄▄▄█░░░░░░░░░░░░░ █▒▒▒▒▒█▓▓▓▓▓▓▀▀▀█░░░░░░░░░░░░░ █▒▒▒▒█▀▓▓▓▓▓▓▓▓▓█░█░░░░░░░░█░░ █▒▀▀▒█▓▓▓▓▓▓▓▓▓▄▀░██▄▄░░▄▄██░░ █▒▒▒▒█▓▓▓█▓▓▓▓▓█▄░░▀▀████▀▀░░░ ─█▄▄██▄▄▄▀▓▓▓▓▓█▀▄░░░░░░░░░░░░ ───█▀▄▓▓▄▄▓▓▓▓▓█░░█░░░░░░░░░░░ ───█░█▓█░░█▄▓▓█░░░█░░░░░░░░░░░ ───█░█▓█░░░█▓▓█░░▄▀░░░░░░░░░░░ ───▀▄█▓█▄▀▀█▓▓█░█░░░░░░░░░░░░░ ───▄▄█▓▓▀▀▀▄▄▀█▄▀▄░░░░░░░░░░░░ ─▄▀▒▒▒█▀▀▀▀░▄▀██░█░░░░░░░░░░░░ ▄▀▒▒▒▒█░░░░░█▄▀▀█▀░░░░░░░░░░░░');
        done();
      });
    });
  });
  
  it('should accept nonstandard multi-line comments', function(done) {
    var requestParams = {method: 'POST',
      uri: 'http://127.0.0.1:3000/classes/messages',
      json: {
        username: 'NotSoBonoJono',
        text: meme1}
    };

    request(requestParams, function(error, response, body) {
      // Now if we request the log, that message we posted should be there:
      request('http://127.0.0.1:3000/classes/messages', function(error, response, body) {
        var messages = JSON.parse(body).results;
        expect(messages[0].username).to.equal('NotSoBonoJono');
        expect(messages[0].text).to.equal(meme1);
        done();
      });
    });
  });
  
  it('should accept nonstandard multi-line comments', function(done) {
    var requestParams = {method: 'POST',
      uri: 'http://127.0.0.1:3000/classes/messages',
      json: {
        username: 'NotSoBonoJono',
        text: lapras}
    };

    request(requestParams, function(error, response, body) {
      // Now if we request the log, that message we posted should be there:
      request('http://127.0.0.1:3000/classes/messages', function(error, response, body) {
        var messages = JSON.parse(body).results;
        expect(messages[0].username).to.equal('NotSoBonoJono');
        expect(messages[0].text).to.equal(lapras);
        done();
      });
    });
  });
  
  it('should accept nonstandard multi-line comments', function(done) {
    var requestParams = {method: 'POST',
      uri: 'http://127.0.0.1:3000/classes/messages',
      json: {
        username: 'NoPlayTERAKara',
        text: salt}
    };

    request(requestParams, function(error, response, body) {
      // Now if we request the log, that message we posted should be there:
      request('http://127.0.0.1:3000/classes/messages', function(error, response, body) {
        var messages = JSON.parse(body).results;
        expect(messages[0].username).to.equal('NoPlayTERAKara');
        expect(messages[0].text).to.equal(salt);
        done();
      });
    });
  });
  
  it('Should 404 when asked for a nonexistent endpoint', function(done) {
    request('http://127.0.0.1:3000/arglebargle', function(error, response, body) {
      expect(response.statusCode).to.equal(404);
      done();
    });
  });

  it('should respond to OPTIONS requests for /classes/messages with a 200 status code', function(done) {
    request('http://127.0.0.1:3000/classes/messages', function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

});
