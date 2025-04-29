// registry.ts
import { v4 as uuidv4 } from 'uuid';

interface ServiceInstance {
  id: string;
  url: string;
  healthy: boolean;
}

const registry = new Map<string, ServiceInstance[]>();

export function register(serviceName: string, instance: ServiceInstance) {
  if (!registry.has(serviceName)) {
    registry.set(serviceName, []);
  }
  registry.get(serviceName)?.push(instance);
}

export function getHealthyInstances(serviceName: string): ServiceInstance[] {
  return (registry.get(serviceName) || []).filter(i => i.healthy);
}

export function updateHealth(serviceName: string, instanceId: string, healthy: boolean) {
  const instances = registry.get(serviceName);
  if (!instances) return;
  const inst = instances.find(i => i.id === instanceId);
  if (inst) inst.healthy = healthy;
}
