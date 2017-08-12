module.exports = function(config) {
    config.set({
 
       // frameworks to use
       frameworks: [
          'mocha',
          'chai',
          'sinon'
       ],
 
       // list of files / patterns to load in the browser
       files: [
          './test.js'
       ],
 
       // list of preprocessors
       preprocessors: {
          './test.js': ['webpack', 'sourcemap']
       },
 
       webpack: require('./webpack.config.test'),
 
       webpackMiddleware: {
          noInfo: false,
          stats: {
             children: false,
             chunks: false
          }
       },
 
       reporters: ['mocha', 'junit'],
 
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
 
       logLevel: config.LOG_WARN
    });
 };