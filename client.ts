import axios from 'axios';

interface ServiceInstance {
  id: string;
  url: string;
  healthy: boolean;
}

async function main() {
  try {
    // 1. 取得健康的 user-service 實例
    const response = await axios.get<ServiceInstance[]>('http://localhost:4000/instances/user-service');
    const instances = response.data;

    if (instances.length === 0) {
      console.log('❌ No healthy instances available.');
      return;
    }

    // 2. 隨機選一個
    const instance = instances[Math.floor(Math.random() * instances.length)];
    console.log(`✅ Sending request to: ${instance.url}/user`);

    // 3. 呼叫該實例
    const userResponse = await axios.get(`${instance.url}/user`);
    console.log('📦 Response:', userResponse.data);
  } catch (err) {
    console.error('❌ Error:', err);
  }
}

main();
