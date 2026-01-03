import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ToastProvider } from "./contexts/ToastContext";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import VehiclesPage from "./pages/VehiclesPage";
import VehicleDetailPage from "./pages/VehicleDetailPage";
import SolicitudesPage from "./pages/SolicitudesPage";
import MantenimientosPage from "./pages/MantenimientosPage";
import AlertasPage from "./pages/AlertasPage";
import HistorialPage from "./pages/HistorialPage";
import AdminPage from "./pages/AdminPage";
import AppLayout from "./components/layout/AppLayout";
import ProtectedRoute from "./app/ProtectedRoute";

const App = () => {
  return (
    <AuthProvider>
      <ToastProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute permission="Dashboard">
                <AppLayout>
                  <DashboardPage />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/vehiculos"
            element={
              <ProtectedRoute permission="Vehiculos">
                <AppLayout>
                  <VehiclesPage />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/vehiculos/:id"
            element={
              <ProtectedRoute permission="Vehiculos">
                <AppLayout>
                  <VehicleDetailPage />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/solicitudes"
            element={
              <ProtectedRoute permission="Solicitudes">
                <AppLayout>
                  <SolicitudesPage />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/mantenimientos"
            element={
              <ProtectedRoute permission="Mantenimientos">
                <AppLayout>
                  <MantenimientosPage />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/alertas"
            element={
              <ProtectedRoute permission="Alertas">
                <AppLayout>
                  <AlertasPage />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/historial"
            element={
              <ProtectedRoute permission="Historial">
                <AppLayout>
                  <HistorialPage />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/administracion"
            element={
              <ProtectedRoute permission="Administracion">
                <AppLayout>
                  <AdminPage />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ToastProvider>
    </AuthProvider>
  );
};

export default App;
