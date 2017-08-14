import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';


export default class ScoreBoardVisual extends Component {
	render() {
		const score = this.props.score;
		const maxScore = this.props.maxScore;

		let arr = [];
		for(var i=0; i<maxScore; i++) {
			if(i < score) {
				arr.push((
					<span className="fa-stack fa-lg">
						<FontAwesome
							name={'certificate'}
							size='2x'
							style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
							stack='2x'
							spin
						/>
						<FontAwesome
							name={'lightbulb-o'}
							size='lg'
							style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
							stack='1x'
							inverse={true}
						/>
					</span>
				));
			}
			else {
				arr.push((
					<span className="fa-stack fa-lg">
						<FontAwesome
							name={'certificate'}
							size='2x'
							style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
							stack='2x'
							spin
						/>
					</span>
				));
			}
		}


		return (
			<div>
				{arr}
			</div>
		);
	}
}

