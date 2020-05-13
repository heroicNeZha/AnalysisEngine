module.exports = {
    devServer: {
        // open: true,
        // host: 'localhost',
        // port: 8080,
        // https: false,
        proxy: {//配置跨域
            '/api': {
                target: 'http://localhost:8082/api/',// 真实的后台接口
                ws: true,
                changOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
            
        }
    }
}