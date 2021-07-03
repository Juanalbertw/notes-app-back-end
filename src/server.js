// Memuat kode untuk membuat, mengonfigurasi, dan menjalankan server HTTP menggunakan Hapi.

const Hapi = require('@hapi/hapi');
const routes = require('./routes');

// membuat server menggunakan Hapi
const init = async () => {
  const server = Hapi.server({
    port: 5000,
    // host saat development adalah localhost
    // sedangkan host saat production adalah 0.0.0.0 agar bisa diakses melalui seluruh alamat IP
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    // mengaktifkan CORS di seluruh route yang ada di server
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.route(routes);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
