import React, { useContext } from 'react';
import { CMSNavigation, CMSTourTitleSection } from "@/models/cms";

import css from './TourTitleSection.module.scss';
import cn from "classnames";
import SliderBackground from "@/components/SliderBackground/SliderBackground";
import Button, { ButtonAction, ButtonStyle, ButtonType } from "@/components/Button";
import Header from "@/components/Header/Header";

import whatsAppImg from "static/assets/images/whatsapp.svg";
import Image from "next/image";
import telegramImg from "static/assets/images/telegram.svg";
import { commonTranslationContext } from "@/context/CommonTranslation";
import { TourContext } from "@/context/Tour";

export interface TourTitleSectionProps extends CMSTourTitleSection {
	navigation: CMSNavigation;
}

const TourTitleSection = (props: TourTitleSectionProps) => {
	const { title, description, background, navigation, button_text } = props;

	const translations = useContext(commonTranslationContext);
	const { discount_percent } = useContext(TourContext);

	const nav = navigation.anchors.map((anchor) => {
		return {
			...anchor,
			external: anchor.id === 'главная',
		}
	});

	return (
		<>
			<div className={cn({ [css.withDiscountWrapper]: discount_percent })}>
				<section className={cn(css.container)}>
					<SliderBackground
						images={[background]}
						darkness={0.5}
					/>
					<div className={css.header}>
						<Header navLinks={nav} />
					</div>
					<div className={css.contentContainer}>
						<h1 className={css.title}>
							{title}
						</h1>
						<p className={css.description}>{description}</p>
						<p className={css.description}>Скидка 20% при раннем бронировании до 1 апреля. На ВСЕ туры!</p>
						<div className={css.buttonsWrapper}>
							<Button
								style={ButtonStyle.BRAND}
								type={ButtonType.PROGRAM}
								className={css.button}
							>
								{button_text || 'Получить программу тура'}
							</Button>
							<div className={css.socials}>
								<Button link={"https://wa.me/79039191960"} className={css.socialButton} style={ButtonStyle.OTHER} social={ButtonAction.WHATSAPP}>
									<Image src={whatsAppImg} alt={'whatsapp'} />
								</Button>
								<Button link={"https://t.me/altai_estetik_tour"} className={css.socialButton} style={ButtonStyle.OTHER} social={ButtonAction.TELEGRAM}>
									<Image src={telegramImg} alt={'telegram'} />
								</Button>
							</div>
						</div>
					</div>
				</section>
				{discount_percent && (
					<div className={css.discountContainer}>
						<div className={css.discountBanner}>
							{translations?.discount_sign} {discount_percent}%
						</div>
					</div>
				)}
			</div>
		</>
	);
}

export default TourTitleSection;
