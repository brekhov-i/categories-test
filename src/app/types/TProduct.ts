export type TProduct = {
  id: number;
  name: string;
  categories: TCategory[];
};

export type TCategory = {
  id: number;
  name: string;
  subcategories: TSubcategory[];
};

export type TSubcategory = {
  id: number;
  name: string;
  tags: TTag[];
};

export type TTag = {
  id: number;
  name: string;
  aliases: string[];
};

export type TItem = {
  id: number;
  name: string;
  categories?: TCategory[];
  subcategories?: TSubcategory[];
  tags?: TTag[];
  aliases?: string[];
};
