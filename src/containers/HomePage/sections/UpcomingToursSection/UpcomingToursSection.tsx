import React, { useMemo, useState } from 'react';
import { UpcomingTour, UpcomingTourType } from "@/models/cms-sections";
import css from './UpcomingToursSection.module.scss';
import UpcomingTourCard
	from "@/containers/HomePage/sections/UpcomingToursSection/components/UpcomingTourCard/UpcomingTourCard";
import Button, { ButtonStyle } from "@/components/Button";
import { BsArrowRight } from "react-icons/bs";
import useWindowSize from "@/hooks/useWindowSize";
import { CMSTourPrice } from "@/models/cms";

const tabTypeToName: Record<UpcomingTourType, string> = {
	[UpcomingTourType.TOUR]: 'Туры',
	[UpcomingTourType.EXCURSION]: 'Экскурсии',
}

export interface UpcomingToursProps {
	title?: string;
	tours: UpcomingTour[];
	CMSExcursionPrices?: CMSTourPrice;
	CMSTourPrices?: CMSTourPrice;
}

const UpcomingToursSection = (props: UpcomingToursProps) => {
	const { title, tours, CMSTourPrices, CMSExcursionPrices} = props;

	const [eventExpanded, setEventExpanded] = useState({ [UpcomingTourType.TOUR]: false, [UpcomingTourType.EXCURSION]: false });

	const { device: { isMobile } } = useWindowSize();

	const renderTabs = useMemo(() => {
		return (
			Object.values(UpcomingTourType).map((tabType) => {
				let tabCards = tours.filter(({ type }) => type === tabType).slice(0, eventExpanded[tabType] ? undefined : 2);

				return tabCards.length ? (
					<div className={css.tab} key={tabType}>
						<div className={css.tabTitle}>
							{tabTypeToName[tabType]}
							<div className={css.tabProposal}>
								<span className={css.tabAccent}>Скидка 20%</span> при раннем бронировании до 1 апреля. На <span className={css.tabAccent}>ВСЕ</span> туры!
							</div>
						</div>
						<div className={css.toursContainer}>
							{tabCards.map((tour) => {
								let price: number | null;
								let discount: number | null;
								let priceWithDiscount: number | null;
								if (tour.type === UpcomingTourType.TOUR) {
									const tourD = CMSTourPrices?.items.find(({ id }) => tour.id === id);
									price = tourD?.base_price || null;
									discount = tourD?.discount_percent || null;
									priceWithDiscount = tourD?.price_with_discount || null;
								} else {
									const excursionD = CMSExcursionPrices?.items.find(({ id }) => tour.id === id);
									price = excursionD?.base_price || null;
									discount = excursionD?.discount_percent || null;
									priceWithDiscount = excursionD?.price_with_discount || null;
								}
								return (
									<UpcomingTourCard
										key={tour.id}
										price={price}
										discount={discount}
										priceWithDiscount={priceWithDiscount}
										{...tour}
										/>
								);
							})}
						</div>
						{!eventExpanded[tabType] && (
							<Button className={css.more} style={ButtonStyle.LINK} onClick={() => setEventExpanded({ ...eventExpanded, [tabType]: true })}>
								<span>Посмотреть все</span>
								<BsArrowRight className={css.moreArrow} size={isMobile ? 25 : 28} />
							</Button>
						)}
					</div>
				) : null
			})
		);
	}, [tours, eventExpanded]);

	if (!tours.length) {
		return null;
	}

	return (
		<section className={css.container} id={"туры"}>
			{title && <h2 className={css.title}>{title}</h2>}
			{renderTabs}
		</section>
	);
};

export default UpcomingToursSection;
