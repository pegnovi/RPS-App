import React, {Component} from 'react';
import LinearProgress from 'material-ui/LinearProgress';

class GradualLinearProgressBar extends Component {
	tickAmount = 1;
	//todo default values and props configurable?

	constructor(props){
		super(props);
		this.state = {
			timeRemaining: 0
		};
	}

	componentDidMount(){
		setInterval(() => {
			this.setState({timeRemaining: this.state.timeRemaining + this.tickAmount});
		}, 1000);
	}

	render(){
		return (
		<div>
			<LinearProgress
				mode='determinate'
				value={this.state.timeRemaining}
				min={0}
				max={5}
			/>
			<p>{5 - this.state.timeRemaining}, seconds remaining to choose!</p>
		</div>
		);
	}
}

export default GradualLinearProgressBar;
