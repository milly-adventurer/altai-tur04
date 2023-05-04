import React, { useState } from 'react';
import { CMSImagesGridSection } from "@/models/cms";

import css from './ImagesGridSection.module.scss';
import Popup from "@/components/Popup/Popup";
import Zoom from "react-medium-image-zoom";
import { bgImage, img } from "@/helpers/cms";
import Button, { ButtonStyle } from "@/components/Button";

export interface ImagesGridSectionProps extends CMSImagesGridSection {}

const ImagesGridSection = (props: ImagesGridSectionProps) => {
	const { title, description, images, alignment = 'center' } = props;

	const [isPopupOpen, setIsPopupOpen] = useState(false);
	return (
		<>
			<Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
				<div className={css.popupImages}>
					{images.map((image, i) => {
						return (
							<Zoom key={i}>
								<img className={css.popupImage} src={img(image)} alt={image.title || ''} />
							</Zoom>
						)
					})}
				</div>
			</Popup>
			<section className={css.container} id={"фотографии"}>
				<h2 style={{ textAlign: alignment }} className={css.title}>{title}</h2>
				{description && <p className={css.description}>{description}</p>}
				<div className={css.imagesGrid}>
					{images.slice(0, 4).map((image, i) => {
						return i === 3 && images.length > 4 ? (
							<div
								key={`${image.title}-${i}`}
								className={css.openMoreImage}
								style={{
									background: bgImage(image, 0.5),
								}}
							>
								<span className={css.moreImagesTitle}>+ {images.length - 4} фотографий</span>
								<Button
									style={ButtonStyle.OUTLINE_WHITE}
									onClick={() => setIsPopupOpen(true)}
								>
									Открыть
								</Button>
							</div>
							) : (
							<Zoom key={`${image.title}-${i}`}>
								<img className={css.image} src={img(image)} alt={image.title || ''} />
							</Zoom>
						)
					})}
				</div>
			</section>
		</>
	);
};

export default ImagesGridSection;
