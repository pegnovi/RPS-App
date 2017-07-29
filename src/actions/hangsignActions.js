export const playRockHand = (state) => {
	return {
		type: 'ROCK_SIGN_CLICKED',
		payload: state
	};
}

export const playScissorHand = (state) => {
	return {
		type: 'SCISSOR_SIGN_CLICKED',
		payload: state
	};
}
//TODO implement scissor action
//TODO implement paper action
