import React from 'react';
import { CMSNavigation, CMSTourPage, CMSTourTitleSection, CmsUniversalForm } from "@/models/cms";
import cmsAPI from "@/api/cms";
import CMSRenderer, { CMSContentType } from "@/components/CMSRenderer/CMSRenderer";
import { UpcomingTourType, CMSFooterSection, CMSBookOptions } from "@/models/cms-sections";
import axios, { AxiosResponse } from "axios";
import { TripadvisorResponse } from "@/models/tripadvisor";
import { tripadvisorAPIEndpoint } from "@/constants/api";
import TourContextProvider from "@/context/Tour";
import Footer from "@/components/Footer/Footer";
import Head from "next/head";

import { img } from "@/helpers/cms";

import FormsContextProvider from "@/context/FormsContext";

export interface TourProps {
	CMSTourPage: CMSTourPage;
	reviewsData: TripadvisorResponse;
	CMSPageNavigation: CMSNavigation;
	CMSFooter: CMSFooterSection;
	CmsProgramForm: CmsUniversalForm;
	CmsTourPriceForm: CmsUniversalForm;
	CmsAdditionalInfoOptions: CMSBookOptions;
}

export const Tour = ({ CMSTourPage, CMSPageNavigation, CMSFooter, reviewsData, CmsProgramForm, CmsTourPriceForm, CmsAdditionalInfoOptions }: TourProps) => {
	const { sections, base_price, id, price_with_discount, discount_percent } = CMSTourPage;

	const { title, description, background } = sections.find((section) =>
		section.sys?.contentType.sys.id === CMSContentType.TOUR_TITLE_SECTION
	) as CMSTourTitleSection || {};
	
	console.log(CmsProgramForm);
	let url = process.browser && window?.location.href || '';
	
	return (
		<>
			<Head>
				<title>{title}</title>
				<meta lang={"ru"} />
				<meta name="title" content={title} />
				<meta name="description" content={description} />
				<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
				<meta charSet="utf-8" />
				<meta property="og:site_name" content="Алтай Эстетик тур" />
				<meta property="og:url" content={url} />
				<meta property="twitter:url" content={url} />
				<meta property="og:title" content={title} />
				<meta name="twitter:title" content={title} />
				<meta property="og:description" content={description} />
				<meta name="twitter:description" content={description} />
				<meta property="og:type" content={"website"} />
				<meta property="og:image" content={img(background)} />
				<meta name="robots" content="index, follow" />
			</Head>
			<TourContextProvider
				basePrice={base_price}
				tourId={id}
				discount_percent={discount_percent}
				price_with_discount={price_with_discount}
			>
				<FormsContextProvider
					programForm={CmsProgramForm}
					tourPricesForm={CmsTourPriceForm}
					additionalInfoOptions={CmsAdditionalInfoOptions}
				>
					<div>
						{sections.map((section, i) => {
							return (
								<CMSRenderer
									key={i}
									contentType={section.sys?.contentType.sys.id}
									reviewsData={reviewsData}
									navigation={CMSPageNavigation}
									{...section}
								/>
							);
						})}
						<Footer {...CMSFooter} />
					</div>
				</FormsContextProvider>
			</TourContextProvider>
		</>
	);
};

export async function getStaticProps ({ params }: { params: { id: string, event: UpcomingTourType } }) {
	const isTour = params.event === UpcomingTourType.TOUR;
	const CMSTourPage = isTour ? await cmsAPI.getTourPage(params.id) : await cmsAPI.getExcursionPage(params.id);
	const CMSPageNavigation = isTour ? await cmsAPI.getTourNavigation() : await cmsAPI.getExcursionNavigation();
	const CMSFooter = await cmsAPI.getFooter();

	const commonTranslations = await cmsAPI.getCommonTranslations();
	const reviewsData = (await axios.get<AxiosResponse<TripadvisorResponse>>(tripadvisorAPIEndpoint)).data;
	
	const CmsProgramForm = await cmsAPI.getProgramForm();
	const CmsTourPriceForm = await cmsAPI.getTourPriceForm();

	const CmsAdditionalInfoOptions = await cmsAPI.getAdditionalInfoBookOptions();

	return {
		props: {
			CMSTourPage,
			commonTranslations,
			CMSFooter,
			reviewsData,
			CMSPageNavigation,
			CmsProgramForm,
			CmsTourPriceForm,
			CmsAdditionalInfoOptions,
		},
	};
}
