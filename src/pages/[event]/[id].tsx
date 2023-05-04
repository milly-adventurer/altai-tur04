import cmsAPI from "@/api/cms";

export { Tour as default, getStaticProps } from '@/containers/Tour/Tour';

export async function getStaticPaths () {
	const toursIds = await cmsAPI.getToursIds();
	const excursionsIds = await cmsAPI.getExcursionsIds();
	
	const paths = [
		...toursIds.items.map(( { id }) => ({ params: { event: 'tour', id } })),
		...excursionsIds.items.map(({ id }) => ({ params: { event: 'excursion', id } })),
	];
	
	return {
		paths,
		fallback: false,
	}
}
