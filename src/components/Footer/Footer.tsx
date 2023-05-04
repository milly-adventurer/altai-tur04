import React from 'react';

import css from './Footer.module.scss';

import { CMSFooterSection } from "@/models/cms-sections";
import { img } from "@/helpers/cms";

import whatsAppImg from "static/assets/images/whatsapp.svg";
import Image from "next/image";
import telegramImg from "static/assets/images/telegram.svg";
import cn from "classnames";
import vkImg from "static/assets/images/vk.svg";

export interface FooterProps extends CMSFooterSection {}

const Footer = (props: FooterProps) => {
	const { text, logo } = props;
	return (
		<footer className={css.footer}>
			<div className={css.container}>
				<Image width={115} height={140} src={img(logo)} alt={logo?.title || ''} />
				<div className={css.content}>
					<p className={css.text}>{text}</p>
					<ul className={css.socials}>
						<li>
							<a href="https://wa.me/79039191960" target="_blank" className={css.socialItem}>
								<Image className={css.socialImg} src={whatsAppImg} alt={'Whatsapp'} />
							</a>
						</li>
						<li>
							<a href="https://t.me/altai_estetik_tour" target="_blank" className={css.socialItem}>
								<Image className={css.socialImg} src={telegramImg} alt={'Telegram'} />
							</a>
						</li>
						<li>
							<a href="https://vk.com/altai_estetik_tour" target="_blank" className={css.socialItem}>
								<Image className={cn(css.socialImg, css.vk)} src={vkImg} alt={'vk'} />
							</a>
						</li>
					</ul>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
