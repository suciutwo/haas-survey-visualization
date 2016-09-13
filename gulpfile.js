var gulp = require('gulp');

var inline = require('gulp-inline');

gulp.task('inline', function () {
	gulp.src('index.html')
		.pipe(inline({
		}))
		.pipe(gulp.dest('dist/'));
});
