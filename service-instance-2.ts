import express, { Request, Response } from 'express';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const port = process.argv[2] || '3002';
const instanceId = uuidv4();

const instanceInfo = {
  id: instanceId,
  url: `http://localhost:${port}`,
  healthy: true,
};

// 註冊到註冊中心
async function register() {
  try {
    await axios.post('http://localhost:4000/register', {
      serviceName: 'user-service',
      instance: instanceInfo,
    });
    console.log(`Registered instance ${port} to registry`);
  } catch (err) {
    console.error('Failed to register:', err);
  }
}

// 提供 /user API
app.get('/user', (req: Request, res: Response) => {
  res.send({ user: 'Bob', from: `instance-${port}` });
});

// 啟動服務後註冊
app.listen(Number(port), () => {
  console.log(`User service running at http://localhost:${port}`);
  register();
});
