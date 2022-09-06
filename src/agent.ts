import Http from 'node:http';

async function InjectHttpInterceptor() {
  const oldEmit = Http.Server.prototype.emit;
  Http.Server.prototype.emit = function (...args: any) {
    const [type, request, response] = args;

    if (type === 'request') {
      console.log("Intercepted request");
      response.setHeader('X-Instrumented-By', 'ErickWendel')
    }

    return oldEmit.apply(this, args);
  };


}

export { InjectHttpInterceptor };