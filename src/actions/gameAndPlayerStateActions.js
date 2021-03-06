//https://github.com/reactjs/redux/issues/601
export const setMatchResult = (results) => {
	return {
		type: 'SET_MATCH_RESULT',
		payload: results
	};
}

export const setRoundResult = (results) => {
	return {
		type: 'SET_ROUND_RESULT',
		payload: results
	};
}

export const nextRound = (results) => {
	return {
		type: 'NEXT_ROUND',
		payload: results
	};
}

export const opponentForfeit = () => {
	return {
		type: 'OPPONENT_FORFEIT',
		payload: ''
	};
}

export const exitMatch = () => {
	return {
		type: 'EXIT_MATCH',
		payload: ''
	};
}


export const resolveMatch = (results) => {
	return {
		type: 'RESOLVE_MATCH',
		payload: results
	};
}

