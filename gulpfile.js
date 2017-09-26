var gulp = require("gulp"),
	minifyCss = require("gulp-clean-css"),
	uglify = require("gulp-uglify"),
	htmlMin = require("gulp-htmlmin"),
	sass = require("gulp-sass"),
	livereload = require("gulp-livereload");

// 定义任务，压缩CSS
gulp.task("css", function(){
	gulp.src("css/*.css")
		.pipe(minifyCss())
		.pipe(gulp.dest("dist/css"));
});

// 定义任务，压缩js
gulp.task("js", ()=>{
	gulp.src("js/*.js")
		.pipe(uglify())
		.pipe(gulp.dest("dist/js"));
});

// 定义任务，压缩html
gulp.task("html", ()=>{
	gulp.src("html/*.html")
		.pipe(htmlMin({collapseWhitespace: true, minifyCSS:true, minifyJS:true}))
		.pipe(gulp.dest("dist/html"));
});

// 定义任务，编译.scss文件
gulp.task("sass", ()=>{
	gulp.src("sass/*.scss")
		.pipe(sass({outputStyle: 'compact'}))
		.pipe(gulp.dest("dist/css"))
		.pipe(livereload());
});

// 配置监视任务
gulp.task("watch", function() {
	livereload.listen();
	// 监听到 .scss 文件的修改，自动编译
	gulp.watch("sass/*.scss", ["sass"]);
	// 监听到 css 文件修改，自动压缩
	gulp.watch("css/*.css", ["css"]);
});