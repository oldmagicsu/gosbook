const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8000;
const HOST = 'localhost';
const BASE_DIR = __dirname;

// MIME类型映射
const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml'
};

// 创建服务器
const server = http.createServer((req, res) => {
    let filePath = req.url === '/' ? '/index.html' : req.url;
    let fullPath = path.join(BASE_DIR, filePath);
    
    // 检查文件是否存在
    fs.stat(fullPath, (err, stats) => {
        if (err || !stats.isFile()) {
            // 404错误
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>404 Not Found</h1><p>The requested resource was not found.</p>');
            console.log(`404 - ${filePath}`);
            return;
        }
        
        // 获取文件扩展名并设置MIME类型
        const ext = path.extname(fullPath);
        const contentType = mimeTypes[ext] || 'application/octet-stream';
        
        // 读取并发送文件
        fs.readFile(fullPath, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end('<h1>500 Internal Server Error</h1>');
                console.log(`500 - Error reading file: ${filePath}`);
            } else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(data);
                console.log(`200 - ${filePath}`);
            }
        });
    });
});

// 启动服务器
server.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}/`);
    console.log('Press Ctrl+C to stop the server');
});

// 处理Ctrl+C
process.on('SIGINT', () => {
    console.log('\nServer shutting down...');
    server.close(() => {
        console.log('Server stopped');
        process.exit(0);
    });
});