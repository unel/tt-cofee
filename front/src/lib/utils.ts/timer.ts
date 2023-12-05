type TTimerID = NodeJS.Timeout | ReturnType<Window['setTimeout']>;

// this function like setInterval, but doesn't stack callbacks
export function setTimer(duration = 1000, callback: (delta: number) => unknown) {
	let timeoutId: TTimerID;
	let isRunning = true;
	let startTime: number;

	const delayTick = () => {
		clear();
		startTime = Date.now();
		timeoutId = setTimeout(() => {
			// debugger;
			if (!isRunning) {
				return;
			}

			const delta = Date.now() - startTime;
			callback(delta);

			delayTick();
		}, duration);
		isRunning = true;
	};

	const clear = () => {
		clearTimeout(timeoutId);
	};

	delayTick();

	// function for stop timer forever
	return () => {
		clear();
		isRunning = false;
		startTime = 0;
		timeoutId = 0;
	};
}
