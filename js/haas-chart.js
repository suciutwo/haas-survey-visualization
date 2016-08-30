/* Here's the part I wrote. This is the part you would change. */

const individualScore = (field) => {
	let axes = categories.map((c) => ({
		value: c.result()[field]
	}));
	axes[3].axis = field;
	axes[3].yOffset = -2;
	return axes;
};

const genericStarChart = (axes) => [
	{
		className: 'public-service-chart',
		axes,
	}
];

var svg;

const renderPage = function () {
	$j('#haas-chart').empty();
	const data = genericStarChart(categories.map(cat => cat.asAxis()));

	const chart = RadarChart.chart();
	let cfg = chart.config();// retrieve default config
	svg = d3
		.select('#haas-chart')
		.append('svg')
		.attr('width', cfg.w)
		.attr('height', cfg.h + cfg.h / 4);
	chart.config({maxValue: 12});
	svg
		.append('g')
		.classed('single', 1)
		.datum(data)
		.call(chart);

	chart.config({
		w: cfg.w / 4,
		h: cfg.h / 4,
		levels: 0,
		circles: false,
		maxValue: 3,
	});
	cfg = chart.config();

	function render () {
		const areaData = areas.map(area => genericStarChart(individualScore(area.toLowerCase())));
		const game = svg
			.selectAll('g.game')
			.data(areaData);
		game
			.enter()
			.append('g')
			.classed('game', 1);
		game.attr('transform', function (d, i) {
			return 'translate(' + (i * cfg.w) + ',' + (cfg.h * 4) + ')';
		}).call(chart);
	}
	render();

	// Hide the survey response summary header and all of the questions so that only the chart displays
	$j('#ResponseSummaryHeader').hide(); // header
	$j('.QuestionOuter').hide(); // all questions

	// Label the final button "Submit" instead of "Save & Continue"
	$j('#NextButton').attr('value', 'Submit');
};

$j(document).ready(renderPage);
