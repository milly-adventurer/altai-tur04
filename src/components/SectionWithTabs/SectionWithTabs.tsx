import React, { useMemo, useState } from 'react';
import { CMSSectionWithTabs } from "@/models/cms-sections";

import css from './SectionWithTabs.module.scss';
import Tab from "@/components/SectionWithTabs/components/Tab/Tab";
import cn from "classnames";

export interface SectionWithTabsProps extends CMSSectionWithTabs {}

const SectionWithTabs = (props: SectionWithTabsProps) => {
	const { title, tabs } = props;
	
	const filteredTabs = useMemo(() => tabs.filter(({ visible }) => visible), [tabs]);
	
	const [activeTab, setActiveTab] = useState(filteredTabs[0].name);
	
	const activeTabData = filteredTabs.find(({ name }) => name === activeTab);
	
	if (!activeTabData) {
		return null;
	}
	
	return (
		<section className={css.container} id={"фотографии"}>
			<h2 className={css.title}>{title}</h2>
			<div className={css.tabButtons}>
				{tabs.map(({ name }, i) => {
					return (
						<button
							onClick={() => setActiveTab(name)}
							className={cn(css.tabButton, {
								[css.tabButtonActive]: activeTab === name,
							})}
							key={i}
						>
							{name}
						</button>
					);
				})}
			</div>
			<Tab {...activeTabData} />
		</section>
	);
};

export default SectionWithTabs;
