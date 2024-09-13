import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import path from 'path';
// const express = require('express');
// const { createProxyMiddleware } = require('http-proxy-middleware');
// const path = require('path');
import { fileURLToPath } from 'url';

// 使用fileURLToPath将import.meta.url转换为文件路径
const __filename = fileURLToPath(import.meta.url);
// 获取文件所在的目录
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 8090; // 确保这个端口与你的前端应用不同

// 设置静态文件服务
const distDir = path.join(__dirname, 'dist'); // 假设你的dist文件夹在项目根目录下
app.use(express.static(distDir));

// 配置反向代理
app.use('/api', createProxyMiddleware({
  target: 'http://localhost:3000', // 你的后端API服务器地址
  changeOrigin: true, // 如果你的后端服务器设置了CORS，并且期望请求来自特定的源，你可能需要这个选项
  pathRewrite: {'^/api' : ''} // 重写路径，去除请求URL中的/api部分
}));
// 为SPA设置通配符路由
app.get('/*', (req, res) => {
  res.sendFile(path.join(distDir, 'index.html'));
});
// 监听端口
app.listen(PORT, () => {
  console.log(`反向代理服务器运行在 http://localhost:${PORT}/`);
  console.log(`静态文件服务指向 ${distDir}`);
});