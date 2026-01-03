import React, { useEffect, useState } from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import Input from "../components/ui/Input";
import Table from "../components/ui/Table";
import styles from "./AdminPage.module.css";
import { api } from "../services/api";
import { useToast } from "../contexts/ToastContext";

const AdminPage = () => {
  const { notify } = useToast();
  const [catalogos, setCatalogos] = useState(null);
  const [open, setOpen] = useState(false);
  const [activeKey, setActiveKey] = useState("");
  const [newValue, setNewValue] = useState("");

  const loadCatalogos = () => {
    api.getCatalogos().then(setCatalogos);
  };

  useEffect(() => {
    loadCatalogos();
  }, []);

  const openModal = (key) => {
    setActiveKey(key);
    setNewValue("");
    setOpen(true);
  };

  const handleAdd = async () => {
    const updated = {
      ...catalogos,
      [activeKey]: [...catalogos[activeKey], newValue],
    };
    await api.updateCatalogos(updated);
    notify("Catálogo actualizado", "success");
    setOpen(false);
    loadCatalogos();
  };

  if (!catalogos) return <div className="page">Cargando...</div>;

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Administración</h1>
        <p className="page-subtitle">Configuración y catálogos centrales.</p>
      </div>
      <div className={styles.grid}>
        <Card>
          <div className={styles.cardHeader}>
            <h3>Tipos de mantenimiento</h3>
            <Button size="sm" variant="secondary" onClick={() => openModal("tiposMantenimiento")}>
              Agregar
            </Button>
          </div>
          <Table
            columns={[{ key: "item", label: "Tipo" }]}
            data={catalogos.tiposMantenimiento.map((item, index) => ({ id: index, item }))}
          />
        </Card>
        <Card>
          <div className={styles.cardHeader}>
            <h3>Tipos de solicitud</h3>
            <Button size="sm" variant="secondary" onClick={() => openModal("tiposSolicitud")}>
              Agregar
            </Button>
          </div>
          <Table
            columns={[{ key: "item", label: "Tipo" }]}
            data={catalogos.tiposSolicitud.map((item, index) => ({ id: index, item }))}
          />
        </Card>
        <Card>
          <div className={styles.cardHeader}>
            <h3>Prioridades</h3>
            <Button size="sm" variant="secondary" onClick={() => openModal("prioridades")}>
              Agregar
            </Button>
          </div>
          <Table
            columns={[{ key: "item", label: "Prioridad" }]}
            data={catalogos.prioridades.map((item, index) => ({ id: index, item }))}
          />
        </Card>
        <Card>
          <div className={styles.cardHeader}>
            <h3>Estados disponibles</h3>
            <Button size="sm" variant="secondary" onClick={() => openModal("estadosSolicitud")}>
              Agregar
            </Button>
          </div>
          <Table
            columns={[{ key: "item", label: "Estado" }]}
            data={catalogos.estadosSolicitud.map((item, index) => ({ id: index, item }))}
          />
        </Card>
        <Card>
          <div className={styles.cardHeader}>
            <h3>Parámetros de service</h3>
          </div>
          <p className={styles.label}>Regla cada X km</p>
          <Input value={catalogos.serviceReglaKm} readOnly />
        </Card>
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Agregar ítem"
        footer={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleAdd} disabled={!newValue}>
              Guardar
            </Button>
          </>
        }
      >
        <Input
          label="Nombre"
          value={newValue}
          onChange={(event) => setNewValue(event.target.value)}
        />
      </Modal>
    </div>
  );
};

export default AdminPage;
