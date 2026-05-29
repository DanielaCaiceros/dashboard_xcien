export const networkStats = {
  capacityUsed: 4.2,
  capacityTotal: 10,
  interfacesUsed: 32,
  interfacesTotal: 200,
  ringNorthAvg: 68,
  ringSouthAvg: 78,
};

export const presencePoints = ['RT-SALT-01', 'RT-SALT-02', 'RT-MTY-01', 'RT-GDL-01'];

export const interfacesByPoint = {
  'RT-SALT-01': {
    total: 48,
    active: 42,
    capacityInUse: '7.2 Gbps',
    interfaces: [
      { name: 'Gi0/0', capacity: '1000 Mbps', traffic: '200 Mbps', utilization: 20, status: 'UP' },
      { name: 'Gi0/1', capacity: '100 Mbps', traffic: '80 Mbps', utilization: 80, status: 'CONGESTIONADO' },
      { name: 'Gi0/2', capacity: '1000 Mbps', traffic: '450 Mbps', utilization: 45, status: 'UP' },
      { name: 'Gi0/3', capacity: '1000 Mbps', traffic: '910 Mbps', utilization: 91, status: 'CONGESTIONADO' },
      { name: 'Gi0/4', capacity: '100 Mbps', traffic: '30 Mbps', utilization: 30, status: 'UP' },
    ],
  },
  'RT-SALT-02': {
    total: 36,
    active: 30,
    capacityInUse: '5.1 Gbps',
    interfaces: [
      { name: 'Gi0/0', capacity: '1000 Mbps', traffic: '600 Mbps', utilization: 60, status: 'UP' },
      { name: 'Gi0/1', capacity: '1000 Mbps', traffic: '150 Mbps', utilization: 15, status: 'UP' },
      { name: 'Gi0/2', capacity: '100 Mbps', traffic: '95 Mbps', utilization: 95, status: 'CONGESTIONADO' },
    ],
  },
  'RT-MTY-01': {
    total: 60,
    active: 55,
    capacityInUse: '9.8 Gbps',
    interfaces: [
      { name: 'Gi0/0', capacity: '10000 Mbps', traffic: '4200 Mbps', utilization: 42, status: 'UP' },
      { name: 'Gi0/1', capacity: '1000 Mbps', traffic: '870 Mbps', utilization: 87, status: 'CONGESTIONADO' },
    ],
  },
  'RT-GDL-01': {
    total: 24,
    active: 18,
    capacityInUse: '3.4 Gbps',
    interfaces: [
      { name: 'Gi0/0', capacity: '1000 Mbps', traffic: '320 Mbps', utilization: 32, status: 'UP' },
      { name: 'Gi0/1', capacity: '1000 Mbps', traffic: '110 Mbps', utilization: 11, status: 'UP' },
    ],
  },
};

export const ringData = [
  { name: 'Anillo Norte (Core)', utilization: 42 },
  { name: 'Anillo Sur (Access)', utilization: 78 },
];

export const capacityData = {
  subscriptionRatio: '3.5x',
  networkUsage: 28.8,
  realUsed: '7.2 Gbps',
  realUsedPercent: 29,
  promised: '25 Gbps',
  limitExceeded: true,
};

export const clientStats = {
  total: 600,
  corporate: { count: 100, percent: 55 },
  pyme: { count: 400, percent: 30 },
  empresarial: { count: 100, percent: 15 },
  growth: '+4.2% from last month',
};

export const clients = [
  { id: 'XCN-0042', name: 'TechSolutions Global S.A.', accessPoint: 'FO-SLT-NOD-01', type: 'Corporativo', slaHealth: 99.9, status: 'Activo' },
  { id: 'XCN-0821', name: 'Panadería El Porvenir', accessPoint: 'FO-SLT-NOD-04', type: 'PyME', slaHealth: 94.2, status: 'Mantenimiento' },
  { id: 'XCN-1255', name: 'Residencia Jardines Apt 402', accessPoint: 'FO-SLT-NOD-02', type: 'Residencial', slaHealth: 98.5, status: 'Activo' },
  { id: 'XCN-0091', name: 'Logistics Express Center', accessPoint: 'FO-SLT-NOD-01', type: 'Corporativo', slaHealth: 12.0, status: 'Inactivo' },
  { id: 'XCN-0112', name: 'MedTech Monterrey', accessPoint: 'FO-SLT-NOD-05', type: 'Corporativo', slaHealth: 99.9, status: 'Activo' },
  { id: 'XCN-0334', name: 'Distribuidora Noreste SA', accessPoint: 'FO-SLT-NOD-03', type: 'PyME', slaHealth: 97.1, status: 'Activo' },
  { id: 'XCN-0567', name: 'Hotel Gran Plaza', accessPoint: 'FO-SLT-NOD-02', type: 'Corporativo', slaHealth: 99.5, status: 'Activo' },
  { id: 'XCN-0789', name: 'Clínica Santa Fe', accessPoint: 'FO-SLT-NOD-04', type: 'Corporativo', slaHealth: 88.3, status: 'Mantenimiento' },
];
