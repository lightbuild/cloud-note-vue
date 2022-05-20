const path = require('path')

module.exports = {
  lintOnSave: false,
  chainWebpack: config =>{
    const dir = path.resolve(__dirname, 'src/assets/icons')
    config.module
      .rule('svg-sprite')
      .test(/\.svg$/)
      .include.add(dir).end() // 使用正则筛选出svg
      .use('svg-sprite-loader').loader('svg-sprite-loader').options({extract:false}).end()//不需要解析出文件
    config.plugin('svg-sprite').use(require('svg-sprite-loader/plugin'), [{plainSprite: true}])//插件选项
    config.module.rule('svg').exclude.add(dir) // 其他 svg loader 排除 icons 目录
  }
}