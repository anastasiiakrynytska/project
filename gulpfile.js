const gulp = require('gulp');
const gulpSass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const handlebars = require('gulp-compile-handlebars');
const rename = require('gulp-rename');
const connect = require('gulp-connect');
gulpSass.compiler = require('node-sass');

gulp.task('connect', () => {
    return connect.server();
})

gulp.task('sass', () => {
    return gulp.src('./scss/main.scss')
        .pipe(sourcemaps.init())
        .pipe(gulpSass({ outputStyle: 'compressed' }).on('error', gulpSass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./css'));
});

gulp.task('template', () => {
    const templateData = {
        products: {
            '1': {
                id: 1,
                name: 'М\'ятний капкейк',
                img: './images/1.jpg',
                ingredients: 'борошно, вершкове масло, цукор, яйця, ванілін, м\'ята, сметана, молоко, білий шоколад, харчовий барвник',
                price: 50
            },
            '2': {
                id: 2,
                name: 'Святковий капкейк',
                img: './images/2.jpg',
                ingredients: 'борошно, вершкове масло, цукор, розпушувач, яйця, ванілін, молоко, сметана, білий шоколад, молочний шоколад',
                price: 50
            },
            '3': {
                id: 3,
                name: 'Вершковий капкейк',
                img: './images/3.jpg',
                ingredients: 'борошно, вершкове масло, цукор, яйця, ванілін, вершки, сметана, молоко, білий шоколад, горіхи',
                price: 50
            },
            '4': {
                id: 4,
                name: 'Полунично-шоколадний капкейк',
                img: './images/4.jpg',
                ingredients: 'борошно, вершкове масло, цукор, яйця, ванілін, полуниця, сметана, молоко, білий шоколад, темний шоколад',
                price: 50
            },
            '5': {
                id: 5,
                name: 'Шоколадний капкейк',
                img: './images/5.jpg',
                ingredients: 'борошно, вершкове масло, цукор, яйця, ванілін, волоський горіх, сметана, молоко, молочний шоколад, темний шоколад',
                price: 50
            },
            '6': {
                id: 6,
                name: 'Малиновий капкейк',
                img: './images/6.jpg',
                ingredients: 'борошно, вершкове масло, цукор, яйця, ванілін, малина, сметана, молоко, білий шоколад, харчовий барвник',
                price: 50
            },
            '7': {
                id: 7,
                name: 'Горіховий капкейк',
                img: './images/7.jpg',
                ingredients: 'борошно, вершкове масло, цукор, яйця, ванілін, волоський горіх, сметана, молоко, мигдаль, темний шоколад',
                price: 50
            },
            '8': {
                id: 8,
                name: 'Ожиновий капкейк',
                img: './images/8.jpg',
                ingredients: 'борошно, вершкове масло, цукор, яйця, ванілін, ожина, сметана, молоко, білий шоколад, харчовий барвник',
                price: 50
            }
        }
    };
    options = {
        ignorePartials: true,
        batch: ['./templates/partials'],
        helpers: {
            ifvalue: function (conditional, options) {
                if (options.hash.value === conditional) {
                    return options.fn(this)
                } else {
                    return options.inverse(this);
                }
            }
        }
    }
    return gulp.src('templates/*.hbs')
        .pipe(handlebars(templateData, options))
        .pipe(rename((path) => {
            path.extname = '.html';
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('default', (done) => {
    gulp.task('connect')();
    gulp.watch('./scss/**/*.scss', gulp.series(['sass']));
    gulp.watch('./templates/**/*.hbs', gulp.series(['template']));
    done();
});