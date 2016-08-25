/* Here's the part I wrote. This is the part you would change. */

$j(document)
	.ready(function () {
		var valueOfUserSelectedColumn = function (questionId, rownumber) {
			var idName;
			for (var columnNumber = 1; columnNumber <= 4; columnNumber++) {
				idName = '#QR\\~QID' + questionId + '\\~' + rownumber + '\\~' + columnNumber;
				if ($j(idName)
						.prop('checked')) {
					return columnNumber - 1;
				}
			}
			return 0;
		};

		var sumQuestion = function (questionId) {
			var sum = 0;
			for (var rowNumber = 1; rowNumber <= 4; rowNumber++) {
				sum += valueOfUserSelectedColumn(questionId, rowNumber);
			}
			return sum;
		};

		var activismQID = 24;
		var communityEngagedQID = 27;
		var directServiceQID = 28;
		var philanthropyQID = 29;
		var policyPoliticsQID = 30;
		var socialEntrepreneurshipQID = 31;
		var data = [{
			className: 'public-service-chart',
			axes: [{
				axis: 'Activism',
				value: sumQuestion(activismQID)
			}, {
				axis: 'Community Engaged Learning and Research',
				value: sumQuestion(communityEngagedQID),
				xOffset: -40
			}, {
				axis: 'Direct Service',
				value: sumQuestion(directServiceQID),
				xOffset: -18
			}, {
				axis: 'Philanthropy',
				value: sumQuestion(philanthropyQID),
				yOffset: -2
			}, {
				axis: 'Policy/Politics',
				value: sumQuestion(policyPoliticsQID),
				xOffset: 20
			}, {
				axis: 'Social Entrepreneurship',
				value: sumQuestion(socialEntrepreneurshipQID),
				xOffset: 37
			}]
		}];

		var experience = genericStarChart('Experience', [1, 1, 1, 1, 1, 1]);
		var interest = genericStarChart('Interest', [4, 4, 4, 4, 4, 4]);
		var strength = genericStarChart('Strength', [2, 2, 2, 2, 2, 2]);
		var impact = genericStarChart('Impact', [3, 3, 3, 3, 3, 3]);

		function genericStarChart (name, rowNumberArray) {
			return [{
				className: 'public-service-chart',
				axes: [{
					axis: '',
					value: valueOfUserSelectedColumn(activismQID, rowNumberArray[0])
				}, {
					axis: '',
					value: valueOfUserSelectedColumn(communityEngagedQID, rowNumberArray[1]),
					xOffset: -40
				}, {
					axis: '',
					value: valueOfUserSelectedColumn(directServiceQID, rowNumberArray[2]),
					xOffset: -18
				}, {
					axis: name,
					value: valueOfUserSelectedColumn(philanthropyQID, rowNumberArray[3]),
					yOffset: -2
				}, {
					axis: '',
					value: valueOfUserSelectedColumn(policyPoliticsQID, rowNumberArray[4]),
					xOffset: 20
				}, {
					axis: '',
					value: valueOfUserSelectedColumn(socialEntrepreneurshipQID, rowNumberArray[5]),
					xOffset: 37
				}]
			}];
		}

		var chart = RadarChart.chart();
		var cfg = chart.config();// retrieve default config
		var svg = d3.select('#haas-chart')
			.append('svg')
			.attr('width', cfg.w)
			.attr('height', cfg.h + cfg.h / 4);
		chart.config({
			maxValue: 12
		});
		svg.append('g')
			.classed('single', 1)
			.datum(data)
			.call(chart);

		chart.config({
			w: cfg.w / 4,
			h: cfg.h / 4,
			axisText: true,
			levels: 0,
			circles: false,
			maxValue: 3
		});
		cfg = chart.config();

		function render () {
			var game = svg.selectAll('g.game')
				.data([interest, experience, strength, impact]);
			game.enter()
				.append('g')
				.classed('game', 1);
			game.attr('transform',
				function (d, i) {
					return 'translate(' + (i * cfg.w) + ',' + (cfg.h * 4) + ')';
				})
				.call(chart);
		}
		render();

		// Hide the survey response summary header and all of the questions so that only the chart displays
		$j('#ResponseSummaryHeader')
			.hide(); // header
		$j('.QuestionOuter')
			.hide(); // all questions

		// Label the final button "Submit" instead of "Save & Continue"
		$j('#NextButton')
			.attr('value', 'Submit');
	});
