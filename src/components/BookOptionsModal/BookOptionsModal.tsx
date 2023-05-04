import React, { useContext, useEffect, useState } from 'react';
import css from "./BookOptionsModal.module.scss";
import Button, { ButtonAction, ButtonType } from "@/components/Button";
import Image from "next/image";
import whatsAppImg from 'static/assets/images/whatsapp.svg';
import telegramImg from 'static/assets/images/telegram.svg';
import bookImg from 'static/assets/images/book.svg';
import callImg from 'static/assets/images/call.svg';
import Popup, { PopupProps } from "@/components/Popup/Popup";
import { commonTranslationContext } from "@/context/CommonTranslation";
import cmsAPI from "@/api/cms";
import { CMSBookOptions } from "@/models/cms-sections";

export interface BookOptionsModalProps extends PopupProps {
	onCallClick?(): void;
	defaultData?: CMSBookOptions;
}

const BookOptionsModal = (props: BookOptionsModalProps) => {
	const { isOpen, onClose, onCallClick, defaultData = null } = props;
	
	const translations = useContext(commonTranslationContext);

	const [bookOptions, setBookOptions] = useState<CMSBookOptions | null>(defaultData);

	useEffect(() => {
		if (bookOptions) {
			return;
		}
		
		(async () => {
			const options = await cmsAPI.getBookOptions();
			setBookOptions(options);
		})();
	}, []);

	return (
		<Popup
			className={css.popup}
			isOpen={isOpen}
			onClose={onClose}
		>
			<div className={css.popupContent}>
				<h2 className={css.popupTitle}>{translations?.tour_book_title}</h2>
				<div className={css.links}>
					{bookOptions && bookOptions.options.map(({ link, text, type, style, social }, i) => {
						console.log(type === ButtonType.CALL && onCallClick);
						return (
							<Button type={type} onClick={onCallClick} key={`${social}-${i}`} className={css.link} link={link} style={style} social={social}>
								{
									social === ButtonAction.WHATSAPP ?
										<Image className={css.socialImg} src={whatsAppImg} alt={'Whatsapp'} /> :
										social === ButtonAction.TELEGRAM ?
											<Image className={css.socialImg} src={telegramImg} alt={'Telegram'} /> :
											social === ButtonAction.call ?
												<Image className={css.socialImg} src={callImg} alt={'телефон'} /> :
												<Image className={css.socialImg} src={bookImg} alt={'Забронировать онлайн'} />
								}
								{text}
							</Button>
						);
					})}
				</div>
			</div>
		</Popup>
	)
};

export default BookOptionsModal;
