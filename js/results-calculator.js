const getResultForCategory = questionId => new CategoryResult(
	valueOfUserSelectedColumn(questionId, 1),
	valueOfUserSelectedColumn(questionId, 2),
	valueOfUserSelectedColumn(questionId, 3),
	valueOfUserSelectedColumn(questionId, 4)
);

const valueOfUserSelectedColumn = function (questionId, rownumber) {
	let idName;
	for (let columnNumber = 1; columnNumber <= 4; columnNumber++) {
		idName = '#QR\\~QID' + questionId + '\\~' + rownumber + '\\~' + columnNumber;
		if ($j(idName)
				.prop('checked')) {
			return columnNumber - 1;
		}
	}
	return 0;
};
