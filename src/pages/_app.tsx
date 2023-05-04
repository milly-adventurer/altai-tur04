import '@/styles/globals.scss';
import '@/styles/reset.scss';
import type { AppProps } from 'next/app';
import CommonTranslationsProvider from "@/context/CommonTranslation";
import { Analytics } from '@vercel/analytics/react';
import ReactModal from "react-modal";

import phone from "static/assets/images/phone.svg";
import Image from "next/image";

ReactModal.setAppElement('#__next');

export default function App({ Component, pageProps }: AppProps) {
  return (
		<>
			<CommonTranslationsProvider commonTranslations={pageProps.commonTranslations}>
				<div id="modal"></div>
				<Component {...pageProps} />
			</CommonTranslationsProvider>
			<Analytics />
			<a className="phone" href={"tel:+79039191960"}>
				<Image width={28} height={28} src={phone} alt={"Телефон"} />
			</a>
		</>
	);
}
