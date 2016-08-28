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
