// import CMSClient from "@/api/contentful";
// import {
// 	BOOK_FORM,
// 	BOOK_OPTIONS, BOOK_OPTIONS_ADDITIONAL_INFO,
// 	CALLBACK_FORM,
// 	COMMON_TRANSLATIONS,
// 	EXCURSION_NAVIGATION, FOOTER, FORM_PROGRAM, FORM_TOUR_PRICE,
// 	HOME_PAGE_ID,
// 	TOUR_NAVIGATION
// } from "@/constants/cms";
import {
	CMSCommonTranslations,
	CMSNavigation,
	CMSHomePage,
	CMSTourPage,
	CMSCallbackForm,
	CMSBookForm, CmsUniversalForm
} from "@/models/cms";
import { removeFieldsWrapper } from "@/helpers/cms";
import { CMSBookOptions, CMSFooterSection } from "@/models/cms-sections";
import {
	additionalInfoBookOptions, allExcursions, allTours,
	bookForm,
	bookOptions,
	callbackForm, commonTranslations, excursionNavigation, excursionPrices, excursionsIds,
	footer,
	homePage,
	programForm, tourNavigation,
	tourPriceForm, toursIds, toursPrices
} from '@/static/static-cms-data';
// import CMSClient from '@/api/contentful';

// export const HOMEPAGE_QUERY = `query HomePage($limit: IntType) {
//   allBlogPosts(first: $limit) {
//     title
//   }
// }`;

