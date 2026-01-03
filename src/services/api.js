import { storage } from "./storage";

const delay = (result, time = 650) =>
  new Promise((resolve) => setTimeout(() => resolve(result), time));

const updateData = (updater) => {
  const data = storage.loadData();
  const updated = updater({ ...data });
  storage.saveData(updated);
  return updated;
};

export const api = {
  async getDashboardStats() {
    const data = storage.loadData();
    const operativos = data.vehiculos.filter((v) => v.estado === "Operativo").length;
    const enMantenimiento = data.vehiculos.filter((v) => v.estado === "En service").length;
    const pendientes = data.solicitudes.filter((s) => s.estado === "Pendiente").length;
    const alertasCriticas = data.alertas.filter((a) => a.prioridad === "Crítica").length;

    return delay({ operativos, enMantenimiento, pendientes, alertasCriticas });
  },
  async getVehiculos() {
    return delay(storage.loadData().vehiculos);
  },
  async getVehiculoById(id) {
    const vehiculo = storage.loadData().vehiculos.find((item) => item.id === id);
    return delay(vehiculo);
  },
  async updateVehiculo(id, payload) {
    const updated = updateData((data) => {
      data.vehiculos = data.vehiculos.map((item) =>
        item.id === id ? { ...item, ...payload } : item
      );
      return data;
    });
    return delay(updated.vehiculos.find((item) => item.id === id));
  },
  async updateVtv(id, payload) {
    return api.updateVehiculo(id, { vtv: payload });
  },
  async updateService(id, payload) {
    return api.updateVehiculo(id, { service: payload });
  },
  async assignOperador(id, asignadoA) {
    return api.updateVehiculo(id, { asignadoA });
  },
  async getSolicitudes() {
    return delay(storage.loadData().solicitudes);
  },
  async createSolicitud(payload) {
    const updated = updateData((data) => {
      const nueva = {
        id: `sol-${Date.now()}`,
        createdAt: new Date().toISOString().slice(0, 10),
        estado: "Pendiente",
        historial: [{ estado: "Pendiente", fecha: new Date().toISOString().slice(0, 10), actor: "Operador" }],
        comentarios: [],
        ...payload,
      };
      data.solicitudes = [nueva, ...data.solicitudes];
      return data;
    });
    return delay(updated.solicitudes[0]);
  },
  async updateSolicitudStatus(id, estado, actor = "Director") {
    const updated = updateData((data) => {
      data.solicitudes = data.solicitudes.map((item) => {
        if (item.id !== id) return item;
        const historial = [
          ...item.historial,
          { estado, fecha: new Date().toISOString().slice(0, 10), actor },
        ];
        return { ...item, estado, historial };
      });
      return data;
    });
    return delay(updated.solicitudes.find((item) => item.id === id));
  },
  async assignMecanico(id, mecanico) {
    return api.updateSolicitudStatus(id, "En proceso", "Mecánico").then((item) => ({
      ...item,
      mecanico,
    }));
  },
  async closeSolicitud(id, resumen, costoFinal) {
    return api.updateSolicitudStatus(id, "Finalizada", "Mecánico").then((item) => ({
      ...item,
      cierre: { resumen, costoFinal },
    }));
  },
  async getMantenimientos() {
    return delay(storage.loadData().mantenimientos);
  },
  async createMantenimiento(payload) {
    const updated = updateData((data) => {
      const nuevo = {
        id: `mnt-${Date.now()}`,
        ...payload,
      };
      data.mantenimientos = [nuevo, ...data.mantenimientos];
      return data;
    });
    return delay(updated.mantenimientos[0]);
  },
  async getAlertas() {
    return delay(storage.loadData().alertas);
  },
  async resolveAlerta(id) {
    const updated = updateData((data) => {
      data.alertas = data.alertas.map((item) =>
        item.id === id ? { ...item, estado: "Resuelta" } : item
      );
      return data;
    });
    return delay(updated.alertas.find((item) => item.id === id));
  },
  async getHistorialEventos() {
    return delay(storage.loadData().eventos);
  },
  async getCatalogos() {
    return delay(storage.loadData().catalogos);
  },
  async updateCatalogos(payload) {
    const updated = updateData((data) => {
      data.catalogos = { ...data.catalogos, ...payload };
      return data;
    });
    return delay(updated.catalogos);
  },
};
