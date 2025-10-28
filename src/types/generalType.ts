// types.ts
export type PermissionItem = { id: number; permision: string };
export type PermissionGroup = { id: number; title: string; value: PermissionItem[] };

// selectedState: هر کلید = id گروه، مقدار = آرایه‌ای از id آیتم‌هایی که انتخاب شده‌اند
export type SelectedState = Record<number, number[]>;
