import React from 'react';
import css from './Overlay.module.scss';

export type Darkness = 0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7;

const Overlay = ({ darkness}: {
	darkness: Darkness
}) => {
	return (
		<div
			className={css.overlay}
			style={{ backgroundColor: `rgba(0, 0, 0, ${darkness})` }}
		></div>
	);
};

export default Overlay;
