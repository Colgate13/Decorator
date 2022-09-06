import http, { IncomingMessage, ServerResponse } from 'node:http';
import { InjectHttpInterceptor } from '../agent';
InjectHttpInterceptor();

function handler(request: IncomingMessage, response: ServerResponse) {
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.end('Hello World');
}

const server = http.createServer(handler);
const port = 3000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});