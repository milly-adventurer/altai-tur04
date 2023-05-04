import { useState } from 'react'

import { useEventListener, useIsomorphicLayoutEffect } from 'usehooks-ts';

const BreakPoints = {
	mobile: {
		min: 0,
		max: 768,
	},
	tablet: {
		min: 769,
		max: 1200,
	},
};

interface WindowSize {
	width: number;
	height: number;
}

function useWindowSize(): {
	windowSize: WindowSize,
	device: {
		isMobile: boolean,
		isTablet: boolean,
		isDesktop: boolean,
	},
} {
	const [windowSize, setWindowSize] = useState<WindowSize>({
		width: 0,
		height: 0,
	});

	const handleSize = () => {
		setWindowSize({
			width: window.innerWidth,
			height: window.innerHeight,
		})
	}

	useEventListener('resize', handleSize);
	
	useIsomorphicLayoutEffect(() => {
		handleSize();
	}, []);

	return {
		windowSize,
		device: {
			isMobile: windowSize.width <= BreakPoints.mobile.max,
			isTablet: windowSize.width <= BreakPoints.tablet.max && windowSize.width >= BreakPoints.tablet.min,
			isDesktop: windowSize.width > BreakPoints.tablet.max,
		}
	};
}

export default useWindowSize;
