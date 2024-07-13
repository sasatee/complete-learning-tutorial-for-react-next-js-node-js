import React from 'react';

// Reducer function to handle counter actions
export function counterReducer(state, action) {
	switch (action.type) {
		case "INCREMENT":
			return { count: state.count + 1 };
		case "DECREMENT":
			return { count: state.count - 1 };
		case "RESET":
			return { count: state.count = 0 };
		default:
			return state;
	}
}

// Define the initial state outside the component
const countInitialState = { count: 0 };


// App component
function App() {
	// Initializing state with useReducer hook using the predefined initial state
	const [counterState, dispatchCounterAction] = React.useReducer(counterReducer, countInitialState);

	return (
		<div id="app">
			<h1>The (Final?) Counter</h1>
			<p id="actions">
				{/* Buttons to dispatch actions */}
				<button onClick={() => dispatchCounterAction({ type: "INCREMENT" })}>Increment</button>
				<button onClick={() => dispatchCounterAction({ type: "DECREMENT" })}>Decrement</button>
				<button onClick={() => dispatchCounterAction({ type: "RESET" })}>Reset</button>
			</p>
			{/* Displaying the current count */}
			<p id="counter">{counterState.count}</p>
		</div>
	);
}

export default App;
