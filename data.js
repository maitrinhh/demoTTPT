const fs = require('fs');

function generateWeatherData(numRecords) {
    const data = [];
    for (let i = 0; i < numRecords; i++) {
        const record = {
            temperature: (Math.random() * 40).toFixed(2),  // Nhiệt độ ngẫu nhiên từ 0 đến 40
            humidity: (Math.random() * 100).toFixed(2),  // Độ ẩm ngẫu nhiên từ 0 đến 100
            pressure: (Math.random() * 50 + 950).toFixed(2),  // Áp suất ngẫu nhiên từ 950 đến 1000
            timestamp: new Date().toISOString()  // Thời gian hiện tại
        };
        data.push(record);
    }
    return data;
}

const weatherData = generateWeatherData(1000);

// Lưu vào file
fs.writeFileSync('weatherData.json', JSON.stringify(weatherData, null, 2));

console.log('Đã tạo file weatherData.json với 1000 dữ liệu thời tiết.');
