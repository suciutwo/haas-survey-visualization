function Category (name, qID) {
	this.name = name;
	this.qID = qID;
	this.result = () => new CategoryResult(qID);
	this.asAxis = () => ({
		axis: this.name,
		value: this.result().totalScore()
	});
}

function CategoryResult (questionId) {
	this.experience = valueOfUserSelectedColumn(questionId, 1);
	this.strength = valueOfUserSelectedColumn(questionId, 2);
	this.impact = valueOfUserSelectedColumn(questionId, 3);
	this.interest = valueOfUserSelectedColumn(questionId, 4);
	this.totalScore = () => this.experience + this.strength + this.impact + this.interest;
}

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

const areas = ['Experience', 'Strength', 'Impact', 'Interest'];

var categories;

const initCategories = () => categories = [
	new Category('Activism', 24),
	new Category('Community Engaged Learning and Research', 27),
	new Category('Direct Service', 28),
	new Category('Philanthropy', 29),
	new Category('Policy/Politics', 30),
	new Category('Social Entrepreneurship', 31),
];

initCategories();
