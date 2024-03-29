const path = require('path');

const env = process.argv.slice(-1)[0];

// eslint-disable-next-line no-console
console.log(`\n\n-----------env-------------\n\n${env}\n\n`);

const config = {
    projectName: 'tools',
    date: '2019-9-11',
    designWidth: 750,
    deviceRatio: {
        '640': 2.34 / 2,
        '750': 1,
        '828': 1.81 / 2
    },
    sourceRoot: 'src',
    outputRoot: 'dist',
    plugins: {
        babel: {
            sourceMap: true,
            presets: [
                ['env', {
                    modules: false
                }]
            ],
            plugins: [
                'transform-decorators-legacy',
                'transform-class-properties',
                'transform-object-rest-spread'
            ]
        }
    },
    defineConstants: {
        ENV: env,
        NODE_ENV: process.env.NODE_ENV
    },
    copy: {
        patterns: [],
        options: {}
    },
    alias: {
        '@/src': path.resolve(__dirname, '..', 'src')
    },
    weapp: {
        module: {
            postcss: {
                autoprefixer: {
                    enable: true,
                    config: {
                        browsers: [
                            'last 3 versions',
                            'Android >= 4.1',
                            'ios >= 8'
                        ]
                    }
                },
                pxtransform: {
                    enable: true,
                    config: {

                    }
                },
                url: {
                    enable: true,
                    config: {
                        limit: 10240 // 设定转换尺寸上限
                    }
                },
                cssModules: {
                    enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
                    config: {
                        namingPattern: 'module', // 转换模式，取值为 global/module
                        generateScopedName: '[name]__[local]___[hash:base64:5]'
                    }
                }
            }
        }
    },
    h5: {
        publicPath: '/',
        staticDirectory: 'static',
        module: {
            postcss: {
                autoprefixer: {
                    enable: true,
                    config: {
                        browsers: [
                            'last 3 versions',
                            'Android >= 4.1',
                            'ios >= 8'
                        ]
                    }
                },
                cssModules: {
                    enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
                    config: {
                        namingPattern: 'module', // 转换模式，取值为 global/module
                        generateScopedName: '[name]__[local]___[hash:base64:5]'
                    }
                }
            }
        }
    }
};

module.exports = function (merge) {
    if (process.env.NODE_ENV === 'development') {
        return merge({}, config, require('./dev'));
    }
    return merge({}, config, require('./prod'));
};
