import React from 'react';
import Plot from 'react-plotly.js';
import Plotly from 'plotly.js';
import queryData from './queryData';
import Loading from './components/Loading';

class RootContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: null,
			error: null,
			loading: true
		};
	}

	componentDidMount() {
		const {
			serviceUrl,
			entity: { value }
		} = this.props;

		queryData(value, serviceUrl)
			.then(res => {
				const map = {};
				res.depMapExpression.forEach(r => {

					if(r.depMapID.Disease != null) {
						const cellLinesData = map[r.depMapID.Disease] || [];
						cellLinesData.push({cellLine: r.depMapID.DepMapID, expression: r.DepmapExpressionValue});
						map[r.depMapID.Disease] = cellLinesData;
					}
				});

				this.setState({ loading: false, data: map });
			})
			.catch(error => this.setState({ error }));
	}

	render() {
		return (
			<div className="rootContainer">
				{this.state.error ? (
					<div className="error">
						{this.state.error.message
							? 'Something went wrong!'
							: this.state.error}
					</div>
				) : this.state.loading ? (
					<Loading />
				) : (
					<BarChart data={this.state.data} />
				)}
			</div>
		);
	}
}

export default RootContainer;

function linspace(a,b,n) {
	return Plotly.d3.range(n).map(function(i){return a+i*(b-a)/(n-1);});
}

function getMapSize(x) {
    var len = 0;
    for (var count in x) {
            len++;
    }
    return len;
}


class BarChart extends React.Component {
	render() {
		const { data } = this.props;

		let numberOfDiseases = getMapSize(data);
		let diseaseNames = []

		// Format the data
		// 1. Create the colors
		var allColors = linspace(0, 360, numberOfDiseases);
		var boxColor = [];
		for( var i = 0; i < numberOfDiseases;  i++ ){
			var result = 'hsl('+ allColors[i] +',50%'+',50%)';
			boxColor.push(result);
		}

		//2. Create Y Values and get the disease names
		var yValues = [];

		for(var key in data){
			var ySingleArray = [];
			diseaseNames.push(key);
			for( var j = 0; j < data[key].length;  j++ ){
				ySingleArray.push(data[key][j].expression);
			}
			yValues.push(ySingleArray);
		}

		//3. Create the traces for the box plot
		var plotData = [];
		for( var i = 0; i < numberOfDiseases;  i++ ){
			var result = {
				y: yValues[i],
				type:'box',
				name: diseaseNames[i],
				marker:{
					color: boxColor[i]
				}
			};
			plotData.push(result);
		};

		console.log("Plot Data:");
		console.log(plotData);

		// Create the plot layout
		var plotLayout = {
			xaxis: {
				showgrid: false,
				zeroline: false,
				tickangle: 35,
				showticklabels: true,
				type: 'category'
			},
			yaxis: {
				title: {
					text: 'TPM (log2)',
						font: {
						family: 'Courier New, monospace',
						size: 18,
						color: '#7f7f7f'
					}
				},
				zeroline: false,
				gridcolor: 'white'
			},
			//paper_bgcolor: 'rgb(233,233,233)',
			//plot_bgcolor: 'rgb(233,233,233)',
			showlegend:true
		};

		var plotConfig = {responsive: true};

		return (
			<Plot
				data={plotData}
				layout={plotLayout}
				config={plotConfig}
			/>
		);
	}
}
