/* Here's the part I wrote. This is the part you would change. */

$j(document)
	.ready(function () {
		const valueOfUserSelectedColumn = function (questionId, rownumber) {
			for (let columnNumber = 1; columnNumber <= 4; columnNumber++) {
				let idName = '#QR\\~QID' + questionId + '\\~' + rownumber + '\\~' + columnNumber;
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

		const activismQID = 24;
		const communityEngagedQID = 27;
		const directServiceQID = 28;
		const philanthropyQID = 29;
		const policyPoliticsQID = 30;
		const socialEntrepreneurshipQID = 31;
		const data = [{
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

		const experience = genericStarChart('Experience', [1, 1, 1, 1, 1, 1]);
		const interest = genericStarChart('Interest', [4, 4, 4, 4, 4, 4]);
		const strength = genericStarChart('Strength', [2, 2, 2, 2, 2, 2]);
		const impact = genericStarChart('Impact', [3, 3, 3, 3, 3, 3]);

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

		const chart = RadarChart.chart();
		let cfg = chart.config();// retrieve default config
		const svg = d3.select('#haas-chart')
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
			const game = svg.selectAll('g.game')
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
