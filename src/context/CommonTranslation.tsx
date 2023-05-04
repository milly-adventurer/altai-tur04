import { createContext, PropsWithChildren } from "react";
import { CMSCommonTranslations } from "@/models/cms";

interface CommonTranslationsValue extends CMSCommonTranslations {}

const initialValue = null;

export const commonTranslationContext = createContext<CommonTranslationsValue | null>(initialValue);

const CommonTranslationsProvider = (props: PropsWithChildren<{
	commonTranslations: CommonTranslationsValue,
}>) => {
	const { children, commonTranslations } = props;
	return (
		<commonTranslationContext.Provider
			value={commonTranslations}
		>
			{children}
		</commonTranslationContext.Provider>
	);
};

export default CommonTranslationsProvider;
