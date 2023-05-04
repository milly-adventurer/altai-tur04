import React, { useState } from 'react';

import css from './Tab.module.scss';
import { CMSTab } from "@/models/cms-sections";
import Button, { ButtonStyle } from "@/components/Button";
import { img } from "@/helpers/cms";
import { BsArrowRight } from "react-icons/bs";

import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import Popup from "@/components/Popup/Popup";
import useWindowSize from "@/hooks/useWindowSize";

export interface TabProps extends CMSTab {}

const Tab = (props: TabProps) => {
	const { description, images } = props;
	
	const { device: { isMobile } } = useWindowSize();
	
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	
	return (
		<article>
			<Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
				<div className={css.popupImages}>
					{images.map((image, i) => {
						return (
							<Zoom key={i}>
								{image && <img className={css.popupImage} src={img(image)} alt={image.title || ''} />}
							</Zoom>
						)
					})}
				</div>
			</Popup>
			<p className={css.description}>{description}</p>
			<div className={css.imagesGrid}>
				{images.slice(0, isMobile ? 1 : 4).map((image, i) => {
					return (
						<Zoom key={`${image.title}-${i}`}>
							<img className={css.image} src={img(image)} alt={image.title || ''} />
						</Zoom>
					);
				})}
			</div>
			<Button className={css.more} onClick={() => setIsPopupOpen(true)} style={ButtonStyle.LINK}>
				<span>Больше фотографий</span>
				<BsArrowRight className={css.moreArrow} size={isMobile ? 25 : 30} />
			</Button>
		</article>
	)
};

export default Tab;
