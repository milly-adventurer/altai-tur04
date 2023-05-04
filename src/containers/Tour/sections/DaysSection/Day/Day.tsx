import React, { useState } from 'react';

import { CMSTourDay } from "@/models/cms";

import css from './Day.module.scss';
import { bgImage, img } from "@/helpers/cms";
import Button, { ButtonStyle } from "@/components/Button";
import Popup from "@/components/Popup/Popup";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";

interface DayProps extends CMSTourDay {
	id: number;
}

const Day = (props: DayProps) => {
	const { title, description_long, description_short, image, background_image, id } = props;
	
	const [openId, setOpenId] = useState<number | null>(null);
	
	return (
		<>
			{openId !== null && <Popup contentClassName={css.popupContent}  onClose={() => setOpenId(null)} isOpen={true}>
				<span className={css.popupTitle}>{title}</span>
				{description_long && <div className={css.popupDescription}>{documentToReactComponents(description_long, {
					renderNode: {
						[BLOCKS.PARAGRAPH]: (node, children) => {
							return <p style={{marginBottom: 13}}>{children}</p>
						}
					}
				})}</div>}
				{image && <img className={css.popupImage} src={img(image)} alt={image.title} />}
			</Popup>}
			<div
				className={css.container}
				style={{
					background: background_image ? bgImage(background_image, 0.6) : '#000000',
				}}
			>
				<div className={css.content}>
					<h3 className={css.title}>{title}</h3>
					<p className={css.descriptionShort}>{description_short}</p>
					<Button
						style={ButtonStyle.OUTLINE_WHITE}
						onClick={() => setOpenId(id)}
					>
						Узнать больше
					</Button>
				</div>
			</div>
		</>
	);
};

export default Day
