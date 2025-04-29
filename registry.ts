// import { log } from "console";

// // registry.ts
// interface ServiceInstance {
//     id: string;
//     url: string;
//     healthy: boolean;
//   }
  
//   const services: { [key: string]: ServiceInstance[] } = {};
  
//   // 註冊服務
//   export function register(serviceName: string, instance: ServiceInstance) {
//     console.log('register');
//     if (!services[serviceName]) {
//       services[serviceName] = [];
//     }
//     services[serviceName].push(instance);
//     console.log(`Service registered: ${serviceName} - ${instance.url}`);
//   }
  
//   // 獲取健康的服務實例
//   export function getHealthyInstances(serviceName: string) {
//     console.log('getHealthyInstances')
//     return services[serviceName]?.filter(instance => instance.healthy) || [];
//   }
  
//   // 獲取所有服務實例
//   export function getAllInstances(serviceName: string) {
//     console.log('getAllInstances');
//     return services[serviceName] || [];
//   }
  