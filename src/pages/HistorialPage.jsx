import React, { useEffect, useState } from "react";
import Card from "../components/ui/Card";
import Select from "../components/ui/Select";
import Table from "../components/ui/Table";
import styles from "./HistorialPage.module.css";
import { api } from "../services/api";

const HistorialPage = () => {
  const [eventos, setEventos] = useState([]);
  const [tipo, setTipo] = useState("all");

  useEffect(() => {
    api.getHistorialEventos().then(setEventos);
  }, []);

  const filtered = eventos.filter((evento) =>
    tipo === "all" ? true : evento.tipo === tipo
  );

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Historial</h1>
        <p className="page-subtitle">Auditoría consolidada de actividad interna.</p>
      </div>
      <div className={styles.filters}>
        <Select
          label="Tipo de evento"
          value={tipo}
          onChange={(event) => setTipo(event.target.value)}
          options={[
            { value: "all", label: "Todos" },
            { value: "Solicitud creada", label: "Solicitudes" },
            { value: "Mantenimiento registrado", label: "Mantenimientos" },
            { value: "Vehículo fuera de servicio", label: "Estado de vehículos" },
          ]}
        />
      </div>
      <Card>
        <Table
          columns={[
            { key: "fecha", label: "Fecha" },
            { key: "tipo", label: "Evento" },
            { key: "detalle", label: "Detalle" },
            { key: "rol", label: "Rol" },
          ]}
          data={filtered}
          emptyMessage="No hay eventos para mostrar."
        />
      </Card>
    </div>
  );
};

export default HistorialPage;
