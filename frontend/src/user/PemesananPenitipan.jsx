import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import SidebarUser from "../components/SidebarUser";
import HeaderUser from "../components/HeaderUser";
import { useNavigate } from "react-router-dom";
import hash from 'object-hash';
import { MapContainer, TileLayer, useMap, Marker, Popup, GeoJSON } from 'react-leaflet'
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const markerIcon = new L.Icon({
  iconUrl: "/src/assets/marker.png",
  iconSize: [40, 40],
  iconAnchor: [17, 46], //[left/right, top/bottom]
  popupAnchor: [0, -46], //[left/right, top/bottom]
});
const loadSnap = () => {
  return new Promise((resolve, reject) => {
    if (window.snap) {
      resolve(window.snap); // Snap SDK sudah dimuat
    } else {
      const script = document.createElement("script");
      script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
      script.setAttribute("data-client-key", "YOUR_CLIENT_KEY"); // Ganti dengan Client Key Midtrans Anda
      script.onload = () => resolve(window.snap);
      script.onerror = () => reject(new Error("Gagal memuat Midtrans Snap."));
      document.body.appendChild(script);
    }
  });
};

const PemesananPenitipanCheckout = () => {
  const [formData, setFormData] = useState({
    nama: "",
    deskripsi_barang: "",
    jumlah_barang: "",
    waktuMulai: "",
    waktuSelesai: "",
    alamatPenjemputan: "",
    kontak: "",
    kurir: "",
    berat: "",
    kota_asal: "Bandung",
    biaya_kirim: 0,
    kota_tujuan: "",
    file_barang: null,
  });
  const [harga, setHarga] = useState(0);
  const [userId, setUserId] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  const mapRef = useRef();
  const location = GetGeoLocation();
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [address, setAddress] = useState(null);
  const [center, setCenter] = useState({ lat: 51.505, lng: -0.09 });
  const [loading, setLoading] = useState();
  // const [geoFeature, setGeoFeature] = useState(null);

  // Ambil userId dari localStorage saat pertama kali komponen dimuat
  React.useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  // Fungsi untuk menangani perubahan input form
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Update formData immediately with the correct value
    setFormData((prevFormData) => {
      const updatedFormData = { ...prevFormData, [name]: value };

      // handle file input
      if (name === "file_barang") {
        updatedFormData.file_barang = e.target.files[0];
      }

      // handle the special case to recalculate the price
      if (
        name === "waktuMulai" || 
        name === "waktuSelesai" || 
        name === "jumlah_barang" || 
        name === "biaya_kirim"
      ) {
        const jumlah = parseInt(updatedFormData.jumlah_barang, 10);
        const biaya = parseInt(updatedFormData.biaya_kirim, 10);
        const start = new Date(updatedFormData.waktuMulai);
        const end = new Date(updatedFormData.waktuSelesai);
        
        // Calculate the number of days between start and end dates
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        // Calculate the price
        setHarga(
          jumlah === 1
            ? 5000 + biaya + (diffDays * 5000)
            : jumlah === 2
            ? 10000 + biaya + (diffDays * 5000)
            : jumlah > 2
            ? jumlah * 5000 + biaya + (diffDays * 5000)
            : 0
        );
      }

      return updatedFormData;
    });
};

  // Fungsi untuk validasi form
  const validateForm = () => {
    if (!formData.nama || !formData.alamatPenjemputan || !formData.kontak) {
      setError("Semua data penitip harus diisi.");
      return false;
    }
    if (!formData.jumlah_barang || formData.jumlah_barang <= 0) {
      setError("Jumlah barang harus lebih dari 0.");
      return false;
    }
    if (!formData.waktuMulai || !formData.waktuSelesai) {
      setError("Tanggal waktu mulai dan selesai harus diisi.");
      return false;
    }
    return true;
  };

  // Fungsi handleSubmit untuk memproses form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Validasi form
    if (!validateForm()) return;

    if(formData.file_barang) {
      const file = formData.file_barang;
      const fileExtension = file.name.split('.').pop();
      const fileName = `${hash(Date.now())}.${fileExtension}`;
      const newFile = new File([file], fileName, { type: file.type });
      formData.file_barang = newFile;
    }

    let formBarang = new FormData();
    formBarang.append("deskripsi_barang", formData.deskripsi_barang);
    formBarang.append("jumlah_barang", formData.jumlah_barang);
    formBarang.append("harga", harga);
    formBarang.append("fileBarang", formData.file_barang);


    const transactionData = {
      alamatPenjemputan: formData.alamatPenjemputan,
      kontak: formData.kontak,
      nama: formData.nama,
      duration: {
        startDate: formData.waktuMulai,
        endDate: formData.waktuSelesai,
      },
      jarak_jemput: 10, // Gantilah ini dengan nilai yang sesuai
      total_biaya_jemput: harga, // kalkulasi biaya jemput (gratis ongkir = harga barang)
      kota_asal: formData.kota_asal,
      kota_tujuan: formData.kota_tujuan,
    };

    try {
      // Mendapatkan token dari localStorage
      const token = localStorage.getItem("userToken");

      const barangResponse = await axios.post("http://localhost:3000/api/barang", formBarang, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Response Barang:", barangResponse);
      if(barangResponse.status !== 201){
        throw new Error("Gagal membuat data barang.");
      }

      // if (!barangResponse.data.success) {
      //   throw new Error("Gagal membuat data barang.");
      // }

      // Kirim data transaksi ke API backend
      const transactionResponse = await fetch(
        "http://localhost:3000/api/transactions",
        {
          method: "POST", // Menggunakan POST karena kita mengirimkan transaksi
          headers: {
            Authorization: `Bearer ${token}`, // Menambahkan token JWT
            "Content-Type": "application/json", // Menentukan format data yang dikirim
          },
          body: JSON.stringify(transactionData), // Mengirimkan data transaksi dalam format JSON
        }
      );

      if (!transactionResponse.ok) {
        throw new Error("Gagal membuat transaksi.");
      }

      const transactionDataResponse = await transactionResponse.json();
      console.log("Response Transaksi:", transactionDataResponse);

      // Kirim data pembayaran untuk Midtrans
      const paymentData = {
        amount: harga, // Set amount to harga
        email: formData.kontak, // Assuming 'kontak' is used as email
        phone: formData.kontak,
        name: formData.nama,
        user_id: userId,
      };

      // Kirim request pembayaran ke backend untuk mendapatkan token
      const responsePayment = await axios.post(
        "http://localhost:3000/api/user/payment",
        paymentData
      );

      if (responsePayment.data.token) {
        // Pastikan Snap SDK sudah dimuat sebelum memulai pembayaran
        loadSnap()
          .then(() => {
            window.snap.pay(responsePayment.data.token, {
              onSuccess: function (result) {
                console.log("Payment Success:", result);
                setSuccess("Pembayaran berhasil!");
                navigate("/pemesananpenitipan");
              },
              onPending: function (result) {
                console.log("Payment Pending:", result);
                setSuccess("Pembayaran tertunda.");
              },
              onError: function (result) {
                console.log("Payment Error:", result);
                setError("Pembayaran gagal.");
              },
              onClose: function () {
                console.log("Payment window closed");
                setSuccess("Anda menutup jendela pembayaran.");
              },
            });
          })
          .catch((error) => {
            console.error("Failed to load Snap SDK:", error);
            setError("Pembayaran gagal. Coba lagi nanti.");
          });
      } else {
        setError("Token tidak tersedia.");
      }

      setFormData({
        nama: "",
        deskripsi_barang: "",
        jumlah_barang: "",
        waktuMulai: "",
        waktuSelesai: "",
        alamatPenjemputan: "",
        kontak: "",
      });
      setHarga(0);
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      setError(error.message || "Terjadi kesalahan saat membuat pemesanan.");
    }
  };

  const getIdCity = async (city) => {
    const url = `http://localhost:3000/api/rajaongkir/getCityByName/${city}/kota`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.data.city_id; // Return the city_id directly
    } catch (error) {
        console.error("Error fetching city ID:", error);
        return 0; // Return 0 or handle the error case appropriately
    }
  }

  const countCost = async () => {
    setLoading(true);
    // Check if data pengirim not null
    if (!formData.berat || !formData.kurir) {
        setError("Berat dan kurir harus diisi.");
        setLoading(false); // Hide the loading
        return;
    }
    // Check if address not null
    if (!address) {
        setError("Alamat harus diisi.");
        setLoading(false); // Hide the loading
        return;
    }
    
    // Wait for the city IDs to be fetched
    const city_id_origin = await getIdCity(formData.kota_asal);
    const city_id_destination = await getIdCity(formData.kota_tujuan);

    // Check if both city IDs were successfully retrieved
    if (!city_id_origin || !city_id_destination) {
      setLoading(false); // Hide the loading
      setError("City IDs not found.");
      return;
    }

    const url = `http://localhost:3000/api/rajaongkir/getCost/${city_id_origin}/${city_id_destination}/${formData.berat}/${formData.kurir}`;
    try {
        const response = await fetch(url);
        const data = await response.json();

        const res = data.data.rajaongkir.results[0].costs;
        let result = res.find((item) => item.service === "REG");
        if (!result) {
          result = res[0];
        }
        console.log("Result:", result);
        setFormData({ ...formData, biaya_kirim: result.cost[0].value });
    } catch (error) {
        console.error("Error fetching cost:", error);
        setError("Failed to fetch cost data.");
    }finally {
      // Hide loading once the fetch is done
      setLoading(false);
    }
  };

  const showMyLocation = async () => {
    if (location.loaded && !location.error) {
      mapRef.current.flyTo([
          location.coordinates.lat,
          location.coordinates.lng,
      ]);
      setLongitude(location.coordinates.lng);
      setLatitude(location.coordinates.lat);
      setAddress(location.address);
      setFormData({ ...formData, kota_tujuan: location.address.city });
    } else {
      alert(location.error.message);
    }
  };
  return (
    <div className="flex min-h-screen">
      {/* Loading Overlay */}
      {loading && (
        <div style={{zIndex:9999}} className="flex justify-center items-center h-screen fixed top-0 left-0 right-0 bottom-0 w-full z-50 overflow-hidden bg-gray-700 opacity-75">
          <div className="spinner-border animate-spin inline-block w-8 h-8 rounded-full" role="status">
              <span className="visually-hidden">
                  <svg className="animate-spin -inline-block w-8 h-8 border-4 rounded-full" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
              </span>
          </div>
        </div>
      )}
      <SidebarUser />
      <div className="flex-1">
        <HeaderUser />
        <div className="p-6 min-h-screen">
          <div className="mb-6 text-left">
            <h1 className="text-2xl font-bold text-gray-700">
              Checkout Pemesanan Penitipan
            </h1>
            <p className="text-gray-600">
              Pastikan semua data sudah benar sebelum melanjutkan pembayaran.
            </p>
          </div>

          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}

          <form
            onSubmit={handleSubmit}
            className="bg-white shadow rounded p-6 space-y-6"
          >
            {/* Data Penitip */}
            <div className="rounded-lg p-6 space-y-4 border border-emerald-500">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Data Penitip
              </h2>
              <div>
                <label className="block text-gray-700">Nama</label>
                <input
                  type="text"
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  className="w-full border rounded p-2 bg-[#d1fae5]"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">
                  Alamat Penjemputan
                </label>
                <input
                  type="text"
                  name="alamatPenjemputan"
                  value={formData.alamatPenjemputan}
                  onChange={handleChange}
                  className="w-full border rounded p-2 bg-[#d1fae5]"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Informasi Kontak</label>
                <input
                  type="text"
                  name="kontak"
                  value={formData.kontak}
                  onChange={handleChange}
                  className="w-full border rounded p-2 bg-[#d1fae5]"
                  required
                />
              </div>
            </div>

            {/* Data Barang */}
            <div className="rounded-lg p-6 space-y-4 border border-emerald-500">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Data Barang
              </h2>
              <div>
                <label className="block text-gray-700">Jumlah Barang</label>
                <input
                  type="number"
                  name="jumlah_barang"
                  value={formData.jumlah_barang}
                  onChange={handleChange}
                  className="w-full border rounded p-2 bg-[#d1fae5]"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Deskripsi Barang</label>
                <input
                  type="text"
                  name="deskripsi_barang"
                  value={formData.deskripsi_barang}
                  onChange={handleChange}
                  className="w-full border rounded p-2 bg-[#d1fae5]"
                />
              </div>
              <div>
                <label className="block text-gray-700">Foto Barang</label>
                <input
                  type="file"
                  name="file_barang"
                  onChange={handleChange}
                  className="w-full border rounded p-2 bg-[#d1fae5]"
                />
              </div>
              <div>
                <MapContainer center={center} zoom={13} scrollWheelZoom={false} style={{ height: "400px" }} ref={mapRef}>
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={[location.coordinates.lat,location.coordinates.lng]} icon={markerIcon}>
                      <Popup>Lokasi Saya</Popup>
                  </Marker>
                </MapContainer>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700">Provinsi</label>
                  <input
                    type="text"
                    name="deskripsi_barang"
                    value={address ? address.state : ''}
                    onChange={handleChange}
                    className="w-full border rounded p-2 bg-[#d1fae5]"
                    required
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Kota</label>
                  <input
                    type="text"
                    name="deskripsi_barang"
                    value={address ? address.city : ''}
                    onChange={handleChange}
                    className="w-full border rounded p-2 bg-[#d1fae5]"
                    disabled
                  />
                </div>
              </div>
              <div>
                <button
                  className="bg-emerald-500 text-white px-6 py-2 rounded-lg hover:bg-emerald-600"
                  onClick={showMyLocation}
                >
                  Cari Lokasi
                </button>
              </div>
            </div>

            {/* Data Pengiriman */}
            <div className="rounded-lg p-6 space-y-4 border border-emerald-500">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Data Pengiriman
              </h2>
              <div>
                <label className="block text-gray-700">Kota Asal</label>
                <input
                  type="text"
                  name="asal"
                  value="Padang" // Ganti dengan kota asal
                  className="w-full border rounded p-2 bg-[#d1fae5]"
                  required
                  disabled
                />
              </div>
              <div>
                <label className="block text-gray-700">Berat (gram)</label>
                <input
                  type="number"
                  name="berat"
                  className="w-full border rounded p-2 bg-[#d1fae5]"
                  value={formData.berat}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Kurir</label>
                {/* <input
                  type="text"
                  name="kurir"
                  value="JNE"
                  onChange={handleChange}
                  className="w-full border rounded p-2 bg-[#d1fae5]"
                  required
                  disabled
                /> */}
                <select name="kurir" id="kurir" className="w-full border rounded p-2 bg-[#d1fae5]" onChange={handleChange} value={formData.kurir}>
                  <option selected disabled value="">Pilih Kurir</option>
                  <option value={"jne"}>JNE</option>
                  <option value={"tiki"}>TIKI</option>
                  <option value={"pos"}>POS</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700">Biaya Pengiriman</label>
                <input
                  type="number"
                  name="biaya"
                  value={formData.biaya_kirim}
                  onChange={handleChange}
                  className="w-full border rounded p-2 bg-[#d1fae5]"
                  required
                  disabled
                />
              </div>
              <div>
                <button
                  className="bg-emerald-500 text-white px-6 py-2 rounded-lg hover:bg-emerald-600"
                  onClick={countCost}
                >
                  Hitung Biaya
                </button>
              </div>
            </div>

            {/* Data Waktu */}
            <div className="rounded-lg p-6 space-y-4 border border-emerald-500">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Data Waktu
              </h2>
              <div>
                <label className="block text-gray-700">Waktu Mulai</label>
                <input
                  type="date"
                  name="waktuMulai"
                  value={formData.waktuMulai}
                  onChange={handleChange}
                  className="w-full border rounded p-2 bg-[#d1fae5]"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Waktu Selesai</label>
                <input
                  type="date"
                  name="waktuSelesai"
                  value={formData.waktuSelesai}
                  onChange={handleChange}
                  className="w-full border rounded p-2 bg-[#d1fae5]"
                  required
                />
              </div>
            </div>

            {/* Total Harga */}
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-lg text-gray-700">
                Total Harga
              </h2>
              <p className="font-semibold text-lg text-gray-700">Rp. {harga}</p>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-emerald-500 text-white px-6 py-2 rounded-lg hover:bg-emerald-600"
              >
                Bayar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const GetGeoLocation = () => {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: "", lng: "" },
  });

  const onSuccess = (location) => {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.coords.latitude}&lon=${location.coords.longitude}&accept-language=id`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setLocation({
          loaded: true,
          coordinates: {
            lat: location.coords.latitude,
            lng: location.coords.longitude,
          },
          address: data.address,
        });
      });

    // setLocation({
    //     loaded: true,
    //     coordinates: {
    //         lat: location.coords.latitude,
    //         lng: location.coords.longitude,
    //     },
    // });
  };

  const onError = (error) => {
    setLocation({
        loaded: true,
        error: {
            code: error.code,
            message: error.message,
        },
    });
  };

  useEffect(() => {
    if (!("geolocation" in navigator)) {
        onError({
            code: 0,
            message: "Geolocation not supported",
        });
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  return location;
}


export default PemesananPenitipanCheckout;
