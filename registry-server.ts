import express from 'express';

const app = express();
const port = 4000;

app.use(express.json());

interface ServiceInstance {
  id: string;
  url: string;
  healthy: boolean;
}

const registry: Record<string, ServiceInstance[]> = {};

// 註冊服務
app.post('/register', (req, res) => {
  const { serviceName, instance } = req.body;

  if (!registry[serviceName]) {
    registry[serviceName] = [];
  }

  // 避免重複註冊相同 ID
  const exists = registry[serviceName].some(i => i.id === instance.id);
  if (!exists) {
    registry[serviceName].push(instance);
    console.log(`Service registered: ${serviceName} - ${instance.url}`);
  }

  res.status(200).send({ success: true });
});

// 查詢健康的實例
app.get('/instances/:serviceName', (req, res) => {
  const serviceName = req.params.serviceName;
  const instances = registry[serviceName] || [];
  const healthy = instances.filter(i => i.healthy);
  res.send(healthy);
});

app.listen(port, () => {
  console.log(`Registry server running at http://localhost:${port}`);
});
