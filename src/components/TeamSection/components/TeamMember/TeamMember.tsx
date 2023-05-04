import React, { useState } from 'react';
import { CMSTeamMember } from "@/models/cms-sections";
import Popup from "@/components/Popup/Popup";

import css from './TeamMember.module.scss';
import { img } from "@/helpers/cms";
import Button, { ButtonStyle } from "@/components/Button";
import { BsArrowRight } from "react-icons/bs";
import useWindowSize from "@/hooks/useWindowSize";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export interface TeamMemberProps extends CMSTeamMember {}

const TeamMember = (props: TeamMemberProps) => {
	const { title, description_short, description_full, image } = props;
	
	const [isOpen, setIsOpen] = useState(false);

	const { device: { isMobile } } = useWindowSize();
	
	return (
		<>
			<Popup isOpen={isOpen} onClose={() => setIsOpen(false)}>
				{description_full && <div className={css.descriptionFull}>{documentToReactComponents(description_full)}</div>}
			</Popup>
			<article className={css.card}>
				{image && <img className={css.image} src={img(image)} alt={""} />}
				<h3 className={css.title}>{title}</h3>
				<p className={css.descriptionShort}>{description_short}</p>
				<Button
					className={css.button}
					style={ButtonStyle.LINK}
					onClick={() => setIsOpen(true)}
				>
					Прочитать
					<BsArrowRight className={css.buttonArrow} size={isMobile ? 25 : 30} />
				</Button>
			</article>
		</>
	)
};

export default TeamMember;
