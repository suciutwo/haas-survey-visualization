/* Here's the part I wrote. This is the part you would change. */

function Category (name, qID) {
	this.name = name;
	this.qID = qID;
	this.result = getResultForCategory(qID);
	this.asAxis = () => ({
		axis: this.name,
		value: this.result.totalScore()
	});
}

const categories = [
	new Category('Activism', 24),
	new Category('Community Engaged Learning and Research', 27),
	new Category('Direct Service', 28),
	new Category('Philanthropy', 29),
	new Category('Policy/Politics', 30),
	new Category('Social Entrepreneurship', 31),
];

const individualScore = (field) => {
	let axes = categories.map((c) => ({
		value: c.result[field]
	}));
	axes[3].axis = field;
	axes[3].yOffset = -2;
	return axes;
};

const genericStarChart = (name) => [{
	className: 'public-service-chart',
	axes: individualScore(name)
}];

$j(document)
	.ready(function () {
		const data = [{
			className: 'public-service-chart',
			axes: categories.map(cat => cat.asAxis())
		}];

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
			levels: 0,
			circles: false,
			maxValue: 3
		});
		cfg = chart.config();

		function render () {
			const game = svg.selectAll('g.game')
				.data(areas.map(area => area.toLowerCase()).map(area => genericStarChart(area)));
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
