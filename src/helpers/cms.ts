import { CMSImage } from "@/models/cms";
import { Darkness } from "@/components/Overlay/Overlay";

export function removeFieldsWrapper<T>(data: any): T {
  if (!data || typeof data !== "object") {
    return data;
  }

  if (Array.isArray(data)) {
    return data.map(removeFieldsWrapper) as any;
  }

  if ("fields" in data) {
    const { fields, ...rest } = data as any;
    const newData = removeFieldsWrapper(fields);
		// @ts-ignore
    return { ...newData, ...rest } as T;
  }

  return Object.entries(data).reduce((obj, [key, value]) => {
		// @ts-ignore
    obj[key] = removeFieldsWrapper(value);
    return obj;
  }, {} as T);
}

export const img = (image: CMSImage) => {

  return `https:${image?.file.url}?q=75&fm=webp`;
}

export const bgImage = (image: CMSImage, darkness: Darkness = 0): string => {
	return `linear-gradient(rgba(0, 0, 0, ${darkness}), rgba(0, 0, 0, ${darkness})), url(${img(image)})`;
};