const cmsAPI = {
	async getHomePage(): Promise<CMSHomePage> {
		// return removeFieldsWrapper<CMSHomePage>((await CMSClient.getEntry(HOME_PAGE_ID, {
		// 	include: 10,
		// })));
		return Promise.resolve(removeFieldsWrapper(homePage) as CMSHomePage)
	},
	
	async getCallbackForm(): Promise<CMSCallbackForm> {
		// return removeFieldsWrapper<CMSCallbackForm>((await CMSClient.getEntry(CALLBACK_FORM, {
		// 	include: 10,
		// })));
		return Promise.resolve(removeFieldsWrapper(callbackForm))
	},
	
	async getBookForm(): Promise<CMSBookForm> {
		// return removeFieldsWrapper<CMSBookForm>((await CMSClient.getEntry(BOOK_FORM, {
		// 	include: 10,
		// })));
		return Promise.resolve(removeFieldsWrapper(bookForm));
	},

	async getProgramForm(): Promise<CmsUniversalForm> {
		// return removeFieldsWrapper<CmsUniversalForm>((await CMSClient.getEntry(FORM_PROGRAM, {
		// 	include: 10,
		// })));
		return Promise.resolve(removeFieldsWrapper(programForm) as CmsUniversalForm);
	},

	async getTourPriceForm(): Promise<CmsUniversalForm> {
		// return removeFieldsWrapper<CmsUniversalForm>((await CMSClient.getEntry(FORM_TOUR_PRICE, {
		// 	include: 10,
		// })));
		return Promise.resolve(removeFieldsWrapper(tourPriceForm) as CmsUniversalForm);
	},

	async getFooter(): Promise<CMSFooterSection> {
		// return removeFieldsWrapper<CMSFooterSection>((await CMSClient.getEntry(FOOTER, {
		// 	include: 10,
		// })));
		return Promise.resolve(removeFieldsWrapper(footer) as unknown as CMSFooterSection);
	},
	
	async getBookOptions(): Promise<CMSBookOptions> {
		// return removeFieldsWrapper<CMSBookOptions>((await CMSClient.getEntry(BOOK_OPTIONS, {
		// 	include: 10,
		// })));
		return Promise.resolve(removeFieldsWrapper(bookOptions) as CMSBookOptions);
	},

	async getAdditionalInfoBookOptions(): Promise<CMSBookOptions> {
		// return removeFieldsWrapper<CMSBookOptions>((await CMSClient.getEntry(BOOK_OPTIONS_ADDITIONAL_INFO, {
		// 	include: 10,
		// })));
		return Promise.resolve(removeFieldsWrapper(additionalInfoBookOptions) as CMSBookOptions);
	},

	async getTourNavigation(): Promise<CMSNavigation> {
		// return removeFieldsWrapper<CMSNavigation>((await CMSClient.getEntry(TOUR_NAVIGATION, {
		// 	include: 10,
		// })));
		return Promise.resolve(removeFieldsWrapper(tourNavigation) as CMSNavigation);
	},

	async getExcursionNavigation(): Promise<CMSNavigation> {
		// return removeFieldsWrapper<CMSNavigation>((await CMSClient.getEntry(EXCURSION_NAVIGATION, {
		// 	include: 10,
		// })));
		return Promise.resolve(removeFieldsWrapper(excursionNavigation))
	},

	async getToursIds(): Promise<{ items: { id: string }[] }> {
		// return removeFieldsWrapper<{ items: { id: string }[] }>((await CMSClient.getEntries({
		// 	'content_type': 'tour_page',
		// 	select: 'fields.id',
		// 	include: 1,
		// })));
		return Promise.resolve(removeFieldsWrapper(toursIds));
	},
	async getExcursionsIds(): Promise<{ items: { id: string }[] }> {
		// return removeFieldsWrapper<{ items: { id: string }[] }>((await CMSClient.getEntries({
		// 	'content_type': 'excursion_page',
		// 	select: 'fields.id',
		// 	include: 1,
		// })));
		return Promise.resolve(removeFieldsWrapper(excursionsIds));
	},

	async getToursPrices(): Promise<{ items: { base_price: number }[] }> {
		// return removeFieldsWrapper<{ items: { price: number }[] }>((await CMSClient.getEntries({
		// 	'content_type': 'tour_page',
		// 	select: 'fields.base_price, fields.discount_percent, fields.price_with_discount, fields.id',
		// 	include: 1,
		// })));
		return Promise.resolve(removeFieldsWrapper(toursPrices) as { items: { base_price: number }[] })
	},

	async getExcursionsPrices(): Promise<{ items: { base_price: number }[] }> {
		// return removeFieldsWrapper<{ items: { price: number }[] }>((await CMSClient.getEntries({
		// 	'content_type': 'excursion_page',
		// 	select: 'fields.base_price, fields.discount_percent, fields.price_with_discount, fields.id',
		// 	include: 1,
		// })));
		return Promise.resolve(removeFieldsWrapper(excursionPrices) as { items: { base_price: number }[] })
	},

	async getTourPage(id: string): Promise<{ items: CMSTourPage[] }> {
		// return removeFieldsWrapper<{ items: CMSTourPage[] }>((await CMSClient.getEntries({
		// 	'content_type': 'tour_page',
		// 	// 'fields.id[match]': id,
		// 	include: 10,
		// })).items[0]);
		const foundPage = allTours.find((tour) => tour.id === id)
		return Promise.resolve(removeFieldsWrapper(foundPage) as any);
	},

	async getExcursionPage(id: string): Promise<{ items: CMSTourPage[] }> {
		// return removeFieldsWrapper<{ items: CMSTourPage[] }>((await CMSClient.getEntries({
		// 	'content_type': 'excursion_page',
		// 	// 'fields.id[match]': id,
		// 	include: 10,
		// })));
		const foundPage = allExcursions.find((excursion) => excursion.id === id)
		return Promise.resolve(removeFieldsWrapper(foundPage) as any);
	},

	async getCommonTranslations(): Promise<CMSCommonTranslations> {
		// return removeFieldsWrapper<CMSCommonTranslations>((await CMSClient.getEntry(COMMON_TRANSLATIONS, {
		// 	include: 2,
		// })));
		return Promise.resolve(removeFieldsWrapper(commonTranslations) as unknown as CMSCommonTranslations);
	},
}

export default cmsAPI;
