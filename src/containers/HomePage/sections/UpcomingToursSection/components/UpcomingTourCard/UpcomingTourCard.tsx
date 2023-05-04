import React, { useContext } from 'react';
import { UpcomingTour } from "@/models/cms-sections";

import css from './UpcomingTourCard.module.scss';
import Button, { ButtonStyle } from "@/components/Button";
import { bgImage } from "@/helpers/cms";
import { commonTranslationContext } from "@/context/CommonTranslation";

export interface UpcomingTourCard extends UpcomingTour {
	price: number | null;
	discount: number | null;
	priceWithDiscount: number | null;
}

const priceFormatter = new Intl.NumberFormat('ru-RU', {
	style: 'currency',
	currency: 'RUB',
});

const UpcomingTourCard = (props: UpcomingTourCard) => {
	const { title, description, background, id, type, price,priceWithDiscount, discount } = props;
	
	const translations = useContext(commonTranslationContext);

	return (
		<article className={css.card} onClick={() => {
			window.open(`/${type}/${id}`, '_blank');
		}}>
			<div
				className={css.container}
				style={{ background: bgImage(background, 0.4) }}
			>
				<div className={css.content}>
					{price && (
						<span className={css.price}>{priceFormatter.format(priceWithDiscount || price)}</span>
					)}
					{title && (
						<h4 className={css.title}>{title}</h4>
					)}
					{description && (
						<p className={css.description}>{description}</p>
					)}
					<Button style={ButtonStyle.OUTLINE_WHITE}>
						{translations?.upcoming_event_cta || 'Узнать больше'}
					</Button>
					{discount && (
						<div className={css.discount}>{translations?.discount} {discount}%</div>
					)}
				</div>
			</div>
		</article>
	)
};

export default UpcomingTourCard;
