import React, { useEffect, useState } from "react";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Tabs from "../components/ui/Tabs";
import Skeleton from "../components/ui/Skeleton";
import { api } from "../services/api";
import styles from "./DashboardPage.module.css";
import { useAuth } from "../contexts/AuthContext";

const DashboardPage = () => {
  const { session } = useAuth();
  const [stats, setStats] = useState(null);
  const [range, setRange] = useState("30");

  useEffect(() => {
    api.getDashboardStats().then(setStats);
  }, []);

  const executive = session?.rol === "DIRECTOR";

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">
          Dashboard {executive ? "ejecutivo" : "operativo"}
        </h1>
        <p className="page-subtitle">
          Visión integral de la flota, con foco en decisiones críticas.
        </p>
      </div>
      <div className={styles.filters}>
        <Tabs
          active={range}
          onChange={setRange}
          tabs={[
            { value: "7", label: "Últimos 7 días" },
            { value: "30", label: "Últimos 30 días" },
            { value: "90", label: "Últimos 90 días" },
          ]}
        />
        <Badge tone="accent">Actualizado hace 5 min</Badge>
      </div>
      <div className="grid grid-3">
        {["Operativos", "En mantenimiento", "Solicitudes pendientes", "Alertas críticas"].map(
          (label, index) => (
            <Card key={label}>
              <p className={styles.kpiLabel}>{label}</p>
              {stats ? (
                <h2 className={styles.kpiValue}>
                  {Object.values(stats)[index]}
                </h2>
              ) : (
                <Skeleton size="lg" />
              )}
              <span className={styles.kpiFoot}>Tendencia +3% vs. mes anterior</span>
            </Card>
          )
        )}
      </div>
      <div className={styles.sections}>
        <Card>
          <div className={styles.sectionHeader}>
            <h3>Alertas prioritarias</h3>
            <Badge tone="danger">4 críticas</Badge>
          </div>
          <ul className={styles.list}>
            <li>
              <strong>VTV vencida</strong> · Renault Kangoo (AC 998 KT)
              <span>Vencida hace 12 días</span>
            </li>
            <li>
              <strong>Service vencido</strong> · Ford Ranger LTD (AE 114 PF)
              <span>Superó el umbral por 2.400 km</span>
            </li>
            <li>
              <strong>Solicitud pendiente</strong> · Cambio de frenos
              <span>10 días sin aprobación</span>
            </li>
          </ul>
        </Card>
        <Card>
          <div className={styles.sectionHeader}>
            <h3>Insights</h3>
            <Badge tone="info">Automático</Badge>
          </div>
          <div className={styles.insights}>
            <div>
              <p>Top 3 vehículos con más incidencias</p>
              <ol>
                <li>Renault Kangoo (12)</li>
                <li>Ford Ranger LTD (9)</li>
                <li>Toyota Hilux SRX (7)</li>
              </ol>
            </div>
            <div>
              <p>Servicios próximos</p>
              <ul>
                <li>Volkswagen Amarok · 1.600 km</li>
                <li>Toyota Hilux SRX · 1.800 km</li>
              </ul>
            </div>
          </div>
        </Card>
        {executive ? (
          <Card>
            <div className={styles.sectionHeader}>
              <h3>Aprobaciones pendientes</h3>
              <Badge tone="warning">5 por revisar</Badge>
            </div>
            <p className={styles.muted}>
              Revisión estratégica de solicitudes críticas y su impacto presupuestario.
            </p>
            <div className={styles.actionRow}>
              <button className={styles.linkButton}>Ver detalle</button>
              <button className={styles.linkButton}>Exportar reporte</button>
            </div>
          </Card>
        ) : (
          <Card>
            <div className={styles.sectionHeader}>
              <h3>Órdenes en ejecución</h3>
              <Badge tone="info">2 activas</Badge>
            </div>
            <p className={styles.muted}>
              Seguimiento operativo para tareas asignadas en taller.
            </p>
            <div className={styles.actionRow}>
              <button className={styles.linkButton}>Ver agenda</button>
              <button className={styles.linkButton}>Registrar avance</button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
