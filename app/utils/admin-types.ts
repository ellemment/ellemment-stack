// app/utils/admin-types.ts

export const AdminType = {
    SUPER_ADMIN: 'SUPER_ADMIN',
    CONTENT_ADMIN: 'CONTENT_ADMIN',
    DOCS_ADMIN: 'DOCS_ADMIN',
    STORE_ADMIN: 'STORE_ADMIN',
    SPACES_ADMIN: 'SPACES_ADMIN',
  } as const;
  
  export type AdminType = typeof AdminType[keyof typeof AdminType];
  
  export function isValidAdminType(type: string): type is AdminType {
    return Object.values(AdminType).includes(type as AdminType);
  }