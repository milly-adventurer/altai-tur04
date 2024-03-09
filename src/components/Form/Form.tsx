import React, { FormEvent, useContext, useMemo, useState } from 'react';
import { CmsUniversalForm, FieldType } from "@/models/cms";
import css from "./Form.module.scss";
import Popup from "@/components/Popup/Popup";
import Field from "@/components/Form/components/Field/Field";
import Button, { ButtonStyle } from "@/components/Button";
import axios from "axios";
import { TourContext } from "@/context/Tour";

const getFieldValue = (fields: { type: FieldType, value?: string }[]) => (type: FieldType): string | undefined => {
	return fields.find((field) => field.type === type)?.value || undefined;
};

export interface FormProps {
	formData?: {
		date?: string;
		name?: string;
	};
	form: CmsUniversalForm;
	isBookForm?: boolean;
	onClose(): void;
	isOpen: boolean;
}

const Form = (props: FormProps) => {
	const {
		isOpen,
		formData,
		onClose,
		isBookForm,
		form: { title, description, inputs, button_text, success_title, success_description },
	} = props;

	const [isSubmitted, setIsSubmitted] = useState(false);
	const [fieldsValue, setFieldsValue] = useState<{ type: FieldType, value?: string }[]>(inputs.map(({ type }) => ({
		type,
	})));

	const { basePrice, tourId } = useContext(TourContext);

	const renderSuccessData = useMemo(() => {
		return (
			<div>
				{success_title && <span className={css.successTitle}>{success_title}</span>}
				{success_description && <p className={css.successDescription}>{success_description}</p>}
			</div>
		)
	}, [success_title, success_description]);

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const getField = getFieldValue(fieldsValue);

			axios.post('https://functions.yandexcloud.net/d4esnhd0mrc84vb39o9k', null,
				{
					params: {
						email: getField(FieldType.EMAIL),
						phone: getField(FieldType.PHONE),
						name: getField(FieldType.NAME),
						// price: basePrice,
						date: formData?.date,
						quantity: getField(FieldType.PEOPLE_NUMBER),
						tourId: tourId,
						formName: formData?.name,
					}
				}
			);

			setIsSubmitted(true);

			(window as any).ym?.(92641252, 'reachGoal', 'bookFormSent');
			isBookForm && (window as any).ym?.(92641252, 'reachGoal', 'formSent');
	};

	const onChange = (value: string, type: FieldType) => {
		const newFieldsValue = fieldsValue.map((field) => type === field.type ? { type, value } : field);
		setFieldsValue(newFieldsValue);
	};

	const handleClose = () => {
		setIsSubmitted(false);
		setFieldsValue(inputs.map(({ type }) => ({
			type,
		})));
		onClose();
	}

	return (
		<Popup isOpen={isOpen} onClose={handleClose} className={css.popup} contentClassName={css.popupContent}>
			{isSubmitted ? renderSuccessData : (
				<>
					<div className={css.header}>
						{title && <span className={css.title}>{title}</span>}
						{description && <p className={css.description}>{description}</p>}
					</div>
					<form onSubmit={onSubmit} className={css.form}>
						{inputs.map((field) => {
							return (
								<Field
									key={field.type}
									onChange={(value) => onChange(value, field.type)}
									{...field}
								/>
							);
						})}
						<Button disabled={isSubmitted} className={css.button} style={ButtonStyle.BRAND} htmlType={"submit"}>
							{button_text}
						</Button>
						<p className={css.conf}>Нажимая на кнопку вы соглашаетесь с <a href={'#'}>политикой конфиденциальности</a></p>
					</form>
				</>
			)}
		</Popup>
	);
};

export default Form;
