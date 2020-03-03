import React from 'react';
import Plot from 'react-plotly.js';
import Plotly from 'plotly.js';

class RootContainer extends React.Component {
	render() {
		return (
			<div className="rootContainer">
				<BarChart />
			</div>
		);
	}
}

export default RootContainer;

function linspace(a,b,n) {
	return Plotly.d3.range(n).map(function(i){return a+i*(b-a)/(n-1);});
}

var boxNumber = 30;
var boxColor = [];
var allColors = linspace(0, 360, boxNumber);
var plotData = [];
var yValues = [];

//Colors

for( var i = 0; i < boxNumber;  i++ ){
	var result = 'hsl('+ allColors[i] +',50%'+',50%)';
	boxColor.push(result);
}

function getRandomArbitrary(min, max) {
	return Math.random() * (max - min) + min;
};

//Create Y Values

for( var i = 0; i < boxNumber;  i++ ){
	var ySingleArray = [];
	for( var j = 0; j < 10;  j++ ){
		var randomNum = getRandomArbitrary(0, 1);
		var yIndValue = 3.5*Math.sin(Math.PI * i/boxNumber) + i/boxNumber+(1.5+0.5*Math.cos(Math.PI*i/boxNumber))*randomNum;
		ySingleArray.push(yIndValue);
	}
	yValues.push(ySingleArray);
}

//Create Traces

for( var i = 0; i < boxNumber;  i++ ){
	var result = {
		y: yValues[i],
		type:'box',
		marker:{
		color: boxColor[i]
		}
	};
	plotData.push(result);
};

var plotLayout = {
	xaxis: {
	  showgrid: false,
	  zeroline: false,
	  tickangle: 60,
	  showticklabels: false
	},
	yaxis: {
	  zeroline: false,
	  gridcolor: 'white'
	},
	//paper_bgcolor: 'rgb(233,233,233)',
	//plot_bgcolor: 'rgb(233,233,233)',
	showlegend:true
  };

class BarChart extends React.Component {
	render() {
		return (
			<Plot
				data={plotData}
				layout={plotLayout}
			/>
		);
	}
}
