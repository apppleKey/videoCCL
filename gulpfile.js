var gulp = require('gulp');
// task，run，watch，src，和dest
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var babel = require('gulp-babel');
var plumber = require("gulp-plumber");
// var combiner = require('stream-combiner2');
// 编译Sass并产生兼容性
gulp.task('sass', function () {

    gulp.src(['./src/scss/*.css'])
        .pipe(plumber({
            errorHandler: function (err) {
                this.emit("end")
            }
        }))
        .pipe(sass())
        .pipe(postcss([autoprefixer({
            browsers: ['last 2 versions']
        })]))
        .pipe(gulp.dest('dist/css'));
});

// 兼容性css
gulp.task('css', function () {

    gulp.src(['./src/css/*.css'])
        .pipe(plumber({
            errorHandler: function (err) {
                this.emit("end")
            }
        }))
        .pipe(postcss([autoprefixer({
            browsers: ['last 2 versions']
        })]))
        .pipe(gulp.dest('dist/css'));

});

// 合并，压缩文件
// gulp.task('scripts', function() {
//     gulp.src('./js/*.js')
//         .pipe(concat('all.js'))
//         .pipe(gulp.dest('./dist'))
//         .pipe(rename('all.min.js'))
//         .pipe(uglify())
//         .pipe(gulp.dest('./dist1'));
// });

// es6转码
// gulp.task('es6', function () {
//    gulp.src(['src/js/*.js'])
//         .pipe(plumber({
//             errorHandler: function () {
//                 this.emit("end");
//             }
//         }))
//         .pipe(babel({
//             presets: ['es2015']
//         }))
//         .pipe(gulp.dest('dist/js/'))
//         .pipe(uglify())
//         .pipe(rename({
//             extname: '.min.js'
//         }))
//         .pipe(gulp.dest("dist/js"));
// });
gulp.task("es6", function() {
    return gulp.src("src/js/*.js")
                // .pipe(plumber())
                .pipe(babel({}))
                .pipe(gulp.dest("dist/js"));
                
});


// 默认任务
gulp.task('default', function () {
    // gulp.run('lint', 'sass', 'scripts');
    gulp.series('sass', "css", "es6")();

    // 监听文件变化
    gulp.watch('./src/scss/*.scss',
        gulp.series('sass')
    );
    gulp.watch('./src/css/*.css',
        gulp.series('css')
    );
    gulp.watch('src/js/*.js',
        gulp.series('es6')
    );
});