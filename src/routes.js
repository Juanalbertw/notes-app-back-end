// Memuat kode konfigurasi routing server: menentukan path, method, dan handler yang digunakan.

const {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
} = require('./handler');

const routes = [
  // MENAMBAHKAN CATATAN
  {
    method: 'POST',
    path: '/notes',
    handler: addNoteHandler,
  },
  // MENAMPILKAN CATATAN
  {
    method: 'GET',
    path: '/notes',
    handler: getAllNotesHandler,
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: getNoteByIdHandler,
  },
  // MENGUBAH CATATAN
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: editNoteByIdHandler,
  },
  // MENGHAPUS CATATAN
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: deleteNoteByIdHandler,
  },
];

module.exports = routes;
