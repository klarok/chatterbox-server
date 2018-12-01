/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
const url = require('url');

var storage = [];

var requestHandler = function(request, response) {
  // console.log('Serving request type ' + request.method + ' for url ' + request.url);
  
  var defaultCorsHeaders = {
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'access-control-allow-headers': 'content-type, accept',
    'access-control-max-age': 10 // Seconds.
  };
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = 'application/json';
  
  let requestURL = url.parse(request.url);
  // console.log(request);
  
  if (requestURL.pathname === '/classes/messages') {
    if (request.method === 'GET') {
      data = storage;
      response.writeHead(200, headers);
      response.end(JSON.stringify({ results: data }));
    }
    
    if (request.method === 'POST') {
      console.log('hi');
      let body = [];
      request.on('data', chunk => {
        body.push(chunk);
      }).on('end', () => {
        let bodyObj = JSON.parse(Buffer.concat(body).toString());
        storage.unshift(bodyObj);
        response.writeHead(201, headers);
        console.log(bodyObj, 'what');
        response.end('{}');
      });
    }
    
    if (request.method === 'OPTIONS') {
      // console.log('options');
      response.writeHead(200, headers);
      response.end();
    }
  } else {
    response.writeHead(404, headers);
    response.end();
  }
};

exports.requestHandler = requestHandler;



// var requestHandler = function(request, response) {
//   var statusCode = 200;
//   var headers = defaultCorsHeaders;
//   headers['Content-Type'] = 'application/json';
  
//   if (request.url === '/classes/message') {
//     if (request.method === 'GET') {
//         fs.readFile(path, 'utf8', function(err, data) {
//           if (err) {
//             response.writeHead(404);
//             response.end();
//           } else {
//             data = JSON.Parse('[' + data + ']');
//             response.writeHead(200, headers);
//             response.end(JSON.stringify({results: data}));
//           }
//         });
//     } else if (request.method === 'POST') {
//       request.on('data', function(){
//         fs.appendFile(path, [option], function(err) {
//           if (err) {
//             response.writeHead(404);
//           } else {
//             response.writeHead(201, headers);
//           }
//         })
//         request.on('end', function () {
//           response.end('{"Success": "Success", "sourceCode": 201}')
//         })
//       })
//     }
//   } response.writeHead(404, headers)
//   response.end
// }