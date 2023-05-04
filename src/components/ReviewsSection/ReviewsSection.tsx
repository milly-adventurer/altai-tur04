import React, { useRef } from 'react';
import { CMSReviewsSection } from "@/models/cms-sections";

import css from './ReviewsSection.module.scss';
import { Splide, SplideSlide } from "@splidejs/react-splide";

import tripAdvisorLogo from 'static/assets/images/tripadvisor-logo.png';
import cn from "classnames";
import { TripadvisorResponse } from "@/models/tripadvisor";

export interface ReviewsSectionProps extends CMSReviewsSection {
	reviews: TripadvisorResponse;
}

const ReviewsSection = (props: ReviewsSectionProps) => {
	const { title, reviews } = props;
	
	const activeSlideRef = useRef(0);

	return reviews.data?.length ? (
		<section className={css.container} id={"отзывы"}>
			<h2 className={css.title}>{title}</h2>
			<Splide
				className={cn(css.slider, 'reviewsSlider')}
				onResized={(a) => {
					const slider = document.querySelector('.reviewsSlider');
					if (!slider) {return}
					// @ts-ignore
					slider.style.height = `${a.Components.Elements.slides[activeSlideRef.current]?.clientHeight}px`;
				}}
				onMove={(a, i) => {
					const slider = document.querySelector('.reviewsSlider');
					activeSlideRef.current = i;
					if (!slider) {return}
					// @ts-ignore
					slider.style.height = `${a.Components.Elements.slides[i]?.clientHeight}px`;
				}}
				options={{
					gap: 50,
					pagination: false,
					autoHeight: true,
					type: 'loop',
					height: 'fit-content',
				}}
			>
				{reviews.data.map((review) => {
					return (
						<SplideSlide key={review.id}>
							<div className={css.slide}>
								<img className={css.avatar} src={review.user.avatar.thumbnail} alt={"Аватар"} />
								<span className={css.name}>{review.user.username}</span>
								<img className={css.stars} src={review.rating_image_url} alt={"Рейтинг"} />
								<span className={css.date}>{new Date(review.published_date).toLocaleDateString('ru-RU')}</span>
								<span className={css.reviewTitle}>{review.title}</span>
								<p className={css.description}>{review.text}</p>
								<a className={css.postedOn} href={review.url} target={'_blank'}>
									<span>Размещено на</span>
									<img className={css.logo} src={tripAdvisorLogo.src} alt={"TripAdvisor logo"} />
								</a>
							</div>
						</SplideSlide>
					)
				})}
			</Splide>
		</section>
	) : null;
};

export default ReviewsSection;
