import React, { FormEvent, useContext, useEffect, useMemo, useState } from 'react';
import { CMSBookForm } from "@/models/cms";
import axios from "axios";
import cmsAPI from "@/api/cms";
import css from './BookModal.module.scss'
import Popup, { PopupProps } from "@/components/Popup/Popup";
import cn from "classnames";
import Button, { ButtonStyle } from "@/components/Button";
import wallet from 'static/assets/images/wallet.svg';
import { TourContext } from "@/context/Tour";
import Image from "next/image";

export interface BookModalProps extends PopupProps {
	date?: string;
}

const priceFormatter = new Intl.NumberFormat('ru-RU', {
	style: 'currency',
	currency: 'RUB',
});

const BookModal = (props: BookModalProps) => {
	const { isOpen, date, onClose } = props;

	const { basePrice, tourId, price_with_discount } = useContext(TourContext);

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [quantity, setQuantity] = useState(1);

	const price = (basePrice || 0) * quantity;
	const priceWithDiscount = (price_with_discount || 0) * quantity

	const [data, setData] = useState<CMSBookForm | null>(null);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (email.trim().length) {
			const calculatedPrice = priceWithDiscount || price;
			axios.post('https://functions.yandexcloud.net/d4esnhd0mrc84vb39o9k', null, { params: {email, phone, name, price: calculatedPrice, quantity, tourId, date, formName: 'Бронь' }});
			setIsSubmitted(true);
			// @ts-ignore
			window.ym?.(92641252, 'reachGoal', 'bookFormSent');
			// @ts-ignore
			window.ym?.(92641252, 'reachGoal', 'formSent');
		}
	};

	useEffect(() => {
		(async () => {
			const data = await cmsAPI.getBookForm();
			setData(data);
		})();
	}, []);

	const successMessage = useMemo(() => {
		return (
			<div className={css.textPart}>
				{data && <span className={css.successTitle}>{data.success_title}</span>}
				{data && <p className={css.successDescription}>{data.success_description}</p>}
			</div>
		)
	}, [data]);

	const handleClose = () => {
		setIsSubmitted(false);
		onClose?.();
	}

	const onQuantityChange = (quantity: number) => {
		if (quantity >= 1 && quantity <= 15) {
			setQuantity(quantity);
		}
	}

	return (
		<Popup isOpen={isOpen} onClose={handleClose} className={cn(css.popup, {
			[css.popupSmall]: isSubmitted,
		})} contentClassName={css.popupContent}>
			{!data ? '' : (
				<>
					{isSubmitted ? successMessage : (
						<div className={css.textPart}>
							{data.title && <span className={css.title}>{data.title}</span>}
							{data.description && <p className={css.description}>{data.description}</p>}
							<form onSubmit={onSubmit} className={css.form}>
								<input value={name} onChange={(e) => setName(e.target.value)} className={css.input} type={"text"} placeholder={"Ваше имя"} />
								<input value={email} onChange={(e) => setEmail(e.target.value)} className={css.input} type={"email"} placeholder={"Email"} required />
								<input value={phone} onChange={(e) => setPhone(e.target.value)} className={css.input} placeholder={"Телефон"} type={"phone"} required />
								<div className={css.quantityBlock}>
									<span>Сколько будет человек?</span>
									<input min={1} max={15} value={quantity} onChange={(e) => onQuantityChange(+e.target.value)} className={css.input} type={"number"} required placeholder={"1"} />
								</div>
								<div className={css.priceBlock}>
									<Image className={css.wallet} src={wallet} alt={"Кошелек"} />
									<div className={css.pricesWrapper}>
										<span className={css.price}>{priceFormatter.format(priceWithDiscount || price)}</span>
										{priceWithDiscount ? <span className={css.priceSmall}>{priceFormatter.format(price)}</span> : null}
									</div>
								</div>
								<Button className={css.button} style={ButtonStyle.BRAND} htmlType={"submit"}>
									{data?.button_text}
								</Button>
								<p className={css.conf}>Нажимая на кнопку вы соглашаетесь с <a href={'#'}>политикой конфиденциальности</a></p>
							</form>
						</div>
					)}
				</>
			)}
		</Popup>
	);
};

export default BookModal;
