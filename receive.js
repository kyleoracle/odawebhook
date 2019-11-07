const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  
     console.log('')
     // request.method, URL and httpVersion
     console.log(req.method + ' ' + req.url + ' HTTP/' + req.httpVersion);

     // request.headers
     for (var property in req.headers) {
         if (req.headers.hasOwnProperty(property)) {
             console.log(property + ': ' + req.headers[property])
         }
     }

     // body
     let body = '';
     req.on("data", function (data) {
      body += data;
    });
    req.on("end", function () { 
      console.log('body=' + body)
    });
    
  res.statusCode = 200;
  // text
  // res.setHeader('Content-Type', 'text/plain');
  // res.end('Hello World\n');

  // json
  res.setHeader('Content-Type', 'application/json');
  let json = {
    "name":"kyle"
  };
  res.end(JSON.stringify(json));

});




server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});




