import React, { useEffect, useState } from "react";
import { useKeycloak } from "@react-keycloak/web";

export const AuthContext = React.createContext();
const AuthProvider = ({ children }) => {
  const { keycloak } = useKeycloak();
  const [access, setAccess] = useState(keycloak.token);
  const [refresh, setRefresh] = useState(keycloak.refreshToken);

  useEffect(() => {
    setAccess(keycloak.token);
    setRefresh(keycloak.refreshToken);
    if (keycloak.token) {
      window.localStorage.setItem("access", keycloak.token);
      window.localStorage.setItem("refresh", keycloak.refreshToken);
    }
  }, [keycloak.tokenParsed, keycloak.token, keycloak.refreshToken]);

  return (
    <AuthContext.Provider value={{ access, refresh }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
