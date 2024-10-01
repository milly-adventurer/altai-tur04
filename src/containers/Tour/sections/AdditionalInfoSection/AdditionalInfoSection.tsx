import React, { useContext, useState } from 'react';
import { CMSAdditionalTourInfoSection } from "@/models/cms";

import css from './AdditionalInfoSection.module.scss';
import { bgImage } from "@/helpers/cms";
import Button, { ButtonStyle } from "@/components/Button";
import Popup from "@/components/Popup/Popup";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from "next/image";
import wallet from 'static/assets/images/wallet.svg';
import { TourContext } from "@/context/Tour";
import cn from "classnames";

export interface AdditionalInfoSectionProps extends CMSAdditionalTourInfoSection {}

const priceFormatter = new Intl.NumberFormat('ru-RU', {
	style: 'currency',
	currency: 'RUB',
});

const AdditionalInfoSection = (props: AdditionalInfoSectionProps) => {
	const {
		title,
		cards,
	} = props;

	const [openCardId, setOpenCardId] = useState<number | null>(null);
	// const [open, setOpen] = useState(false);
	//
	// const { additionalInfoOptions } = useContext(FormsContext);

	const { basePrice, price_with_discount, tourId } = useContext(TourContext);

	const openCard = openCardId && cards[openCardId - 1];

	return (
		<>
			<Popup className={css.popup} contentClassName={css.popupContent} isOpen={openCardId !== null} onClose={() => setOpenCardId(null)}>
				{/*<BookOptionsModal defaultData={additionalInfoOptions} isOpen={open} onClose={() => setOpen(false)} />*/}
				{openCard && (
					<div>
						<h4 className={css.popupTitle}>{openCard.title}</h4>
						{openCard.description && <div className={css.popupDescription}>{documentToReactComponents(openCard.description)}</div>}
						{openCardId === 1 && tourId !== 'Новый Год на Алтае' && tourId !== 'Новый Год на Алтае' &&
							<div className={css.priceBlock}>
								<Image src={wallet} alt={"Кошелек"} />
								<div className={css.pricesWrapper}>
									{(price_with_discount || basePrice) ? <span className={css.price}>{priceFormatter.format(price_with_discount || basePrice || 0)}</span> : null}
									{price_with_discount && basePrice ? <span className={css.priceSmall}>{priceFormatter.format(basePrice)}</span> : null}
								</div>
							</div>
						}
						{openCard.cta && (
							<Button type={openCard.cta.type} style={openCard.cta.style}>{openCard.cta.text}</Button>
						)}
					</div>
				)}
			</Popup>
			<section className={css.container}>
				<h2 className={css.title}>{title}</h2>
				<div className={css.grid}>
					{cards.map((card, i) => {
						return (
							<div
								key={i}
								style={{
									background: bgImage(card.background, 0.6),
								}}
								className={css.card}
							>
								<div>
									<div className={css.titleBlock}>
										<h3 className={css.cardTitle}>{card.title}</h3>
										{i === 0 && <div className={cn(css.priceBlock, css.priceBlockC)}>
											{/*<Image src={wallet} alt={"Кошелек"} />*/}
											<div className={css.pricesWrapper}>
												{(price_with_discount || basePrice) ? <span className={css.price}>{priceFormatter.format(price_with_discount || basePrice || 0)}</span> : null}
												{price_with_discount && basePrice ? <span className={css.priceSmall}>{priceFormatter.format(basePrice)}</span> : null}
											</div>
										</div>
										}
									</div>
									<Button
										className={css.openButton}
										style={ButtonStyle.OUTLINE_WHITE}
										onClick={() => setOpenCardId(i + 1)}
									>
										Подробнее
									</Button>
								</div>
							</div>
						);
					})}
				</div>
			</section>
		</>
	)
}

export default AdditionalInfoSection;
