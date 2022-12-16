const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        static: {
            directory: path.join(__dirname, './dist'),
        },
        historyApiFallback: true,
    },
};
