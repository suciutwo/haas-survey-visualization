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

function Category (name, qID) {
	this.name = name;
	this.qID = qID;
	this.result = () => getResultForCategory(qID);
	this.asAxis = () => ({
		axis: this.name,
		value: this.result().totalScore()
	});
}

function CategoryResult (experience, strength, impact, interest) {
	this.experience = experience;
	this.strength = strength;
	this.impact = impact;
	this.interest = interest;
	this.totalScore = () => this.experience + this.strength + this.impact + this.interest;
}

const areas = ['Experience', 'Strength', 'Impact', 'Interest'];

const categories = [
	new Category('Activism', 24),
	new Category('Community Engaged Learning and Research', 27),
	new Category('Direct Service', 28),
	new Category('Philanthropy', 29),
	new Category('Policy/Politics', 30),
	new Category('Social Entrepreneurship', 31),
];
