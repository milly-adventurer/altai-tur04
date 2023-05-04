import React, { useEffect } from 'react';
import cmsAPI from "@/api/cms";
import { CMSHomePage, CMSTourPrice, CmsUniversalForm } from "@/models/cms";
import CMSRenderer from "@/components/CMSRenderer/CMSRenderer";
import { tripadvisorAPIEndpoint } from "@/constants/api";
import axios, { AxiosResponse } from "axios";
import { TripadvisorResponse } from "@/models/tripadvisor";
import Head from "next/head";
import FormsContextProvider from "@/context/FormsContext";
import SectionWithHeader from '@/components/SectionWithHeader/SectionWithHeader';
import cms from '@/api/cms';

interface HomePageProps {
  homePageData: CMSHomePage;
	reviewsData: TripadvisorResponse;
	CMSExcursionPrices: CMSTourPrice;
	CMSTourPrices: CMSTourPrice;
	CmsProgramForm: CmsUniversalForm;
	CmsTourPriceForm: CmsUniversalForm;
}

export const HomePage = ({ homePageData, CMSExcursionPrices, CMSTourPrices, reviewsData, CmsProgramForm, CmsTourPriceForm }: HomePageProps) => {
	const { sections, seo_title, seo_description } = homePageData;
	
	useEffect(() => {
		(async () => {
			// const getCallbackForm = await cmsAPI.getCallbackForm();
			// const getBookForm = await cmsAPI.getBookForm();
			// const getProgramForm = await cmsAPI.getProgramForm();
			// const getTourPriceForm = await cmsAPI.getTourPriceForm();
			// const getFooter = await cmsAPI.getFooter();
			// const getBookOptions = await cmsAPI.getBookOptions();
			// const getAdditionalInfoBookOptions = await cmsAPI.getAdditionalInfoBookOptions();
			// const getTourNavigation = await cmsAPI.getTourNavigation();
			// const getExcursionNavigation = await cmsAPI.getExcursionNavigation();
			// const getToursIds = await cmsAPI.getToursIds();
			// const getExcursionsIds = await cmsAPI.getExcursionsIds();
			// const getToursPrices = await cmsAPI.getToursPrices();
			// const getExcursionsPrices = await cmsAPI.getExcursionsPrices();
			// todo
			// const getTourPage = await cmsAPI.getTourPage();
			// const getExcursionPage = await cmsAPI.getExcursionPage();
			// const getCommonTranslations = await cmsAPI.getCommonTranslations();
			// const getTourPage = await cmsAPI.getTourPage('Классика');
			const ad = await cmsAPI.as();
			console.log(ad, 'footer')
		})();
	}, [])

	let url = process.browser && window?.location.href || '';

  return (
		<>
			<Head>
				<title>{seo_title}</title>
				<meta lang={"ru"} />
				<meta name="title" content={seo_title} />
				<meta name="description" content={seo_description} />
				<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
				<meta charSet="utf-8" />
				<meta property="og:site_name" content="Алтай Эстетик тур" />
				<meta property="og:url" content={url} />
				<meta property="twitter:url" content={url} />
				<meta property="og:title" content={seo_title} />
				<meta name="twitter:title" content={seo_title} />
				<meta property="og:description" content={seo_description} />
				<meta name="twitter:description" content={seo_description} />
				<meta property="og:type" content={"website"} />
				<meta property="og:image" content={"https://images.ctfassets.net/1vay05tm7yg4/21pM38xNsmLOqGvGouC93F/6eb854e19d0452ddaecb271792f57f3b/Logo_kvadrat_sun_white.png"} />
				<meta name="robots" content="index, follow" />
			</Head>
			<div>
				<FormsContextProvider
					programForm={CmsProgramForm}
					tourPricesForm={CmsTourPriceForm}
				>
					{sections.map((section, i) => {
						return (
							<CMSRenderer
								key={i}
								contentType={section.sys?.contentType.sys.id}
								reviewsData={reviewsData}
								CMSTourPrices={CMSTourPrices}
								CMSExcursionPrices={CMSExcursionPrices}
								{...section}
							/>
						);
					})}
				</FormsContextProvider>
			</div>
		</>
  );
};

export async function getStaticProps () {
  const homePageData = await cmsAPI.getHomePage();
	const reviewsData = (await axios.get<AxiosResponse<TripadvisorResponse>>(tripadvisorAPIEndpoint)).data;
	const commonTranslations = await cmsAPI.getCommonTranslations();
	const CMSExcursionPrices = await cmsAPI.getExcursionsPrices();
	const CMSTourPrices = await cmsAPI.getToursPrices();
	const CmsProgramForm = await cmsAPI.getProgramForm();
	const CmsTourPriceForm = await cmsAPI.getTourPriceForm();

  return {
    props: {
      homePageData,
			reviewsData: reviewsData,
			commonTranslations,
			CMSExcursionPrices,
			CMSTourPrices,
			CmsProgramForm,
			CmsTourPriceForm
    },
  }
}
