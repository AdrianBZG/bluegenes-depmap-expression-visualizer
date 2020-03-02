import React from 'react';
import Plot from 'react-plotly.js';

class RootContainer extends React.Component {
	render() {
		return (
			<div className="rootContainer">
				<ApexChart />
			</div>
		);
	}
}

export default RootContainer;

class ApexChart extends React.Component {
	render() {
		return (
			<Plot
				data={[
					{
						x: [1, 2, 3],
						y: [2, 6, 3],
						type: 'box',
						mode: 'lines+markers',
						marker: { color: 'red' }
					},
					{ type: 'bar', x: [1, 2, 3], y: [2, 5, 3] }
				]}
				layout={{ title: 'A Fancy Plot' }}
			/>
		);
	}
}
