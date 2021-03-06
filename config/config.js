const mode = process.env.NODE_ENV === "production";

module.exports = {
  mongoURL: process.env.MONGO_DB_URL,
  PORT: process.env.PORT || 5002,
  SERVER_URL_LOCAL: `http://localhost:${this.PORT}`,
  SERVER_URL_PROD: "",
  MONGO_DB_URL: process.env.MONGO_DB_URL,
  JWT_SECRET_KEY: "Super secret key",
  GOOGLE_CLIENT_ID: "",
  GOOGLE_CLIENT_SECRET: "",
  GOOGLE_CB_URL: `${
    mode ? this.SERVER_URL_PROD : this.SERVER_URL_LOCAL
  }/auth/google/callback`,
  FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID,
  FACEBOOK_APP_SECRET: process.env.FACEBOOK_APP_SECRET,
  FACEBOOK_CB_URL: `${
    mode ? this.SERVER_URL_PROD : this.SERVER_URL_LOCAL
  }/auth/facebook/callback`
};
