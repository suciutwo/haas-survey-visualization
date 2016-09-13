function Category (name, qID, abbr) {
	this.name = name;
	this.qID = qID;
	this.abbr = abbr;
	this.result = () => new CategoryResult(qID);
	this.asAxis = () => ({
		axis: this.name,
		value: this
			.result()
			.totalScore(),
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
		if ($j(idName).prop('checked')) {
			return columnNumber - 1;
		}
	}
	return 0;
};

const areas = ['Experience', 'Strength', 'Impact', 'Interest',];

var categories;

const initCategories = () => categories = [
	new Category('Community Organizing and Activism', 24, 'Activism'),
	new Category('Community Engaged Learning and Research', 27, 'Learning'),
	new Category('Direct Service', 28, 'Direct'),
	new Category('Philanthropy', 29, 'Philanthropy'),
	new Category('Policy and Governance', 30, 'Policy'),
	new Category('Social Entrepreneurship and Corporate Social Responsibility', 31, 'Social E'),
];

initCategories();
