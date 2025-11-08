// types.ts
export type PermissionItem = { id: number; permision: string };
export type PermissionGroup = { id: number; title: string; value: PermissionItem[] };

// selectedState: هر کلید = id گروه، مقدار = آرایه‌ای از id آیتم‌هایی که انتخاب شده‌اند
export type SelectedState = Record<number, number[]>;

export type UserFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  password_confirm: string;
  username: string;
  userType: string;
  role: number | string;
  is_Verify: boolean;
};