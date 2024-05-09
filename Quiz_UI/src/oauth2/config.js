const config = {
  accessTokenUrl:
    "http://localhost:8180/auth/realms/oauth2-microservice-realm/protocol/openid-connect/token",
  clientID: "spring-cloud-client",
  clientSecret: "56f61ff8-8378-482e-97df-6bc8c6ad31c8",
  grantType: "password",
  scope: "openid offline_access",
};

export default config;
