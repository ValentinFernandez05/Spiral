import React, { useEffect, useState } from "react";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import styles from "./AlertasPage.module.css";
import { api } from "../services/api";
import { useToast } from "../contexts/ToastContext";

const toneByPriority = (priority) => {
  if (priority === "Crítica") return "danger";
  if (priority === "Alta") return "warning";
  return "info";
};

const AlertasPage = () => {
  const { notify } = useToast();
  const [alertas, setAlertas] = useState([]);

  const loadAlertas = () => {
    api.getAlertas().then(setAlertas);
  };

  useEffect(() => {
    loadAlertas();
  }, []);

  const handleResolve = async (id) => {
    await api.resolveAlerta(id);
    notify("Alerta resuelta", "success");
    loadAlertas();
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Alertas</h1>
        <p className="page-subtitle">
          Prioridad operativa para vencimientos y riesgos críticos.
        </p>
      </div>
      <div className={styles.grid}>
        {alertas.map((alerta) => (
          <Card key={alerta.id} className={styles.alertCard}>
            <div className={styles.header}>
              <h3>{alerta.tipo}</h3>
              <Badge tone={toneByPriority(alerta.prioridad)}>{alerta.prioridad}</Badge>
            </div>
            <p>{alerta.mensaje}</p>
            <div className={styles.actions}>
              <Button variant="ghost">Ir al vehículo</Button>
              <Button variant="secondary">Crear solicitud</Button>
              <Button variant="primary" size="sm" onClick={() => handleResolve(alerta.id)}>
                Marcar resuelta
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AlertasPage;
