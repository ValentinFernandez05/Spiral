import React, { useEffect, useState } from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import Modal from "../components/ui/Modal";
import Select from "../components/ui/Select";
import TextArea from "../components/ui/TextArea";
import Input from "../components/ui/Input";
import Table from "../components/ui/Table";
import styles from "./SolicitudesPage.module.css";
import { api } from "../services/api";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";

const statusTone = (estado) => {
  if (estado === "Pendiente") return "warning";
  if (estado === "Finalizada") return "success";
  if (estado === "Rechazada") return "danger";
  return "info";
};

const SolicitudesPage = () => {
  const { session } = useAuth();
  const { notify } = useToast();
  const [solicitudes, setSolicitudes] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    vehiculoId: "veh-1",
    tipo: "Frenos",
    prioridad: "Media",
    descripcion: "",
  });

  const loadSolicitudes = () => {
    api.getSolicitudes().then(setSolicitudes);
  };

  useEffect(() => {
    loadSolicitudes();
  }, []);

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleCreate = async () => {
    await api.createSolicitud(form);
    notify("Solicitud creada", "success");
    setOpen(false);
    loadSolicitudes();
  };

  const handleStatus = async (id, estado) => {
    await api.updateSolicitudStatus(id, estado, session?.rol === "DIRECTOR" ? "Director" : "Mecánico");
    notify("Estado actualizado", "success");
    loadSolicitudes();
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Solicitudes</h1>
        <p className="page-subtitle">
          Ordenes de trabajo con trazabilidad completa de aprobación.
        </p>
      </div>
      <div className={styles.actions}>
        <Button variant="primary" onClick={() => setOpen(true)}>
          Crear solicitud
        </Button>
      </div>
      <Card>
        <Table
          columns={[
            { key: "createdAt", label: "Fecha" },
            { key: "tipo", label: "Tipo" },
            { key: "prioridad", label: "Prioridad" },
            {
              key: "estado",
              label: "Estado",
              render: (row) => <Badge tone={statusTone(row.estado)}>{row.estado}</Badge>,
            },
            {
              key: "acciones",
              label: "Acciones",
              render: (row) => (
                <div className={styles.tableActions}>
                  {session?.rol === "DIRECTOR" && row.estado === "Pendiente" && (
                    <>
                      <button className={styles.linkButton} onClick={() => handleStatus(row.id, "Aprobada")}>
                        Aprobar
                      </button>
                      <button className={styles.linkButton} onClick={() => handleStatus(row.id, "Rechazada")}>
                        Rechazar
                      </button>
                    </>
                  )}
                  {session?.rol === "MECANICO" && row.estado === "Aprobada" && (
                    <button className={styles.linkButton} onClick={() => handleStatus(row.id, "En proceso")}>
                      Iniciar
                    </button>
                  )}
                  {session?.rol === "MECANICO" && row.estado === "En proceso" && (
                    <button className={styles.linkButton} onClick={() => handleStatus(row.id, "Finalizada")}>
                      Finalizar
                    </button>
                  )}
                </div>
              ),
            },
          ]}
          data={solicitudes}
          emptyMessage="No hay solicitudes registradas."
        />
      </Card>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Crear solicitud"
        footer={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleCreate}>
              Guardar
            </Button>
          </>
        }
      >
        <Select
          label="Vehículo"
          value={form.vehiculoId}
          onChange={handleChange("vehiculoId")}
          options={[
            { value: "veh-1", label: "Toyota Hilux SRX" },
            { value: "veh-2", label: "Ford Ranger LTD" },
            { value: "veh-3", label: "Renault Kangoo" },
          ]}
        />
        <Select
          label="Tipo"
          value={form.tipo}
          onChange={handleChange("tipo")}
          options={[
            { value: "Frenos", label: "Frenos" },
            { value: "Neumáticos", label: "Neumáticos" },
            { value: "Eléctrico", label: "Eléctrico" },
          ]}
        />
        <Select
          label="Prioridad"
          value={form.prioridad}
          onChange={handleChange("prioridad")}
          options={[
            { value: "Baja", label: "Baja" },
            { value: "Media", label: "Media" },
            { value: "Alta", label: "Alta" },
            { value: "Crítica", label: "Crítica" },
          ]}
        />
        <TextArea
          label="Descripción"
          value={form.descripcion}
          onChange={handleChange("descripcion")}
          placeholder="Detalle la solicitud y adjuntos relevantes."
        />
        <Input label="Costo estimado" placeholder="$ 120.000" />
      </Modal>
    </div>
  );
};

export default SolicitudesPage;
