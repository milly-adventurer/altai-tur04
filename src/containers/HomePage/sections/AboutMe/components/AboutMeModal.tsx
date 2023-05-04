import React from 'react';
import { CMSButton, CMSImage } from "@/models/cms";

import css from './AboutMeModal.module.scss';
import { img } from "@/helpers/cms";


import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";
import Popup from "@/components/Popup/Popup";
import Button from "@/components/Button";

export interface AboutMeModal {
	text: Document;
	image: CMSImage;
	isOpen: boolean;
	cta: CMSButton;
	onClose(): void;
}

const AboutMeModal = (props: AboutMeModal) => {
	const { text, image, isOpen, cta, onClose } = props;
	
	return (
		<Popup
			isOpen={isOpen}
			onClose={onClose}
		>
			<div className={css.text}>{documentToReactComponents(text)}</div>
			<Button style={cta.style} type={cta.type}>
				{cta.text}
			</Button>
			<img className={css.image} src={img(image)} alt={image.title || ''} />
		</Popup>
	);
}

export default AboutMeModal;
