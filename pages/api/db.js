import mysql from 'mysql2/promise';
import { Client } from 'ssh2';
import fs from 'fs';

export async function connectToDatabase() {
  const sshConfig = {
    host: process.env.SSH_HOST,
    port: process.env.SSH_PORT,
    username: process.env.SSH_USER,
    privateKey: fs.readFileSync(process.env.SSH_KEY_PATH),
  };

  const mysqlConfig = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: 3306,
  };

  return new Promise((resolve, reject) => {
    const ssh = new Client();
    
    ssh.on('ready', () => {
      ssh.forwardOut(
        process.env.MYSQL_HOST, // Source IP (local machine)
        0,           // Source port (0 means any free port)
        process.env.MYSQL_HOST, // Destination IP (MySQL server, accessed via tunnel)
        mysqlConfig.port, // Destination port (MySQL default port)
        async (err, stream) => {
          if (err) {
            ssh.end();
            return reject(`SSH forward error: ${err.message}`);
          }

          try {
            // Create MySQL connection with the SSH tunnel stream
            const connection = await mysql.createConnection({
              ...mysqlConfig,
              stream, // Use the SSH tunnel stream
            });

            resolve(connection); // Resolve with the connection object
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
