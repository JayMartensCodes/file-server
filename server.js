const net = require('net');
const fs = require('fs');
const server = net.createServer();

server.listen(3000, () => {
  console.log('Server listening on port 3000!');
});

server.on('connection', (client) => {
  console.log('New client connected!');
  client.setEncoding('utf8'); // interpret data as text
  client.on('data', (data) => {
    console.log(data)
    if (fs.existsSync(data)) {
      fs.readFile(data, (err, file) => {
        client.write(`File found!: ${file}`);
      });
    } else {
      client.write(`File not found!`);
    }
  });
});