import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import Button from "../components/ui/Button";
import Table from "../components/ui/Table";
import styles from "./VehiclesPage.module.css";
import { api } from "../services/api";

const statusTone = (estado) => {
  if (estado === "Operativo") return "success";
  if (estado === "En service") return "warning";
  return "danger";
};

const VehiclesPage = () => {
  const [vehicles, setVehicles] = useState([]);
  const [view, setView] = useState("cards");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  useEffect(() => {
    api.getVehiculos().then(setVehicles);
  }, []);

  const filtered = useMemo(() => {
    return vehicles.filter((vehiculo) => {
      const matchesSearch = [vehiculo.patente, vehiculo.marca, vehiculo.modelo]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesStatus = status === "all" || vehiculo.estado === status;
      return matchesSearch && matchesStatus;
    });
  }, [vehicles, search, status]);

  const columns = [
    { key: "patente", label: "Patente" },
    { key: "modelo", label: "Modelo" },
    { key: "km", label: "Kilometraje" },
    {
      key: "estado",
      label: "Estado",
      render: (row) => <Badge tone={statusTone(row.estado)}>{row.estado}</Badge>,
    },
    {
      key: "acciones",
      label: "Acciones",
      render: (row) => (
        <Link className={styles.link} to={`/vehiculos/${row.id}`}>
          Ver detalle
        </Link>
      ),
    },
  ];

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Vehículos</h1>
        <p className="page-subtitle">
          Gestión integral del parque automotor y su estado operativo.
        </p>
      </div>
      <div className={styles.filters}>
        <Input
          label="Buscar"
          placeholder="Patente, marca o modelo"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <Select
          label="Estado"
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          options={[
            { value: "all", label: "Todos" },
            { value: "Operativo", label: "Operativo" },
            { value: "En service", label: "En service" },
            { value: "Fuera de servicio", label: "Fuera de servicio" },
          ]}
        />
        <div className={styles.toggleGroup}>
          <Button
            variant={view === "cards" ? "primary" : "secondary"}
            onClick={() => setView("cards")}
          >
            Cards
          </Button>
          <Button
            variant={view === "table" ? "primary" : "secondary"}
            onClick={() => setView("table")}
          >
            Tabla
          </Button>
        </div>
      </div>

      {view === "cards" ? (
        <div className={styles.cardGrid}>
          {filtered.map((vehiculo) => (
            <Card key={vehiculo.id} className={styles.vehicleCard}>
              <div className={styles.cardHeader}>
                <div>
                  <h3>{vehiculo.marca}</h3>
                  <p>{vehiculo.modelo}</p>
                </div>
                <Badge tone={statusTone(vehiculo.estado)}>{vehiculo.estado}</Badge>
              </div>
              <div className={styles.cardBody}>
                <span>Patente: {vehiculo.patente}</span>
                <span>Km: {vehiculo.km.toLocaleString("es-AR")}</span>
                <span>Asignado a: {vehiculo.asignadoA}</span>
              </div>
              <div className={styles.cardFooter}>
                <Link className={styles.link} to={`/vehiculos/${vehiculo.id}`}>
                  Ver detalle
                </Link>
                <Button variant="ghost" size="sm">
                  Crear solicitud
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <Table columns={columns} data={filtered} emptyMessage="No se encontraron vehículos." />
        </Card>
      )}
    </div>
  );
};

export default VehiclesPage;
