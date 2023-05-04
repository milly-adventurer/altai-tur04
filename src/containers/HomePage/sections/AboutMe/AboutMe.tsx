import React, { useState } from 'react';
import { CMSAboutMeSection } from "@/models/cms-sections";

import css from './AboutMe.module.scss';
import { bgImage, img } from "@/helpers/cms";
import Button from "@/components/Button";
import AboutMeModal from "@/containers/HomePage/sections/AboutMe/components/AboutMeModal";
import useWindowSize from "@/hooks/useWindowSize";

export interface AboutMeProps extends CMSAboutMeSection {
	
}

const AboutMe = (props: AboutMeProps) => {
	const {
		cta,
		description,
		image_desktop,
		image_modal,
		modal_text,
		title,
		background_mobile,
		background_desktop,
		modal_cta,
	} = props;
	
	const [modalOpen, setModalOpen] = useState(false);
	const { device: { isMobile } } = useWindowSize();
	
	const background = isMobile ? background_mobile : background_desktop;
	return (
		<section
			className={css.wrapper}
			id={"обо_мне"}
			style={{
				background: bgImage(background, 0.6),
			}}
		>
			<AboutMeModal
				text={modal_text}
				image={image_modal}
				cta={modal_cta}
				isOpen={modalOpen}
				onClose={() => setModalOpen(false)}
			/>
			<div className={css.container}>
				<div className={css.text}>
					<h2 className={css.title}>{title}</h2>
					<p className={css.description}>{description}</p>
					<Button onClick={() => setModalOpen(true)} style={cta.style}>
						{cta.text}
					</Button>
				</div>
				<img className={css.image} src={img(image_desktop)} alt={image_desktop.title || ''} />
			</div>
		</section>
	);
};

export default AboutMe;
