import React from 'react';
import { CMSContactsSection } from "@/models/cms-sections";

import css from './ContactsSection.module.scss';
import Button, { ButtonAction } from "@/components/Button";
import { bgImage } from "@/helpers/cms";

import whatsAppImg from 'static/assets/images/whatsapp.svg';
import telegramImg from 'static/assets/images/telegram.svg';
import bookImg from 'static/assets/images/book.svg';
import callImg from 'static/assets/images/call.svg';

import Image from "next/image";

export interface ContactsSectionProps extends CMSContactsSection {}

const ContactsSection = (props: ContactsSectionProps) => {
	const { title, description, book_options, background } = props;

	return (
		<section
			className={css.container}
			style={{
				background: bgImage(background, 0.5),
			}}
		>
			<div className={css.content}>
				<h2 className={css.title}>{title}</h2>
				<p className={css.description}>{description}</p>
				<div className={css.links}>
					{book_options.options.map(({ link, text, style, type, social }, i) => {
						return (
							<Button key={`${social}-${i}`} type={type} className={css.link} link={link} style={style} social={social}>
								{
									social === ButtonAction.WHATSAPP ?
										<Image className={css.socialImg} src={whatsAppImg} alt={'Whatsapp'} /> :
										social === ButtonAction.TELEGRAM ?
											<Image className={css.socialImg} src={telegramImg} alt={'Telegram'} /> :
													social === ButtonAction.call ?
													<Image className={css.socialImg} src={callImg} alt={'телефон'} /> :
														<Image src={bookImg} alt={'телефон'} />
								}
								{text}
							</Button>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default ContactsSection;
