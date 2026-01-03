import React, { useEffect, useState } from "react";
import Drawer from "../ui/Drawer";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import { api } from "../../services/api";
import styles from "./NotificationDrawer.module.css";

const NotificationDrawer = ({ open, onClose }) => {
  const [alertas, setAlertas] = useState([]);

  useEffect(() => {
    if (open) {
      api.getAlertas().then((data) => setAlertas(data.filter((item) => item.estado === "Activa")));
    }
  }, [open]);

  return (
    <Drawer open={open} onClose={onClose} title="Notificaciones">
      {alertas.map((alerta) => (
        <div key={alerta.id} className={styles.item}>
          <div>
            <h4>{alerta.tipo}</h4>
            <p>{alerta.mensaje}</p>
            <Badge tone={alerta.prioridad === "Crítica" ? "danger" : "warning"}>
              {alerta.prioridad}
            </Badge>
          </div>
          <Button size="sm" variant="ghost" onClick={() => api.resolveAlerta(alerta.id)}>
            Marcar leída
          </Button>
        </div>
      ))}
      {alertas.length === 0 && <p className={styles.empty}>No tenés alertas nuevas.</p>}
    </Drawer>
  );
};

export default NotificationDrawer;
