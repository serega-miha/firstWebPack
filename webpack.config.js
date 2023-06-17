
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')



module.exports = {
    mode: 'production',
    // watch: true,

    //entry- файлы которые перкидывваем в dist
    entry: {
        //получаем полный путь к файлу
        filename: path.resolve(__dirname,'src/index.js')
    
    },
    //подсказки отключены, максимальный разер изображения
    performance: {
        hints: false,
        maxAssetSize: 512000,
        maxEntrypointSize: 512000
    },
    output: {
        //указываем в какую папку будет кидаться все файлы, можно сделать константой и называть как угодно через {}
        path: path.resolve(__dirname,'dist'),
        // меняем название штвучюоы
         // filename: '[name][contenthash].js',
        //  assetModuleFilename: '[name][ext]', 
        assetModuleFilename: 'assets/[hash][ext][query]', // Все ассеты будут
         filename: 'index.js',
        
        clean: true
    },
    devtool: 'source-map',
    //npm i -D webpack-dev-server установили локальный сервер и пишем настройки для него
    devServer: {
        port: 8889,
        compress: true,
        hot: true,
        watchFiles:['./src/index.html'],
        static: {
            directory: path.join(__dirname, 'dist')
            
        },
      
        //чтобы запустить npx webpack serve
    },
    //правила подключения всех дополнительных файлов, например scss
    module: {
        rules: [
            {
                //при обработки файлов scss будут использоваться библиотеки из use
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {                                       
                test: /\.(png|jpg|jpeg|gif)$/i,
                type: 'asset/resource', // создает отдельный файл и экспортирует URL
              },
              {
                test: /\.svg$/,
                loader: 'svg-sprite-loader',
            },
              {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
              },
              {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: "ie 11" }]
                        ]
                    }
                }
            }

        ]
    },
    plugins: [
        new htmlWebpackPlugin ({
            title: 'My Web Page',
            filename: 'index.html',
            template: 'src/index.html'
        })
        // new CopyWebpackPlugin({
        //   patterns: [
        //     { from: 'src/img', to: 'dist/img' },
        //     { from: 'src/icon', to: 'dist/icon' },
        //     { from: 'src/fonts', to: 'dist/fonts' },
        //   ],
        // }),
      ],
}