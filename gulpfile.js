var gulp         = require('gulp'),
		sass         = require('gulp-sass'),
		browserSync  = require('browser-sync'),
		del          = require('del'),
		imagemin     = require('gulp-imagemin'),
		pngquant     = require('imagemin-pngquant'),
		spritesmith  = require('gulp.spritesmith');
		cache        = require('gulp-cache'),
		autoprefixer = require('gulp-autoprefixer');


gulp.task('sass', function(){
	return gulp.src('app/sass/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
      browsers: ['> 5%'],
      cascade: false
    }))
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});

gulp.task('watch', ['browser-sync'], function() {
	gulp.watch('app/sass/**/*.scss', ['sass']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('clean', function() {
	return del.sync('dist');
});

gulp.task('img', function() {
	return gulp.src('app/images/**/*')
		.pipe(imagemin({use: [pngquant]}))
		.pipe(gulp.dest('dist/images'));
});

gulp.task('sprite', function () {
  var spriteData = gulp.src('app/images/icons/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: '_sprite.scss',
    cssFormat: 'css',
    imgPath: '../images/sprite.png',
    padding: 15
  }));
  spriteData.img.pipe(gulp.dest('app/images'));
  spriteData.css.pipe(gulp.dest('app/sass/sprite'));
});

gulp.task('build', ['clean', 'img', 'sass'], function() {

	var buildHtml = gulp.src('app/*.html')
	.pipe(gulp.dest('dist'));

	var buildPhp = gulp.src('app/*.php')
	.pipe(gulp.dest('dist'));

	var buildCSS = gulp.src('app/css/**/*')
	.pipe(gulp.dest('dist/css'));

	var buildFonts = gulp.src('app/fonts/**/*')
	.pipe(gulp.dest('dist/fonts'))

	var buildJs = gulp.src('app/js/**/*')
	.pipe(gulp.dest('dist/js'))	

	var buildLibs = gulp.src('app/libs/**/*')
	.pipe(gulp.dest('dist/libs'))	

});

gulp.task('clear', function (callback) {
	return cache.clearAll();
})

gulp.task('default', ['watch']);
