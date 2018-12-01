const url = require('url');

var example = {username: 'Admin', createdAt: new Date(), text: 'Have fun :)', objectId: 0};
var storage = [example];
var currentId = 1;

var requestHandler = function(request, response) {  
  var defaultCorsHeaders = {
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'access-control-allow-headers': 'content-type, accept',
    'access-control-max-age': 10 // Seconds.
  };
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = 'application/json';
  
  var requestURL = url.parse(request.url);
  
  if (requestURL.pathname === '/classes/messages') {
    if (request.method === 'GET') {
      data = storage;
      response.writeHead(200, headers);
      response.end(JSON.stringify({ results: data }));
    }
    
    if (request.method === 'POST') {
      var message = [];
      
      request.on('data', chunk => { //Read message data from stream
        message.push(chunk);
      });
      request.on('end', () => {
        var messageObj = JSON.parse(Buffer.concat(message).toString());
        messageObj.objectId = currentId
        messageObj.createdAt = new Date();
        currentId++;
        storage.unshift(messageObj);
        response.writeHead(201, headers);
        //Return objectId and createdAt for modifying the client-side message object
        response.end(JSON.stringify({objectId: messageObj.objectId, createdAt: messageObj.createdAt}));
      });
    }
    
    if (request.method === 'OPTIONS') {
      response.writeHead(200, headers);
      response.end();
    }
  } else {
    response.writeHead(404, headers);
    response.end();
  }
};

exports.requestHandler = requestHandler;