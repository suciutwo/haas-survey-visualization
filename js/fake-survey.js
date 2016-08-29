categories.map((category) => {
	const cat = $j('<div class="categoryQuestions"><h4>' + category.name + '</h1></div>');
	for (let i = 1; i <= 4; i++) {
		var question = $j('<div><span class="areaName">' + areas[i - 1] + '</span></div>');
		const chosen = Math.ceil(Math.random() * 4);
		for (let j = 1; j <= 4; j++) {
			let option = $j('<input type="radio" name="' + category.name + '-' + i + '">');
			option.attr('id', 'QR~QID' + category.qID + '~' + i + '~' + j);
			if (j == chosen) {
				option.attr('checked', true);
			}
			question.append(option);
		}
		cat.append(question);
	}
	return cat;
}).forEach((catDiv) => {
	$j('#fake-survey').append(catDiv[0]);
});
