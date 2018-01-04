module.exports = {
    plugins: [
        require('autoprefixer')({
            // 提供最近两个版本的兼容写法，-webkit- -moz- -ms-
            browsers: ['last 2 versions']
            // 兼容到ie8
            // browsers: ['last 2 versions', 'Firefox < 18', 'Chrome < 20', 'ie >= 8']
        })
    ]
}