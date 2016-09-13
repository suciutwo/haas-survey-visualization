/* Here's the part I wrote. This is the part you would change. */

const individualScore = (field) => {
	let axes = categories.map((c) => ({
		axis: c.abbr,
		value: c.result()[field]
	}));
	// axes[3].axis = field; axes[3].yOffset = -2;
	return axes;
};

const genericStarChart = (xLabel, axes) => [
	{
		xLabel,
		className: 'public-service-chart',
		axes,
	}
];

var svg;

const renderPage = function () {
	$j('#haas-chart').empty();
	const data = genericStarChart('All Data', categories.map(cat => cat.asAxis()));

	const chart = RadarChart.chart();
	let cfg = chart.config();// retrieve default config
	svg = d3
		.select('#haas-chart')
		.append('svg')
		.attr('width', cfg.w + 200)
		.attr('height', cfg.h + 200);

	chart.config({
		w: cfg.w / 2,
		h: cfg.h / 2,
		levels: 0,
		circles: false,
		maxValue: 3,
	});
	cfg = chart.config();

	function render () {
		const areaData = areas.map(area => genericStarChart(area, individualScore(area.toLowerCase())));
		const game = svg
			.selectAll('g.game')
			.data(areaData);
		game
			.enter()
			.append('g')
			.classed('game', 1);
		const offset = 30;
		const padding = 100;
		const translations = [
			[
				offset, offset,
			],
			[
				cfg.w + padding,
				offset,
			],
			[
				offset, cfg.h + padding,
			],
			[
				cfg.w + padding,
				cfg.h + padding,
			],
		];

		game.attr('transform', (d, i) => 'translate(' + translations[i][0] + ',' + (translations[i][1]) + ')').call(chart);
		game
			.enter()
			.append('text')
			.classed('area-label', 1)
			.attr('transform', (d, i) => 'translate(' + translations[i][0] + ',' + ( + translations[i][1] - 10) + ')')
			.attr('fill', '#820000')
			.text(d => d[0].xLabel);
	}
	render();

	// Hide the survey response summary header and all of the questions so that only the chart displays
	$j('#ResponseSummaryHeader').hide(); // header
	$j('.QuestionOuter').hide(); // all questions

	// Label the final button "Submit" instead of "Save & Continue"
	$j('#NextButton').attr('value', 'Submit');
};

$j(document).ready(renderPage);
