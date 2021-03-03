const http = require('http')
const fs = require('fs')
const url = require('url')
const querystring = require('querystring')

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });

  const baseUrl = url.parse(req.url);
  const query = querystring.parse(baseUrl.query);
  if (baseUrl.pathname === '/age') {
    //caluculating age
    var today = new Date();
    var age = today.getFullYear() - query.year;
    var m = today.getMonth() - query.month;
    if (m < 0 || (m === 0 && today.getDate() < query.date)) {
      age--;
    }
    res.write(`<p>Hello ${query.name}</p>`);
    res.write(`<p>you are currently ${age} years old</p>`);

    res.end();
  }
  else if (baseUrl.pathname === '/vegetables') {
    //reading json from external file
    const data = fs.readFileSync('vegetables.json')
    res.writeHead(200, { 'Content-Type': 'application/json' });

    res.end(JSON.stringify(JSON.parse(data)));

  }
  else if (baseUrl.pathname === '/metrics') {
    let radius = query.radius
    const object = query.object
    const metric = query.metric
    let data;
    //area of circle
    if (object === 'circle' && metric === 'area') {

      data = Math.PI * radius * radius;
    }

    //volume of shpere
    else if (object === 'sphere' && metric === 'volume') {
      {
        radius = Math.abs(radius);
        data = (4 / 3) * Math.PI * Math.pow(radius, 3);
      }
    }
    //Cut the floating digits to two float
    data = data.toFixed(2);

    res.write(`${metric} of ${object} ${data}`)
    res.end();
  }
  else {
    res.write('Error- 404: Url not found')
  }
})

server.listen(8080) 