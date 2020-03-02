import React from 'react';
//import { generateData } from 'react-apexcharts';
import Chart from 'react-apexcharts';

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
	constructor(props) {
		super(props);

		this.state = {
			series: [
				{
					name: 'Jan',
					data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
				},
				{
					name: 'Feb',
					data: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
				},
				{
					name: 'Sep',
					data: [3, 6, 4, 2, 5, 7, 6, 3, 3, 10]
				}
			],
			options: {
				chart: {
					height: 350,
					type: 'heatmap'
				},
				plotOptions: {
					heatmap: {
						shadeIntensity: 0.5,

						colorScale: {
							ranges: [
								{
									from: 0,
									to: 3,
									name: 'low',
									color: '#00A100'
								},
								{
									from: 4,
									to: 7,
									name: 'medium',
									color: '#128FD9'
								},
								{
									from: 8,
									to: 10,
									name: 'high',
									color: '#FFB200'
								}
							]
						}
					}
				},
				dataLabels: {
					enabled: false
				}
				/*title: {
			  text: 'HeatMap Chart with Color Range'
			},*/
			}
		};
	}

	render() {
		return (
			<div id="chart">
				<Chart
					options={this.state.options}
					series={this.state.series}
					type="heatmap"
					height={350}
				/>
			</div>
		);
	}
}
