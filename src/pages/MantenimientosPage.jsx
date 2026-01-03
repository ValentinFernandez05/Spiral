import React, { useEffect, useState } from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import Select from "../components/ui/Select";
import Input from "../components/ui/Input";
import TextArea from "../components/ui/TextArea";
import Table from "../components/ui/Table";
import styles from "./MantenimientosPage.module.css";
import { api } from "../services/api";
import { useToast } from "../contexts/ToastContext";

const MantenimientosPage = () => {
  const { notify } = useToast();
  const [mantenimientos, setMantenimientos] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    vehiculoId: "veh-1",
    tipo: "Preventivo",
    fecha: "",
    km: "",
    items: "",
    manoObra: "",
    repuestos: "",
  });

  const loadMantenimientos = () => {
    api.getMantenimientos().then(setMantenimientos);
  };

  useEffect(() => {
    loadMantenimientos();
  }, []);

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleCreate = async () => {
    const total = Number(form.manoObra || 0) + Number(form.repuestos || 0);
    await api.createMantenimiento({
      ...form,
      items: form.items.split(",").map((item) => item.trim()),
      total,
      mecanico: "Valeria Díaz",
    });
    notify("Mantenimiento registrado", "success");
    setOpen(false);
    loadMantenimientos();
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Mantenimientos</h1>
        <p className="page-subtitle">
          Registro de correctivos y preventivos, con costos asociados.
        </p>
      </div>
      <div className={styles.actions}>
        <Button variant="primary" onClick={() => setOpen(true)}>
          Registrar mantenimiento
        </Button>
      </div>
      <Card>
        <Table
          columns={[
            { key: "fecha", label: "Fecha" },
            { key: "tipo", label: "Tipo" },
            { key: "vehiculoId", label: "Vehículo" },
            { key: "total", label: "Costo total" },
          ]}
          data={mantenimientos.map((item) => ({
            ...item,
            total: `$ ${item.total.toLocaleString("es-AR")}`,
          }))}
          emptyMessage="No hay mantenimientos registrados."
        />
      </Card>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Nuevo mantenimiento"
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
            { value: "Preventivo", label: "Preventivo" },
            { value: "Correctivo", label: "Correctivo" },
          ]}
        />
        <Input label="Fecha" type="date" value={form.fecha} onChange={handleChange("fecha")} />
        <Input label="Kilometraje" value={form.km} onChange={handleChange("km")} />
        <TextArea
          label="Items / repuestos"
          value={form.items}
          onChange={handleChange("items")}
          placeholder="Filtros, pastillas, aceite"
        />
        <Input label="Mano de obra" value={form.manoObra} onChange={handleChange("manoObra")} />
        <Input label="Repuestos" value={form.repuestos} onChange={handleChange("repuestos")} />
      </Modal>
    </div>
  );
};

export default MantenimientosPage;
