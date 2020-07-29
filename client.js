const net = require('net');
const process = require('process');
const readline = require('readline');

readline.emitKeypressEvents(process.stdin);

// setting up stdin
const stdin = process.stdin;
stdin.setRawMode(true);
stdin.setEncoding('utf8');
stdin.resume();

// setting up readline
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const conn = net.createConnection({
  host: 'localhost', // change to IP address of computer or ngrok host if tunneling
  port: 3000 // or change to the ngrok port if tunneling
});

conn.setEncoding('utf8'); // interpret data as text

conn.on('data', (data) => {
  console.log('Server says: ', data);
  process.exit();
});

conn.on('connect', () => {
  console.log(`Connected To Server!`);
  requestFile();
});

const requestFile = () => {
  rl.question(`What file are you looking for? :` , (answer) => {
    conn.write(`${answer}`);
  });
};