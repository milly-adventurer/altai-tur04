import React from 'react';
import { CMSAdvantagesSection } from "@/models/cms-sections";

import { bgImage } from "@/helpers/cms";

import css from './Advantages.module.scss';

import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import useWindowSize from "@/hooks/useWindowSize";

export interface AdvantagesProps extends CMSAdvantagesSection {}

const Advantages = (props: AdvantagesProps) => {
	const { title, slides } = props;
	
	const { device: { isDesktop} } = useWindowSize();
	
	const sliderPadding = isDesktop ? 250 : 20;

	return (
		<section className={css.container}>
			<h2 className={css.title}>{title}</h2>
			<Splide
				options={{
					padding: { left: sliderPadding, right: sliderPadding },
					gap: isDesktop ? 150 : 50,
					classes: {
						pagination: `splide__pagination ${css.pagination}`,
						page: `splide__pagination__page ${css.paginationButton}`
					}
				}}
			>
				{slides.map((slide) => {
					return (
						<SplideSlide className={css.slide} key={slide.title}>
							<div className={css.image} style={{ background: bgImage(slide.image) }}></div>
							<div className={css.text}>
								<h4 className={css.slideTitle}>{slide.title}</h4>
								<p className={css.slideDescription}>{slide.description}</p>
							</div>
						</SplideSlide>
					);
				})}
			</Splide>
		</section>
	);
};

export default Advantages;
