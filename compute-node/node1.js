const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 3001; // hoặc 3002 cho node2

// Đọc dữ liệu từ file JSON
const weatherData = JSON.parse(fs.readFileSync('weatherData.json'));

// Chia nhỏ dữ liệu thành các phần cho node xử lý
const chunkSize = Math.ceil(weatherData.length / 2);  // Chia đều thành 2 phần
const start = PORT === 3001 ? 0 : chunkSize;
const end = PORT === 3001 ? chunkSize : weatherData.length;

app.get('/processData', (req, res) => {
    // Lấy phần dữ liệu cần xử lý
    const dataToProcess = weatherData.slice(start, end);

    // Tính toán nhiệt độ trung bình từ dữ liệu
    const avgTemp = dataToProcess.reduce((acc, record) => acc + parseFloat(record.temperature), 0) / dataToProcess.length;

    res.json({ avgTemp });
});

app.listen(PORT, () => {
    console.log(`Node ${PORT === 3001 ? '1' : '2'} đang chạy trên cổng ${PORT}`);
});
