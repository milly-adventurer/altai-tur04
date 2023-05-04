import React, { useState } from 'react';

import css from './CMSButtonSection.module.scss';
import { CMSButtonSection } from "@/models/cms-sections";
import Button from "@/components/Button";

import Form from "@/components/Form/Form";

export interface CMSButtonSectionProps extends CMSButtonSection {}

const ButtonSection = (props: CMSButtonSectionProps) => {
	const { button, modal} = props;
	
	const [isOpen, setIsOpen] = useState(false);
	
	return (
		<>
			<Form form={modal} onClose={() => {setIsOpen(false)}} isOpen={isOpen} />
			<section className={css.section}>
				<Button type={button.type} onClick={() => {setIsOpen(true)}} style={button.style}>
					{button.text}
				</Button>
			</section>
		</>
	);
};

export default ButtonSection;
