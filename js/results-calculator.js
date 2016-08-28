function CategoryResult (experience, strength, impact, interest) {
	this.experience = experience;
	this.strength = strength;
	this.impact = impact;
	this.interest = interest;
	this.totalScore = () => this.experience + this.strength + this.impact + this.interest;
}

const getResultForCategory = function (questionId) {
	return new CategoryResult(
		valueOfUserSelectedColumn(questionId, 1),
		valueOfUserSelectedColumn(questionId, 2),
		valueOfUserSelectedColumn(questionId, 3),
		valueOfUserSelectedColumn(questionId, 4)
	);
};

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

const sumQuestion = function (questionId) {
	let sum = 0;
	for (let rowNumber = 1; rowNumber <= 4; rowNumber++) {
		sum += valueOfUserSelectedColumn(questionId, rowNumber);
	}
	return sum;
};
