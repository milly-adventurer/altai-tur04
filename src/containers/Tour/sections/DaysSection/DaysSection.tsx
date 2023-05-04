import React from 'react';
import { CMSTourDaysSection } from "@/models/cms";

import css from './DaysSection.module.scss';
import { Splide, SplideSlide } from "@splidejs/react-splide";
import Day from "@/containers/Tour/sections/DaysSection/Day/Day";
import useWindowSize from "@/hooks/useWindowSize";

export interface DaysSectionProps extends CMSTourDaysSection {}

const DaysSection = (props: DaysSectionProps) => {
	const { title, days } = props;

	const { device: { isDesktop } } = useWindowSize();

	const sliderPadding = isDesktop ? '10%' : 20;
	
	return (
		<section className={css.container} id={"программа"}>
			<h2 className={css.title}>{title}</h2>
			<Splide
				options={{
					padding: { left: sliderPadding, right: sliderPadding },
					gap: isDesktop ? 100 : 50,
					type: 'loop',
				}}
			>
				{days.map((day, i) => {
					return (
						<SplideSlide key={i}>
							<Day {...day} id={i} />
						</SplideSlide>
					);
				})}
			</Splide>
		</section>
	)
};

export default DaysSection;
