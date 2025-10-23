const { db_client, db_host, db_name, db_port, db_user, db_password } =
  process.env;

export default {
  client: db_client,
  connection: {
    host: db_host,
    database: db_name,
    port: db_port,
    user: db_user,
    password: db_password,
  },
};
