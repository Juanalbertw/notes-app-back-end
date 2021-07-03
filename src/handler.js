// Memuat seluruh fungsi-fungsi handler yang digunakan pada berkas routes.

const { nanoid } = require('nanoid');
// impor array notes
const notes = require('./notes');

// MENAMBAHKAN CATATAN
const addNoteHandler = (request, h) => {
  // mendapatkan body request di Hapi
  const { title, tags, body } = request.payload;

  // properti selain title, tags, dan body dari client harus diolah sendiri
  // properti id adalah string unik
  const id = nanoid(16);
  // properti createdAt dan updatedAt nilainya sama karena sedang menambahkan catatan baru
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  // memasukkan nilai-nilai ke dalam array notes dengan method push()
  const newNote = {
    title, tags, body, id, createdAt, updatedAt,
  };

  notes.push(newNote);

  // filter berdasarkan id catatan untuk mengetahui apakah newNote sudah masuk ke dalam array notes
  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  // server response
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan',
  });
  response.code(500);
  return response;
};

// MENAMPILKAN CATATAN
const getAllNotesHandler = () => ({
  status: 'success',
  data: {
    notes,
  },
});

const getNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  // dapatkan objek note dengan id tersebut dari objek array notes menggunakan method array filter()
  const note = notes.filter((n) => n.id === id)[0];

  // pastikan objek note tidak bernilai undefined
  if (note !== undefined) {
    // response sederhana dapat langsung dikembalikan (status code 200 OK)
    return {
      status: 'success',
      data: {
        note,
      },
    };
  }

  // alternatively, pass the value to h.response(value) and return that from the handler
  // the result is a response object
  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan',
  });
  response.code(404);
  return response;
};

// MENGUBAH CATATAN
const editNoteByIdHandler = (request, h) => {
  // dapatkan id dari route parameter
  const { id } = request.params;

  // dapatkan data notes terbaru yang dikirimkan client melalui body request
  const { title, tags, body } = request.payload;
  // perbarui nilai properti updatedAt
  const updatedAt = new Date().toISOString();

  // mengubah catatan lama dengan data terbaru memanfaatkan indexing array
  // dapatkan index array objek catatan sesuai id yang ditentukan
  const index = notes.findIndex((note) => note.id === id);

  // jika note dengan id yang dicari tidak ditemukan, index bernilai -1
  if (index !== -1) {
    notes[index] = {
      // spread operator untuk menggabungkan objek
      ...notes[index],
      // property/key sudah ada, sehingga nilai yang lama akan diganti
      title,
      tags,
      body,
      updatedAt,
    };

    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui catatan. ID tidak ditemukan',
  });
  response.code(404);
  return response;
};

// MENGHAPUS CATATAN
const deleteNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const index = notes.findIndex((note) => note.id === id);

  // pastikan nilai index bukan -1
  // untuk menghapus data pada array berdasarkan index, gunakan method array splice()
  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  // kembalikan handler dengan respons gagal jika index -1
  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
};
