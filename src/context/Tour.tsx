import { createContext, PropsWithChildren } from "react";
import { CMSTourPage } from "@/models/cms";

export type TourContextValue = Partial<{
	basePrice: number;
	tourId: string;
} & Pick<CMSTourPage, 'discount_percent' | 'price_with_discount'>>;

const initialValue = {};

export const TourContext = createContext<TourContextValue>(initialValue);

const TourContextProvider = (props: PropsWithChildren<TourContextValue>) => {
	const { children, basePrice, tourId, price_with_discount, discount_percent } = props;
	return (
		<TourContext.Provider
			value={{
				basePrice,
				tourId,
				price_with_discount,
				discount_percent
			}}
		>
			{children}
		</TourContext.Provider>
	);
};

export default TourContextProvider;
