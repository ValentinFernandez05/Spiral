import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Select from "../components/ui/Select";
import styles from "./LoginPage.module.css";
import { useAuth } from "../contexts/AuthContext";

const roles = [
  { value: "DIRECTOR", label: "Director" },
  { value: "ADMIN", label: "Administrador" },
  { value: "MECANICO", label: "Mecánico" },
  { value: "OPERADOR", label: "Operador" },
];

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const [form, setForm] = useState({
    email: "carlos@crmflota.com",
    password: "",
    rol: "DIRECTOR",
    remember: true,
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (field) => (event) => {
    const value = field === "remember" ? event.target.checked : event.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      await login(form);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.brand}>
          <span>CRM Flota</span>
          <p>Ingresá para continuar con la operación.</p>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            label="Email corporativo"
            type="email"
            value={form.email}
            onChange={handleChange("email")}
            placeholder="tu@email.com"
            required
          />
          <div className={styles.passwordRow}>
            <Input
              label="Contraseña"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange("password")}
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              className={styles.toggle}
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? "Ocultar" : "Mostrar"}
            </button>
          </div>
          <Select
            label="Rol demo"
            value={form.rol}
            onChange={handleChange("rol")}
            options={roles}
          />
          <label className={styles.remember}>
            <input
              type="checkbox"
              checked={form.remember}
              onChange={handleChange("remember")}
            />
            Recordarme en este dispositivo
          </label>
          {error && <span className={styles.error}>{error}</span>}
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? "Ingresando..." : "Iniciar sesión"}
          </Button>
        </form>
        <p className={styles.helper}>
          ¿Necesitás soporte? Escribinos a soporte@crmflota.com
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
