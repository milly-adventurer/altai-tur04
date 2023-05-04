import React from 'react';
import { CMSTeamSection } from "@/models/cms-sections";

import css from './TeamSection.module.scss';
import TeamMember from "@/components/TeamSection/components/TeamMember/TeamMember";

export interface TeamSectionProps extends CMSTeamSection {}

const TeamSection = (props: TeamSectionProps) => {
	const { title, team_members } = props;
	
	return (team_members?.length ? <section className={css.container}>
			<h2 className={css.title}>{title}</h2>
			<div className={css.members}>
				{team_members.map((member, i) => {
					return <TeamMember key={i} {...member} />;
				})}
			</div>
		</section> :
			null
	);
};

export default TeamSection;
