const gulp = require("gulp");
const gulpSass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const handlebars = require("gulp-compile-handlebars");
const rename = require("gulp-rename");
const connect = require("gulp-connect");
const products = require("./data").products;
gulpSass.compiler = require("node-sass");

gulp.task("connect", () => {
    return connect.server();
});

gulp.task("sass", () => {
    return gulp
        .src("./scss/main.scss")
        .pipe(sourcemaps.init())
        .pipe(
            gulpSass({ outputStyle: "compressed" }).on(
                "error",
                gulpSass.logError
            )
        )
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./css"));
});

gulp.task("template", () => {
    const templateData = {
        products
    };
    options = {
        ignorePartials: true,
        batch: ["./templates/partials"],
        helpers: {
            ifvalue: function(conditional, options) {
                if (options.hash.value === conditional) {
                    return options.fn(this);
                } else {
                    return options.inverse(this);
                }
            },
            json: function(context) {
                return JSON.stringify(context);
            }
        }
    };
    return gulp
        .src("templates/*.hbs")
        .pipe(handlebars(templateData, options))
        .pipe(
            rename(path => {
                path.extname = ".html";
            })
        )
        .pipe(gulp.dest("./"));
});

gulp.task("default", done => {
    gulp.task("connect")();
    gulp.watch("./scss/**/*.scss", gulp.series(["sass"]));
    gulp.watch("./templates/**/*.hbs", gulp.series(["template"]));
    done();
});
