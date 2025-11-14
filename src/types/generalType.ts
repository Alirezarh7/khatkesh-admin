// types.ts
export type PermissionItem = { id: number; permision: string };
export type PermissionGroup = { id: number; title: string; value: PermissionItem[] };

// selectedState: هر کلید = id گروه، مقدار = آرایه‌ای از id آیتم‌هایی که انتخاب شده‌اند
export type SelectedState = Record<number, number[]>;

export type UserFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string| number;
  password_confirm: string| number;
  username: string;
  userType: string;
  role: number | string;
  is_Verify: boolean;
};

export type ProductForm = {
  Title: string;
  CategoryId: number | null;
  TitleEn: string;
  Description: string;
  ShortDescription: string;
  MetaTitle: string;
  MetaDescription: string;
  ImageAlt: File | null;
  SubCategoryIds: number[];
  Prices: {
    id: number,
    priceValue: number,
    discountPercent: number,
    discountPrice: number,
    stock: number
  };
  Image: File | null;
  Images: File | null;
};