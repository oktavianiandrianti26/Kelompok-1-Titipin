const { get } = require("mongoose");

const GetProvinceByName = async (req, res) => {
    try {
        const { name } = req.params;
        const url = `https://api.rajaongkir.com/starter/province?key=${process.env.RAJAONGKIR_API_KEY}`;
        // const response = await axios.get(url);
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                const provinces = data.rajaongkir.results;
                const province = provinces.find((province) => province.province.toLowerCase() === name.toLowerCase());
                if (!province) {
                    return res.status(404).json({ message: "Provinsi tidak ditemukan" });
                }
                res.status(200).json({ message: "Provinsi berhasil ditemukan", data: province });
            });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const GetCityByName = async (req, res) => {
    try {
        const { name, type } = req.params;
        const url = `https://api.rajaongkir.com/starter/city?key=${process.env.RAJAONGKIR_API_KEY}`;
        // const response = await axios.get(url);
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                const cities = data.rajaongkir.results;
                const city = cities.find((city) => city.city_name.toLowerCase() === name.toLowerCase() && city.type.toLowerCase() === type.toLowerCase());
                if (!city) {
                    return res.status(404).json({ message: "Kota tidak ditemukan" });
                }
                res.status(200).json({ message: "Kota berhasil ditemukan", data: city });
            });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const GetCost = async (req, res) => {
    try {
        const { origin, destination, weight, courier } = req.params;
        const url = `https://api.rajaongkir.com/starter/cost`;
        // const response = await axios.post(url);
        fetch(url, {
            method: "POST",
            headers: {
                key: process.env.RAJAONGKIR_API_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                origin,
                destination,
                weight,
                courier,
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            res.status(200).json({ message: "Berhasil", data, jsonBody: JSON.stringify({
                origin,
                destination,
                weight,
                courier}) });
        });
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { GetProvinceByName, GetCityByName, GetCost };