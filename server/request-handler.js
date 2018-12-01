/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
const url = require('url');
var storage = require('./storage.js')['storage'];
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

var requestHandler = function(request, response) {
  console.log('Serving request type ' + request.method + ' for url ' + request.url);
  
  let requestURL = url.parse(request.url);
  console.log(requestURL);
  
  var routes = {
    '/classes/messages' : true
  };
  
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = 'application/json';
  
  var statusCode = 200;
  var data = null;
  
  if (!routes.hasOwnProperty(requestURL.pathname)) {
    statusCode = 404;
  }
  
  
  if (request.method === 'GET') {
    data = storage;
  }
  if (request.method === 'POST') {
    statusCode = 201;
    // storage.unshift(request._postData);
    // data = storage;
    // console.log(request._postData);
    request.on('data', chunk => {
      let d = JSON.parse(chunk.toString('utf8'));
      storage.unshift(d);
      // console.log(d);
      // console.log(storage);
    });
  }
  
  response.writeHead(statusCode, headers);
  response.end(JSON.stringify({ results: data }));
};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.


exports.requestHandler = requestHandler;