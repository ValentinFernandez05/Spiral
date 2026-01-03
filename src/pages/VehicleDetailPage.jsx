import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import DatePicker from "../components/ui/DatePicker";
import Table from "../components/ui/Table";
import styles from "./VehicleDetailPage.module.css";
import { api } from "../services/api";
import { useToast } from "../contexts/ToastContext";

const VehicleDetailPage = () => {
  const { id } = useParams();
  const { notify } = useToast();
  const [vehicle, setVehicle] = useState(null);
  const [operador, setOperador] = useState("");
  const [vtv, setVtv] = useState({ estado: "", vencimiento: "" });
  const [service, setService] = useState({ ultimo: "", kmUltimo: "", proximoKm: "" });
  const [mantenimientos, setMantenimientos] = useState([]);
  const [solicitudes, setSolicitudes] = useState([]);

  useEffect(() => {
    api.getVehiculoById(id).then((data) => {
      setVehicle(data);
      setOperador(data.asignadoA);
      setVtv(data.vtv);
      setService(data.service);
    });
    api.getMantenimientos().then((data) =>
      setMantenimientos(data.filter((item) => item.vehiculoId === id))
    );
    api.getSolicitudes().then((data) => setSolicitudes(data.filter((item) => item.vehiculoId === id)));
  }, [id]);

  if (!vehicle) return <div className="page">Cargando...</div>;

  const handleSave = async (action) => {
    await action();
    notify("Actualización guardada", "success");
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">
          {vehicle.marca} {vehicle.modelo}
        </h1>
        <p className="page-subtitle">Patente {vehicle.patente}</p>
      </div>
      <div className={styles.actions}>
        <Button variant="primary">Crear solicitud</Button>
        <Button variant="secondary">Registrar mantenimiento</Button>
        <Button variant="ghost">Cambiar estado</Button>
      </div>
      <div className={styles.grid}>
        <Card>
          <h3>Resumen</h3>
          <div className={styles.summary}>
            <span>Año: {vehicle.anio}</span>
            <span>Kilometraje: {vehicle.km.toLocaleString("es-AR")} km</span>
            <Badge tone={vehicle.estado === "Operativo" ? "success" : "warning"}>
              {vehicle.estado}
            </Badge>
          </div>
        </Card>
        <Card>
          <h3>Asignación de operador</h3>
          <Input
            label="Operador asignado"
            value={operador}
            onChange={(event) => setOperador(event.target.value)}
          />
          <Button
            variant="secondary"
            onClick={() => handleSave(() => api.assignOperador(id, operador))}
          >
            Guardar asignación
          </Button>
        </Card>
        <Card>
          <h3>VTV</h3>
          <Input
            label="Estado"
            value={vtv.estado}
            onChange={(event) => setVtv((prev) => ({ ...prev, estado: event.target.value }))}
          />
          <DatePicker
            label="Vencimiento"
            value={vtv.vencimiento}
            onChange={(event) => setVtv((prev) => ({ ...prev, vencimiento: event.target.value }))}
          />
          <Button variant="secondary" onClick={() => handleSave(() => api.updateVtv(id, vtv))}>
            Guardar VTV
          </Button>
        </Card>
        <Card>
          <h3>Service</h3>
          <DatePicker
            label="Último service"
            value={service.ultimo}
            onChange={(event) => setService((prev) => ({ ...prev, ultimo: event.target.value }))}
          />
          <Input
            label="Kilometraje último"
            value={service.kmUltimo}
            onChange={(event) => setService((prev) => ({ ...prev, kmUltimo: event.target.value }))}
          />
          <Input
            label="Próximo recomendado"
            value={service.proximoKm}
            onChange={(event) => setService((prev) => ({ ...prev, proximoKm: event.target.value }))}
          />
          <Button variant="secondary" onClick={() => handleSave(() => api.updateService(id, service))}>
            Guardar service
          </Button>
        </Card>
      </div>
      <div className={styles.tables}>
        <Card>
          <h3>Historial de mantenimientos</h3>
          <Table
            columns={[
              { key: "fecha", label: "Fecha" },
              { key: "tipo", label: "Tipo" },
              { key: "total", label: "Costo" },
            ]}
            data={mantenimientos.map((item) => ({
              ...item,
              total: `$ ${item.total.toLocaleString("es-AR")}`,
            }))}
            emptyMessage="Sin registros de mantenimiento."
          />
        </Card>
        <Card>
          <h3>Solicitudes asociadas</h3>
          <Table
            columns={[
              { key: "createdAt", label: "Fecha" },
              { key: "tipo", label: "Tipo" },
              { key: "estado", label: "Estado" },
            ]}
            data={solicitudes}
            emptyMessage="No hay solicitudes vinculadas."
          />
        </Card>
      </div>
      <div className={styles.attachments}>
        <Card>
          <h3>Adjuntos</h3>
          <div className={styles.attachmentList}>
            <button className={styles.attachment}>Ver factura</button>
            <button className={styles.attachment}>Ver orden de trabajo</button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default VehicleDetailPage;
