const http = require('http');

const tasks = [];
let nextId = 1;

function sendJson(res, status, data) {
  const body = JSON.stringify(data);
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(body),
  });
  res.end(body);
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const id = url.pathname.split('/')[2];

  if (req.method === 'GET' && url.pathname === '/tasks') {
    return sendJson(res, 200, tasks);
  }

  if (req.method === 'GET' && id) {
    const task = tasks.find((item) => item.id === Number(id));
    return task ? sendJson(res, 200, task) : sendJson(res, 404, { error: 'Task not found' });
  }

  if (req.method === 'POST' && url.pathname === '/tasks') {
    try {
      const body = await parseBody(req);
      if (!body || typeof body.title !== 'string') {
        return sendJson(res, 400, { error: 'Task title is required' });
      }
      const task = { id: nextId++, title: body.title, completed: false };
      tasks.push(task);
      return sendJson(res, 201, task);
    } catch (err) {
      return sendJson(res, 400, { error: 'Invalid JSON body' });
    }
  }

  if ((req.method === 'PUT' || req.method === 'PATCH') && id) {
    try {
      const body = await parseBody(req);
      const task = tasks.find((item) => item.id === Number(id));
      if (!task) return sendJson(res, 404, { error: 'Task not found' });
      if (typeof body.title === 'string') task.title = body.title;
      if (typeof body.completed === 'boolean') task.completed = body.completed;
      return sendJson(res, 200, task);
    } catch (err) {
      return sendJson(res, 400, { error: 'Invalid JSON body' });
    }
  }

  if (req.method === 'DELETE' && id) {
    const index = tasks.findIndex((item) => item.id === Number(id));
    if (index < 0) return sendJson(res, 404, { error: 'Task not found' });
    const deleted = tasks.splice(index, 1)[0];
    return sendJson(res, 200, deleted);
  }

  sendJson(res, 404, { error: 'Endpoint not found' });
});

const port = 3000;
server.listen(port, () => {
  console.log(`TODO API server running at http://localhost:${port}`);
  console.log('Endpoints:');
  console.log('  GET    /tasks');
  console.log('  GET    /tasks/:id');
  console.log('  POST   /tasks');
  console.log('  PUT    /tasks/:id');
  console.log('  DELETE /tasks/:id');
});
