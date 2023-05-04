import React, { useState } from 'react';
import { CMSAccomodationSection } from "@/models/cms";

import css from './Accommodation.module.scss';
import { img } from "@/helpers/cms";
import Button, { ButtonStyle } from "@/components/Button";
import Popup from "@/components/Popup/Popup";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import Zoom from "react-medium-image-zoom";

export interface AccommodationSectionProps extends CMSAccomodationSection {}

const AccommodationSection = (props: AccommodationSectionProps) => {
	const { title, description, images } = props;
	
	const [isOpen, setIsOpen] = useState(false);
	
	return (
		<>
			<Popup
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
			>
				<div className={css.popupImages}>
					{images.map((image, i) => {
						return (
							<Zoom key={`${image.title}-${i}`}>
								<img className={css.popupImage} src={img(image)} alt={image.title || ''} />
							</Zoom>
						)
					})}
				</div>
			</Popup>
			<section className={css.container}>
				<h2 className={css.title}>{title}</h2>
				<div className={css.description}>
					{documentToReactComponents(description, {
						renderNode: {
							[BLOCKS.PARAGRAPH]: (node, children) => {
								return <p style={{marginBottom: 13}}>{children}</p>
							}
						}
					})}
				</div>
				<img className={css.image} src={img(images[0])} alt={images[0].title || ''} />
				<Button
					className={css.button}
					style={ButtonStyle.OUTLINE_BLACK}
					onClick={() => setIsOpen(true)}
				>
					Посмотреть больше фото
				</Button>
			</section>
		</>
	);
}

export default AccommodationSection;
