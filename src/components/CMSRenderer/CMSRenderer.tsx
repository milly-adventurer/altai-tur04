import React from 'react';
import GenericSection, { SectionWithHeaderProps } from "@/components/SectionWithHeader/SectionWithHeader";
import UpcomingToursSection, {
	UpcomingToursProps
} from "@/containers/HomePage/sections/UpcomingToursSection/UpcomingToursSection";
import AboutMe, { AboutMeProps } from "@/containers/HomePage/sections/AboutMe/AboutMe";
import Advantages, { AdvantagesProps } from "@/containers/HomePage/sections/Advantages/Advantages";
import SectionWithTabs, { SectionWithTabsProps } from "@/components/SectionWithTabs/SectionWithTabs";
import ContactsSection, { ContactsSectionProps } from "@/components/ContactsSection/ContactsSection";
import Footer, { FooterProps } from "@/components/Footer/Footer";
import TourTitleSection, { TourTitleSectionProps } from "@/containers/Tour/sections/TourTitleSection/TourTitleSection";
import DatesSection, { DatesSectionProps } from "@/containers/Tour/sections/DatesSection/DatesSection";
import DaysSection, { DaysSectionProps } from "@/containers/Tour/sections/DaysSection/DaysSection";
import AccommodationSection, {
	AccommodationSectionProps
} from "@/containers/Tour/sections/AccommodationSection/AccommodationSection";
import AdditionalInfoSection, {
	AdditionalInfoSectionProps
} from "@/containers/Tour/sections/AdditionalInfoSection/AdditionalInfoSection";
import ImagesGridSection, { ImagesGridSectionProps } from "@/components/ImagesGridSection/ImagesGridSection";
import ReviewsSection, { ReviewsSectionProps } from "@/components/ReviewsSection/ReviewsSection";
import { TripadvisorResponse } from "@/models/tripadvisor";
import { CMSNavigation, CMSTourPrice } from "@/models/cms";
import TeamSection, { TeamSectionProps } from "@/components/TeamSection/TeamSection";
import ButtonSection, { CMSButtonSectionProps } from "@/components/CMSButtonSection/CMSButtonSection";

export enum CMSContentType {
  GENERIC_SECTION = 'generic_section',
	UPCOMING_TOURS_SECTION = 'upcoming_tours_section',
	ABOUT_SECTION = 'about_section',
	ADVANTAGES_SECTION = 'advantages_section',
	TABS_SECTION = 'section_with_tabs',
	CONTACTS_SECTION = 'contacts_section',
	FOOTER = 'footer',
	TOUR_TITLE_SECTION = 'tour_title_section',
	TOUR_DATES_SECTION = 'tour_dates_section',
	TOUR_DAYS_SECTION = 'tour_days_section',
	ACCOMMODATION_SECTION = 'accomodation_section',
	ADDITIONAL_TOUR_INFO_SECTION = 'additional_tour_info_section',
	IMAGES_GRID_SECTION = 'images_grid_section',
	REVIEWS_SECTION = 'reviews_section',
	TEAMS_SECTION = 'team_section',
	BUTTON_SECTION = 'button_section',
}

interface CMSRendererProps {
  contentType?: string;
	reviewsData?: TripadvisorResponse;
	navigation?: CMSNavigation;
	CMSExcursionPrices?: CMSTourPrice;
	CMSTourPrices?: CMSTourPrice;
}

const CMSRenderer = (props: CMSRendererProps) => {
  const { contentType, CMSTourPrices, CMSExcursionPrices, reviewsData, navigation, ...rest } = props;
	
  switch (contentType) {
    case CMSContentType.GENERIC_SECTION:
      return <GenericSection {...rest as SectionWithHeaderProps} navigation={navigation as CMSNavigation} />;
		case CMSContentType.TOUR_TITLE_SECTION:
			return <TourTitleSection {...rest as TourTitleSectionProps} navigation={navigation as CMSNavigation} />;
		case CMSContentType.UPCOMING_TOURS_SECTION:
			return <UpcomingToursSection {...rest as UpcomingToursProps} CMSTourPrices={CMSTourPrices} CMSExcursionPrices={CMSExcursionPrices} />;
		case CMSContentType.ABOUT_SECTION:
			return <AboutMe {...rest as AboutMeProps} />;
		case CMSContentType.ADVANTAGES_SECTION:
			return <Advantages {...rest as AdvantagesProps} />;
		case CMSContentType.TABS_SECTION:
			return <SectionWithTabs {...rest as SectionWithTabsProps} />;
		case CMSContentType.CONTACTS_SECTION:
			return <ContactsSection {...rest as ContactsSectionProps} />;
		case CMSContentType.TOUR_DATES_SECTION:
			return <DatesSection {...rest as DatesSectionProps} />;
		case CMSContentType.TOUR_DAYS_SECTION:
			return <DaysSection {...rest as DaysSectionProps} />;
		case CMSContentType.ACCOMMODATION_SECTION:
			return <AccommodationSection {...rest as AccommodationSectionProps} />;
		case CMSContentType.ADDITIONAL_TOUR_INFO_SECTION:
			return <AdditionalInfoSection {...rest as AdditionalInfoSectionProps} />;
		case CMSContentType.IMAGES_GRID_SECTION:
			return <ImagesGridSection {...rest as ImagesGridSectionProps} />;
		case CMSContentType.REVIEWS_SECTION:
			return <ReviewsSection {...rest as ReviewsSectionProps} reviews={reviewsData as TripadvisorResponse} />;
		case CMSContentType.TEAMS_SECTION:
			return <TeamSection {...rest as TeamSectionProps} />;
		case CMSContentType.FOOTER:
			return <Footer {...rest as FooterProps} />;
		case CMSContentType.BUTTON_SECTION:
			return <ButtonSection {...rest as CMSButtonSectionProps} />
    default:
      return null;
  }
};

export default CMSRenderer;
