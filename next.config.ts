/** @type {import('next').NextConfig} */
const nextConfig = {
  // 固定根目录解决锁文件冲突
  turbopack: {
    rootDir: __dirname
  },
  // 关闭严格模式减少重复渲染编译
  reactStrictMode: false,
  // 开启SWC提速压缩
  swcMinify: true,
  // 关闭多余开发监听
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 2
  }
}

module.exports = nextConfig