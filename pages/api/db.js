import mysql from 'mysql2/promise';
import { Client } from 'ssh2';
import fs from 'fs';

export async function connectToDatabase() {
  const isLocal = process.env.NODE_ENV === 'development'; // Change based on your deployment environment setup

  const mysqlConfig = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: 3306,
  };

  if (!isLocal) {
    // Direct connection to MySQL without SSH tunnel
    try {
      const connection = await mysql.createConnection(mysqlConfig);
      return connection;
    } catch (err) {
      throw new Error(`Direct MySQL connection error: ${err.message}`);
    }
  } else {
    // SSH tunneling for local development
    const sshConfig = {
      host: process.env.SSH_HOST,
      port: process.env.SSH_PORT,
      username: process.env.SSH_USER,
      privateKey: fs.readFileSync(process.env.SSH_KEY_PATH),
    };

    return new Promise((resolve, reject) => {
      const ssh = new Client();

      ssh.on('ready', () => {
        ssh.forwardOut(
          process.env.MYSQL_HOST, // Source IP (local machine)
          0,                      // Source port (0 means any free port)
          process.env.MYSQL_HOST, // Destination IP (MySQL server)
          mysqlConfig.port,       // Destination port (MySQL default port)
          async (err, stream) => {
            if (err) {
              ssh.end();
              return reject(`SSH forward error: ${err.message}`);
            }

            try {
              const connection = await mysql.createConnection({
                ...mysqlConfig,
                stream, // Use the SSH tunnel stream
              });
              resolve(connection);
            } catch (dbErr) {
              ssh.end();
              reject(`MySQL connection error: ${dbErr.message}`);
            }
          }
        );
      }).connect(sshConfig);

      // Handle SSH connection errors
      ssh.on('error', (err) => {
        reject(`SSH connection error: ${err.message}`);
      });
    });
  }
}
