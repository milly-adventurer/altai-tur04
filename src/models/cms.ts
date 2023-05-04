import { ButtonAction, ButtonStyle, ButtonType } from "@/components/Button";
import { CMSAboutMeSection, CMSHomeSection } from "@/models/cms-sections";
import { Document } from "@contentful/rich-text-types";

export type CMSEntry<T> = {
  metadata?: Record<string, any>;
  sys?: {
    contentType: {
      sys: {
        id: string;
      }
    }
  };
} & T;

export type CMSButton = {
  style: ButtonStyle;
  text: string;
	social?: ButtonAction;
	link?: string;
	type: ButtonType;
}


export type CMSFocalPoint = {
 x: number;
 y: number;
}

export type CMSFile = {
  contentType?: string;
  details?: {
    image?: {
      height: number;
      width: number;
    }
  }
  filename: string;
  url: string;
}

export type CMSImage = {
  title?: string;
  description?: string;
  file: CMSFile;
}

export type CMSAnchor = {
	id: string;
	name: string;
}

export type CMSNavigation = {
	anchors: CMSAnchor[];
}

export type CMSTourPrice = {
	items: Pick<CMSTourPage, 'discount_percent' | 'price_with_discount' | 'base_price' | 'id'>[];
}

export interface CMSHomePage {
  seo_title?: string;
	seo_description?: string;
  sections: CMSEntry<CMSHomeSection>[];
}

export type CMSAccomodationSection = {
	title?: string;
	description: Document;
	images: CMSEntry<CMSImage>[];
}

export type CMSAdditionalTourInfoCard = {
	title?: string;
	description?: Document;
	background: CMSEntry<CMSImage>;
	cta: CMSEntry<CMSButton>;
}

export type CMSAdditionalTourInfoSection = {
	title: string;
	cards: CMSEntry<CMSAdditionalTourInfoCard>[];
	button: CMSEntry<CMSButton>;
}

export type CMSDate = {
	available_places: number;
	date: string;
}

export type CMSDatesSection = {
	title?: string;
	dates: CMSEntry<CMSDate>[];
}

export type CMSImagesGridSection = {
	title?: string;
	description?: string;
	alignment?: 'center' | 'left';
	images: CMSEntry<CMSImage>[];
}

export type CMSTourDay = {
	title?: string;
	image: CMSEntry<CMSImage>;
	description_short?: string;
	description_long?: Document;
	background_image: CMSEntry<CMSImage>;
}

export type CMSTourDaysSection = {
	title?: string;
	days: CMSEntry<CMSTourDay>[];
}

export type CMSTourTitleSection = {
	title?: string;
	description: string;
	background: CMSEntry<CMSImage>;
	button_text: string;
}

export type CMSTourSection =
	CMSTourTitleSection |
	CMSAboutMeSection |
	CMSTourDaysSection |
	CMSAccomodationSection |
	CMSAdditionalTourInfoSection |
	CMSDatesSection |
	CMSImagesGridSection;

export interface CMSTourPage {
	id: string;
	base_price: number;
	price_with_discount: number;
	discount_percent: number;
	sections: CMSEntry<CMSTourSection>[];
}

export type CMSCallbackForm = {
	title?: string;
	description?: string
	image?: CMSEntry<CMSImage>;
	success_message: string;
	button_text: string;
}

export type CMSBookForm = {
	title?: string;
	description?: string
	image?: CMSEntry<CMSImage>;
	success_title: string;
	success_description: string;
	button_text: string;
}

export enum FieldType {
	PHONE = 'phone',
	EMAIL = 'email',
	NAME = 'email',
	PEOPLE_NUMBER = 'people_number',
}

export type CmsFiled = {
	placeholder?: string;
	type: FieldType;
	required?: boolean;
}

export type CmsUniversalForm = {
	title?: string;
	description?: string;
	inputs: CMSEntry<CmsFiled>[];
	button_text?: string;
	success_title?: string;
	success_description?: string;
}


export type CMSCommonTranslations = {
	social_button: string;
	tour_book_title?: string;
	tour_book_description?: string;
	upcoming_event_cta?: string;
	discount_sign?: string;
} & Record<string, string>;
