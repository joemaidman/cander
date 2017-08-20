var webpack = require("webpack");
module.exports = function (config) {
    config.set({
        mime: {
            'text/x-typescript': ['ts', 'tsx']
        },
        basePath: '',
        frameworks: ['mocha', 'chai', 'sinon'],
        files: [
            'test/**/*.spec.ts'
        ],
        exclude: [],
        preprocessors: {
            "test/**/*.spec.ts": ["webpack"]
        },
        // webpack configuration
        webpack: require("./webpack.config.js"),
        webpackMiddleware: {
            stats: "errors-only"
        },
        reporters: ['mocha'],
        port: 9876,
        colors: true,
        browsers: ['PhantomJS'],
        plugins: [
            'karma-mocha',
            'karma-chai',
            'karma-sinon',
            'karma-chrome-launcher',
            'karma-webpack',
            'karma-phantomjs-launcher',
            'karma-sourcemap-loader',
            'karma-mocha-reporter',
            'karma-junit-reporter'
        ],

        singleRun: false,

        junitReporter: {
            outputDir: 'karmaResults',
            outputFile: 'junit.xml'
        },

        mochaReporter: {
            showDiff: true
        },

        logLevel: config.LOG_WARN,
        concurrency: Infinity
    });
};