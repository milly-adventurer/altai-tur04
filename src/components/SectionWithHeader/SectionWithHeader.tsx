import React from 'react';

import css from './SectionWithHeader.module.scss';

import Button, { ButtonAction, ButtonStyle } from "@/components/Button";
import SliderBackground from "@/components/SliderBackground/SliderBackground";
import cn from "classnames";
import { img } from "@/helpers/cms";
import Header from "@/components/Header/Header";
import { CMSSectionWithHeader } from "@/models/cms-sections";
import { Link } from 'react-scroll';
import whatsAppImg from "static/assets/images/whatsapp.svg";
import Image from "next/image";
import telegramImg from "static/assets/images/telegram.svg";

export interface SectionWithHeaderProps extends CMSSectionWithHeader {}

const SectionWithHeader = (props: SectionWithHeaderProps) => {
  const {
    backgrounds,
    image,
    title,
    description,
		button_text,
		navigation,
  } = props;
	
	return (
    <section id={"главная"} className={cn(css.container, {
			[css.withDescription]: !!description,
		})}>
      {backgrounds?.length && backgrounds.length > 1 && (
        <SliderBackground
          images={backgrounds}
          darkness={0.5}
        />
      )}
			<div className={css.header}>
				<Header navLinks={navigation?.anchors || []} />
			</div>
      <div className={css.contentContainer}>
        {image?.file?.url && (
					<img
						src={img(image)}
						alt={image?.title || ''}
						className={css.image}
					/>
        )}
        {title && (
          <h1 className={css.title}>
						{title}
					</h1>
        )}
        {description && (
          <p className={css.description}>{description}</p>
        )}
				<Button
					style={ButtonStyle.BRAND}
					className={css.button}
				>
					<Link smooth duration={500} to={"туры"}>
						{button_text}
					</Link>
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
    </section>
  );
};

export default SectionWithHeader;
