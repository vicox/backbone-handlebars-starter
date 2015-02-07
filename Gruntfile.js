module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        exec: {
            bower: {
                cmd: 'bower install'
            }
        },
        copy: {
            libs: {
                files: [
                    { expand: true, cwd: 'bower_components/requirejs/', src: 'require.js', dest: 'js/' },
                    { expand: true, cwd: 'bower_components/requirejs-text/', src: 'text.js', dest: 'js/lib/' },
                    { expand: true, cwd: 'bower_components/jquery/dist/', src: 'jquery.js', dest: 'js/lib/' },
                    { expand: true, cwd: 'bower_components/underscore/', src: 'underscore.js', dest: 'js/lib/' },
                    { expand: true, cwd: 'bower_components/backbone/', src: 'backbone.js', dest: 'js/lib/' },
                    { expand: true, cwd: 'bower_components/handlebars/', src: 'handlebars.js', dest: 'js/lib/' },
                    { expand: true, cwd: 'bower_components/bootstrap/dist/js/', src: 'bootstrap.js', dest: 'js/lib/' },
                    { expand: true, cwd: 'bower_components/bootstrap/dist/css/', src: 'bootstrap.css*', dest: 'css/' },
                    { expand: true, cwd: 'bower_components/bootstrap/dist/fonts/', src: 'glyphicons-*', dest: 'fonts/' }
                ]
            },
            dist: {
                files: [
                    { expand: true, cwd: 'fonts/', src: '*', dest: 'dist/fonts/' },
                    { src: 'index.html', dest: 'dist/index.html' }
                ]
            }
        },
        cssmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'css',
                    src: ['*.css'],
                    dest: 'dist/css'
                }]
            }
        },
        uglify: {
            dist: {
                files: [{ expand: true, cwd: 'js', src: 'require.js', dest: 'dist/js' }]
            }
        },
        requirejs: {
            dist: {
                options: {
                    baseUrl: 'js/lib',
                    mainConfigFile: "js/app.js",
                    name: "app",
                    out: "dist/js/app.js",
                    findNestedDependencies: true
                }
            }
        },
        handlebars: {
            compile: {
                options: {
                    amd: true,
                    processName: function(filePath) {
                        return filePath.substring('templates/'.length, filePath.length - '.hbs'.length);
                    }
                },
                files: {
                    "js/app/templates.js": "templates/*.hbs"
                }
            }
        },
        sass: {
            compile: {
                files: {
                    'css/style.css': 'sass/style.scss'
                }
            }
        },
        watch: {
            handlebars: {
                files: ['templates/**/*.hbs'],
                tasks: ['handlebars:compile']
            },
            sass: {
                files: ['sass/**/*.scss'],
                tasks: ['sass:compile']
            }
        },
        clean: {
            bower: ['bower_components'],
            libs: ['js/require.js' ,'js/lib', 'css/bootstrap.css*', 'fonts/glyphicons-*'],
            handlebars: ['js/app/templates.js'],
            sass: ['css/style.css'],
            dist: ['dist']
        }
    });

    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-contrib-sass');

    grunt.registerTask('install', ['exec:bower', 'copy:libs', 'clean:bower']);
    grunt.registerTask('compile', ['handlebars:compile', 'sass:compile']);
    grunt.registerTask('dist', ['copy:dist', 'cssmin:dist', 'uglify:dist', 'requirejs:dist']);
    grunt.registerTask('build', ['install', 'compile', 'dist']);

};