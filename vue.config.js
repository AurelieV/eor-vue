module.exports = {
  chainWebpack: config => {
    const oneOfsMap = config.module.rule('scss').oneOfs.store
    oneOfsMap.forEach(item => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          // Or array of paths
          resources: ['./src/styles/_responsive.scss'],
        })
        .end()
    })
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3003',
        secure: false,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
}
