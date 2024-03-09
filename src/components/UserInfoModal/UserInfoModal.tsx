import React, { FormEvent, useEffect, useMemo, useState } from 'react';
import Popup, { PopupProps } from "@/components/Popup/Popup";
import Button, { ButtonStyle } from "@/components/Button";

import css from './UserInfoModal.module.scss';
import axios from "axios";
import cmsAPI from "@/api/cms";
import { CMSCallbackForm } from "@/models/cms";
import cn from "classnames";

export interface UserInfoModalProps extends PopupProps {

}

const UserInfoModal = (props: UserInfoModalProps) => {
	const {isOpen, onClose} = props;

	// const [name, setName] = useState('');
	// const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');

	const [data, setData] = useState<CMSCallbackForm | null>(null);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

			axios.post('https://functions.yandexcloud.net/d4esnhd0mrc84vb39o9k', null, { params: {phone} });
			setIsSubmitted(true);
			// @ts-ignore
			window.ym?.(92641252, 'reachGoal', 'callbackFormSent');
			// @ts-ignore
			window.ym?.(92641252, 'reachGoal', 'formSent');
	};

	useEffect(() => {
		(async () => {
			const data = await cmsAPI.getCallbackForm();
			console.log(data, 'cbform')
			setData(data);
		})();
	}, []);

	const successMessage = useMemo(() => {
		return (
			<div className={css.textPart}>
				{data && <p className={css.success}>{data.success_message}</p>}
			</div>
		)
	}, [data]);

	const handleClose = () => {
		setIsSubmitted(false);
		onClose?.();
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
									{/*<input value={name} onChange={(e) => setName(e.target.value)} className={css.input} type={"text"} placeholder={"Ваше имя"} />*/}
									{/*<input value={email} onChange={(e) => setEmail(e.target.value)} className={css.input} type={"email"} placeholder={"Email"} required/>*/}
									<input required value={phone} onChange={(e) => setPhone(e.target.value)} className={css.input} placeholder={"Телефон"} type={"phone"}/>
									<Button className={css.button} style={ButtonStyle.BRAND} htmlType={"submit"}>
										{data.button_text}
									</Button>
									<p className={css.conf}>Нажимая на кнопку вы соглашаетесь с <a href={'#'}>политикой конфиденциальности</a></p>
								</form>
							</div>
						)}
						{/*<div*/}
						{/*	className={css.image}*/}
						{/*	style={{*/}
						{/*		background: data.image && bgImage(data.image),*/}
						{/*	}}*/}
						{/*></div>*/}
					</>
				)}
		</Popup>
	);
}

export default UserInfoModal;
