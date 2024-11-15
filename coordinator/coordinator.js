const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Import cors

const app = express();
const PORT = 4000;

// Cấu hình CORS để cho phép frontend từ http://127.0.0.1:5500 truy cập API
app.use(cors({
    origin: 'http://127.0.0.1:5500', // Cho phép yêu cầu từ localhost:5500
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));

const nodes = ['http://localhost:3001', 'http://localhost:3002'];

app.get('/aggregateData', async (req, res) => {
    try {
        const results = await Promise.all(nodes.map(node => axios.get(`${node}/processData`)));
        const avgTemps = results.map(response => response.data.avgTemp);

        // Tính nhiệt độ trung bình tổng thể từ các node
        const overallAvgTemp = avgTemps.reduce((acc, temp) => acc + temp, 0) / avgTemps.length;

        res.json({ overallAvgTemp });
    } catch (error) {
        res.status(500).json({ error: 'Không thể tổng hợp dữ liệu' });
    }
});

app.listen(PORT, () => {
    console.log(`Dịch vụ điều phối chạy trên cổng ${PORT}`);
});
