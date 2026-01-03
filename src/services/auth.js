const SESSION_KEY = "crm_flota_session";

const mockUsers = [
  {
    id: "user-1",
    nombre: "Carlos López",
    email: "carlos@crmflota.com",
    rol: "DIRECTOR",
    avatar: "https://i.pravatar.cc/80?img=12",
  },
  {
    id: "user-2",
    nombre: "Sofía Romero",
    email: "sofia@crmflota.com",
    rol: "ADMIN",
    avatar: "https://i.pravatar.cc/80?img=32",
  },
  {
    id: "user-3",
    nombre: "Valeria Díaz",
    email: "valeria@crmflota.com",
    rol: "MECANICO",
    avatar: "https://i.pravatar.cc/80?img=47",
  },
  {
    id: "user-4",
    nombre: "Mateo Ruiz",
    email: "mateo@crmflota.com",
    rol: "OPERADOR",
    avatar: "https://i.pravatar.cc/80?img=52",
  },
];

export const auth = {
  getSession() {
    const stored = localStorage.getItem(SESSION_KEY);
    return stored ? JSON.parse(stored) : null;
  },
  loginMock({ email, password, rol }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!email || !password) {
          reject(new Error("Completá tus credenciales."));
          return;
        }
        const user = mockUsers.find((item) => item.email === email) || mockUsers[0];
        const session = {
          ...user,
          rol: rol || user.rol,
        };
        localStorage.setItem(SESSION_KEY, JSON.stringify(session));
        resolve(session);
      }, 900);
    });
  },
  logoutMock() {
    localStorage.removeItem(SESSION_KEY);
    return Promise.resolve();
  },
  updateRole(role) {
    const stored = auth.getSession();
    if (!stored) return null;
    const updated = { ...stored, rol: role };
    localStorage.setItem(SESSION_KEY, JSON.stringify(updated));
    return updated;
  },
  mockUsers,
};
