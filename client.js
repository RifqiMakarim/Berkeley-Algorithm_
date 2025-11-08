const net = require("net");

const PORT = 8001;
const HOST = "127.0.0.1";

const client = new net.Socket();

client.connect(PORT, HOST, () => {
  console.log("Terhubung ke server");
});

client.on("data", (data) => {
  const msg = data.toString();

  if (msg === "REQ_TIME") {
    // Kirim waktu lokal ke server
    client.write(Date.now().toString());
  } else {
    // Pesan berisi offset
    const offset = parseFloat(msg);
    console.log(`Offset diterima: ${offset} ms`);
    const syncedTime = Date.now() + offset;
    console.log("Waktu tersinkronisasi:", new Date(syncedTime).toLocaleTimeString());
    // client.destroy(); // tutup koneksi
  }
});

// client.on("close", () => {
//   console.log("Koneksi ditutup");
// });
