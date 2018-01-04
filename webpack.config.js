/**
 * Created by fuzl on 2017-10-30.
 */
let URL = require("url")
let Path = require("path")
let webpack = require("webpack")
let HtmlWebpackPlugin = require("html-webpack-plugin")
let ExtractTextWebpackPlugin = require("extract-text-webpack-plugin")
let mockMap = require("./mockup")
let publicPath = ""

module.exports = function(options){
    options = options || {}
    return {
        entry: {
            vendor: Path.resolve(__dirname, "src/vendor.js"),
            build:  Path.resolve(__dirname, "src/index.js")
        },
        output: {
            path: Path.resolve(__dirname, "dist"),
            filename: options.dev ? "js/[name].js" : "js/[name].js?[chunkhash:8]",
            chunkFilename: options.dev ? "js/[id].js" : "js/[id].js?[chunkhash:8]",
            publicPath: options.dev ? "" : publicPath
        },
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    use: ["vue-loader"]
                },
                {
                    test: /\.js$/,
                    use: ["babel-loader"],
                    exclude: [/node_modules/]
                },
                {
                    test: /\.less$/,
                    use: ExtractTextWebpackPlugin.extract({
                        fallback: "style-loader",
                        use: ["css-loader", "postcss-loader", "less-loader"]
                    })
                },
                {
                    test: /\.css$/,
                    use: ExtractTextWebpackPlugin.extract({
                        fallback: "style-loader",
                        use: ["css-loader", "postcss-loader"]
                    })
                },
                {
                    test: /\.(png|jpg|jpeg|gif)$/,
                    use: [{
                        loader: "url-loader",
                        options: {
                            limit: 4096,
                            name: options.dev ? "assets/[name].[ext]": "assets/[name]-[hash:8].[ext]",
                            publicPath: options.dev ? "/": publicPath
                        }
                    }]
                },
                {
                    test: /\.(ico|eot|ttf|woff|woff2|svg|svgz)$/,
                    use: [{
                        loader: "file-loader",
                        options: {
                            name: options.dev ? "assets/[name].[ext]": "assets/[name]-[hash:8].[ext]",
                            publicPath: options.dev ? "/": publicPath
                        }
                    }]
                },
                {
                    test: /\.pug/,
                    use: [{
                        loader: "pug-loader",
                        options: {
                            pretty: options.dev
                        }
                    }]
                }
            ]
        },
        resolve: {},
        plugins: [
            new ExtractTextWebpackPlugin({
                filename: options.dev ? 'css/[name].css' : "css/[name].[contenthash:8].css"
            }),
            new webpack.optimize.CommonsChunkPlugin({
                names: ["vendor", "manifest"],
                // 针对ExtractTextWebpackPlugin插件设置的属性，不遗漏样式文件
                minChunks: Infinity
            }),
            new webpack.DefinePlugin({
                'process.env': options.dev ? JSON.stringify("development"): JSON.stringify("production")
            }),
            new HtmlWebpackPlugin({
                filename: "index.html",
                template: "src/layout.pug",
                title: "XX管理平台"
            }),
        ],
        devtool: options.dev ? "#source-map": "#source-map",
        devServer: {
            contentBase: ['dist', 'mock'],
            proxy: {
                "/api/": {
                    target: "http://192.168.110.179",
                    bypass: function(res, req){
                        let url = res.url
	                    let urlObject = URL.parse(url)
                        if (options.mock) {
                            return mockMap[urlObject.pathname]
                        }
                    }
                }
            }
        }
    }
}