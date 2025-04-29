// testRegistry.ts
import { register, getHealthyInstances, updateHealth } from './registry';
import { v4 as uuidv4 } from 'uuid';

const instance1 = {
  id: uuidv4(),
  url: 'http://localhost:3001',
  healthy: true,
};

const instance2 = {
  id: uuidv4(),
  url: 'http://localhost:3002',
  healthy: false,
};

// 註冊服務
register('user-service', instance1);
register('user-service', instance2);

// 驗證健康實例
console.log('Healthy instances:', getHealthyInstances('user-service'));

// 更新實例健康狀態
updateHealth('user-service', instance2.id, true);

// 再次檢查
console.log('Updated healthy instances:', getHealthyInstances('user-service'));
