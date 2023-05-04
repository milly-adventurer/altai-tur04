import { createContext, PropsWithChildren } from "react";
import { CmsUniversalForm } from "@/models/cms";
import { CMSBookOptions } from "@/models/cms-sections";

interface FormsValue {
	tourPricesForm?: CmsUniversalForm;
	programForm?: CmsUniversalForm;
	additionalInfoOptions?: CMSBookOptions;
}

const initialValue = {};

export const FormsContext = createContext<FormsValue>(initialValue);

const FormsContextProvider = (props: PropsWithChildren<FormsValue>) => {
	const { children, tourPricesForm, programForm, additionalInfoOptions } = props;
	return (
		<FormsContext.Provider
			value={{
				tourPricesForm,
				programForm,
				additionalInfoOptions,
			}}
		>
			{children}
		</FormsContext.Provider>
	);
};

export default FormsContextProvider;
