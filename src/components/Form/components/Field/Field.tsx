import React, { useState } from 'react';
import { CmsFiled, FieldType } from "@/models/cms";
import css from './Field.module.scss';

const getInputType = (type: FieldType): React.HTMLInputTypeAttribute => {
	switch (type) {
		case FieldType.EMAIL:
			return 'email';
		case FieldType.NAME:
			return 'text';
		case FieldType.PEOPLE_NUMBER:
			return 'number';
		case FieldType.PHONE:
			return 'tel'
		default:
			return 'text';
	}
}

export interface FieldProps extends CmsFiled {
	onChange(value: string): void;
}

const Field = (props: FieldProps) => {
	const {
		type,
		placeholder,
		required = false,
		onChange,
	} = props;
	
	const [currentValue, setCurrentValue] = useState('');
	
	const handleChange = (value: string) => {
		setCurrentValue(value);
		onChange(value);
	}

	return (
		<input className={css.input} value={currentValue} onChange={(e) => handleChange(e.target.value)} required={required} placeholder={placeholder} type={getInputType(type)} />
	);
};

export default Field;
