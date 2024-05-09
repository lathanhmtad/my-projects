import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http://localhost:8180/auth",
  realm: "oauth2-microservice-realm",
  clientId: "React-auth",
});

export default keycloak;
