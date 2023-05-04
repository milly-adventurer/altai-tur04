import React, { PropsWithChildren, useContext, useState } from 'react';

import cn from "classnames";

import css from './Button.module.scss';
import Link from "next/link";

import UserInfoModal from "@/components/UserInfoModal/UserInfoModal";
import BookModal from "@/components/BookModal/BookModal";
import Form from "@/components/Form/Form";
import { FormsContext } from "@/context/FormsContext";

export enum ButtonStyle {
  BRAND = 'brand',
  OUTLINE_WHITE = 'outline_white',
  OUTLINE_BLACK = 'outline_black',
	LINK = 'link',
	OTHER = 'other',
}

export enum ButtonAction {
	VK = 'vk',
	WHATSAPP = 'whatsapp',
	TELEGRAM = 'telegram',
	book = 'book',
	call = 'call',
}

export enum ButtonType {
	DEFAULT = 'default',
	BOOK = 'book',
	CALL = 'call',
	PROGRAM = 'program',
	COUNT = 'count',
}

export interface ButtonProps {
  onClick?(): void;
  style: ButtonStyle;
  className?: string;
	social?: ButtonAction;
	disabled?: boolean;
	link?: string;
	type?: ButtonType;
	htmlType?: 'submit' | 'button';
	formProps?: {
		date?: string;
	}
}

const Button = (props: PropsWithChildren<ButtonProps>) => {
  const { onClick, style, type, htmlType = 'button', className, children, social, link, formProps, disabled = false } = props;
	
	const [isOpen, setIsOpen] = useState(false);
	const [isBookOpen, setIsBookOpen] = useState(false);
	const [isProgramOpen, setIsProgramOpen] = useState(false);
	const [isCountOpen, setIsCountOpen] = useState(false);
	
	const { tourPricesForm, programForm } = useContext(FormsContext);
	
	const handleClick = () => {
		if (type === ButtonType.CALL) {
			setIsOpen(true);
		} else if (type === ButtonType.BOOK) {
			setIsBookOpen(true);
		} else if (type === ButtonType.PROGRAM) {
			setIsProgramOpen(true);
		} else if (type === ButtonType.COUNT) {
			setIsCountOpen(true);
		}
		onClick?.();
	};
	
	if (link) {
		return (
			<Link
				href={link}
				onClick={onClick}
				target={"_blank"}
				className={cn(
					css.button,
					className,
					css[style],
					style === ButtonStyle.OTHER && social && css[`other_${social}`],
				)}
			>
				{children}
			</Link>
		);
	}
	
  return (
		<>
			{isOpen && <UserInfoModal isOpen={isOpen} onClose={() => setIsOpen(false)} />}
			{isBookOpen && <BookModal {...formProps} isOpen={isBookOpen} onClose={() => setIsBookOpen(false)} />}
			{isProgramOpen && programForm && <Form formData={{
				name: 'Програма',
				...formProps,
			}} isOpen={isProgramOpen} onClose={() => setIsProgramOpen(false)} form={programForm} />}
			{isCountOpen && tourPricesForm && <Form formData={{
				name: 'Расчитать цену',
				...formProps,
			}} isOpen={isCountOpen} onClose={() => setIsCountOpen(false)} form={tourPricesForm} />}
			<button
				disabled={disabled}
				type={htmlType}
				onClick={handleClick}
				className={cn(
					css.button,
					className,
					css[style],
					style === ButtonStyle.OTHER && social && css[`other_${social}`],
				)}
			>
				{children}
			</button>
		</>
  );
};

export default Button;
