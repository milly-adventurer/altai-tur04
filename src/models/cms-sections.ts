import { CMSButton, CMSEntry, CMSNavigation, CMSImage, CMSBookForm, CmsUniversalForm } from "@/models/cms";
import { Document } from "@contentful/rich-text-types";
import Form from "@/components/Form/Form";

export type CMSSectionWithHeader = {
	title?: string;
	description?: string;
	backgrounds: CMSEntry<CMSImage>[];
	button_text: string;
	image: CMSEntry<CMSImage>;
	navigation: CMSEntry<CMSNavigation>;
}

export enum UpcomingTourType {
	TOUR = 'tour',
	EXCURSION = 'excursion',
}

export type UpcomingTour = {
	background: CMSEntry<CMSImage>;
	cta: string;
	title?: string;
	description?: string;
	id: string;
	type: UpcomingTourType;
}

export type CMSUpcomingToursSection = {
	title?: string;
	tours: CMSEntry<UpcomingTour>[];
}

export type CMSAboutMeSection = {
	title?: string;
	description?: string;
	background_mobile: CMSEntry<CMSImage>;
	background_desktop: CMSEntry<CMSImage>;
	cta: CMSEntry<CMSButton>;
	modal_cta: CMSEntry<CMSButton>;
	image_desktop: CMSEntry<CMSImage>;
	image_modal: CMSEntry<CMSImage>;
	modal_text: Document;
}

export type CMSAdvantagesSlide = {
	title?: string;
	description?: string;
	image: CMSEntry<CMSImage>;
}

export type CMSAdvantagesSection = {
	title?: string;
	slides: CMSAdvantagesSlide[];
}

export type CMSTab = {
	name: string;
	description: string;
	visible?: boolean;
	images: CMSEntry<CMSImage>[];
}

export type CMSSectionWithTabs = {
	title?: string;
	tabs: CMSTab[]
}

export type CMSBookOptions = {
	options: CMSEntry<CMSButton>[];
}

export type CMSContactsSection = {
	title?: string;
	description?: string;
	book_options: CMSEntry<{
		options: CMSEntry<CMSButton>[];
	}>;
	background: CMSEntry<CMSImage>;
}

export type CMSFooterSection = {
	text: string;
	logo: CMSEntry<CMSImage>;
}

export type CMSReviewsSection = {
	title?: string;
}

export type CMSTeamMember = {
	title?: string;
	description_short?: string;
	description_full?: Document;
	image: CMSEntry<CMSImage>;
}

export type CMSTeamSection = {
	title?: string;
	team_members: CMSEntry<CMSTeamMember>[];
}

export type CMSButtonSection = {
	button: CMSEntry<CMSButton>;
	modal: CMSEntry<CmsUniversalForm>;
}

export type CMSHomeSection = 
	CMSSectionWithHeader |
	CMSUpcomingToursSection | 
	CMSAboutMeSection |
	CMSAdvantagesSection |
	CMSSectionWithTabs |
	CMSContactsSection |
	CMSFooterSection |
	CMSTeamSection |
	CMSButtonSection;
