var gulp = require('gulp');

var inline = require('gulp-inline');

gulp.task('inline', function () {
	gulp.src('*.html')
		.pipe(inline({}))
		.pipe(gulp.dest('dist/'));
});
