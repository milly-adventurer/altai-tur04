import React from 'react';
import { CMSDatesSection } from "@/models/cms";

import css from './DatesSection.module.scss';
import Button, { ButtonStyle, ButtonType } from "@/components/Button";

export interface DatesSectionProps extends CMSDatesSection {}

const DatesSection = (props: DatesSectionProps) => {
	const { title, dates } = props;
	
	return (
		<>
			<section className={css.container} id={"даты"}>
				<h2 className={css.title}>{title}</h2>
				<div className={css.dates}>
					{dates.map((date) => {
						return (
							<Button formProps={{ date: date.date }} type={ButtonType.COUNT} className={css.button} style={ButtonStyle.OUTLINE_BLACK} key={date.date}>
								{date.date}
							</Button>
						);
					})}
				</div>
			</section>
		</>
	);
};

export default DatesSection;
