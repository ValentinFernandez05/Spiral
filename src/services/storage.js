const STORAGE_KEY = "crm_flota_data";

const seedData = {
  vehiculos: [
    {
      id: "veh-1",
      patente: "AD 342 XQ",
      marca: "Toyota",
      modelo: "Hilux SRX",
      anio: 2022,
      km: 48200,
      estado: "Operativo",
      asignadoA: "Lucía Torres",
      vtv: { estado: "Vigente", vencimiento: "2025-11-18" },
      service: { ultimo: "2024-06-12", kmUltimo: 42000, proximoKm: 50000 },
    },
    {
      id: "veh-2",
      patente: "AE 114 PF",
      marca: "Ford",
      modelo: "Ranger LTD",
      anio: 2021,
      km: 73900,
      estado: "En service",
      asignadoA: "Nicolás Vega",
      vtv: { estado: "Próxima", vencimiento: "2024-12-02" },
      service: { ultimo: "2024-03-05", kmUltimo: 68000, proximoKm: 76000 },
    },
    {
      id: "veh-3",
      patente: "AC 998 KT",
      marca: "Renault",
      modelo: "Kangoo",
      anio: 2020,
      km: 112500,
      estado: "Fuera de servicio",
      asignadoA: "Equipo logística",
      vtv: { estado: "Vencida", vencimiento: "2024-09-30" },
      service: { ultimo: "2024-01-22", kmUltimo: 105000, proximoKm: 115000 },
    },
    {
      id: "veh-4",
      patente: "AF 220 LR",
      marca: "Volkswagen",
      modelo: "Amarok",
      anio: 2023,
      km: 28400,
      estado: "Operativo",
      asignadoA: "María Gómez",
      vtv: { estado: "Vigente", vencimiento: "2026-01-12" },
      service: { ultimo: "2024-08-02", kmUltimo: 24000, proximoKm: 30000 },
    },
  ],
  solicitudes: [
    {
      id: "sol-1",
      vehiculoId: "veh-2",
      tipo: "Cambio de frenos",
      prioridad: "Alta",
      descripcion: "Revisión de pastillas delanteras y traseras.",
      estado: "Pendiente",
      createdAt: "2024-10-02",
      historial: [
        { estado: "Pendiente", fecha: "2024-10-02", actor: "Operador" },
      ],
      comentarios: [
        { autor: "Operador", mensaje: "Se detectó vibración al frenar.", fecha: "2024-10-02" },
      ],
    },
    {
      id: "sol-2",
      vehiculoId: "veh-3",
      tipo: "Service 110k",
      prioridad: "Crítica",
      descripcion: "Service completo + revisión de transmisión.",
      estado: "En proceso",
      createdAt: "2024-09-20",
      historial: [
        { estado: "Pendiente", fecha: "2024-09-20", actor: "Operador" },
        { estado: "Aprobada", fecha: "2024-09-21", actor: "Director" },
        { estado: "En proceso", fecha: "2024-09-23", actor: "Mecánico" },
      ],
      comentarios: [],
    },
    {
      id: "sol-3",
      vehiculoId: "veh-1",
      tipo: "Cambio de neumáticos",
      prioridad: "Media",
      descripcion: "Desgaste en eje trasero.",
      estado: "Finalizada",
      createdAt: "2024-08-12",
      historial: [
        { estado: "Pendiente", fecha: "2024-08-12", actor: "Operador" },
        { estado: "Aprobada", fecha: "2024-08-13", actor: "Director" },
        { estado: "En proceso", fecha: "2024-08-15", actor: "Mecánico" },
        { estado: "Finalizada", fecha: "2024-08-18", actor: "Mecánico" },
      ],
      comentarios: [{ autor: "Mecánico", mensaje: "Neumáticos reemplazados.", fecha: "2024-08-18" }],
    },
  ],
  mantenimientos: [
    {
      id: "mnt-1",
      vehiculoId: "veh-1",
      tipo: "Preventivo",
      fecha: "2024-08-18",
      km: 45000,
      items: ["Neumáticos", "Alineación"],
      manoObra: 32000,
      repuestos: 180000,
      total: 212000,
      mecanico: "Roberto Medina",
      solicitudId: "sol-3",
    },
    {
      id: "mnt-2",
      vehiculoId: "veh-2",
      tipo: "Correctivo",
      fecha: "2024-10-05",
      km: 72000,
      items: ["Pastillas de freno", "Discos"],
      manoObra: 48000,
      repuestos: 92000,
      total: 140000,
      mecanico: "Valeria Díaz",
      solicitudId: "sol-1",
    },
  ],
  alertas: [
    {
      id: "alert-1",
      tipo: "VTV vencida",
      prioridad: "Crítica",
      vehiculoId: "veh-3",
      mensaje: "VTV vencida el 30/09/2024.",
      estado: "Activa",
    },
    {
      id: "alert-2",
      tipo: "Service próximo",
      prioridad: "Media",
      vehiculoId: "veh-2",
      mensaje: "Service recomendado en 7.000 km.",
      estado: "Activa",
    },
    {
      id: "alert-3",
      tipo: "Solicitud pendiente",
      prioridad: "Alta",
      vehiculoId: "veh-2",
      mensaje: "Solicitud pendiente hace 10 días.",
      estado: "Activa",
    },
  ],
  eventos: [
    {
      id: "evt-1",
      tipo: "Solicitud creada",
      detalle: "Cambio de frenos para Ford Ranger LTD.",
      fecha: "2024-10-02",
      rol: "Operador",
    },
    {
      id: "evt-2",
      tipo: "Mantenimiento registrado",
      detalle: "Preventivo para Toyota Hilux SRX.",
      fecha: "2024-08-18",
      rol: "Mecánico",
    },
    {
      id: "evt-3",
      tipo: "Vehículo fuera de servicio",
      detalle: "Renault Kangoo marcada fuera de servicio.",
      fecha: "2024-09-28",
      rol: "Administrador",
    },
  ],
  catalogos: {
    tiposMantenimiento: ["Preventivo", "Correctivo", "Predictivo"],
    tiposSolicitud: ["Frenos", "Neumáticos", "Motor", "Carrocería", "Eléctrico"],
    prioridades: ["Baja", "Media", "Alta", "Crítica"],
    estadosSolicitud: ["Pendiente", "Aprobada", "Rechazada", "En proceso", "Finalizada"],
    serviceReglaKm: 10000,
  },
};

const loadData = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(seedData));
  return seedData;
};

const saveData = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const storage = {
  loadData,
  saveData,
  STORAGE_KEY,
};
