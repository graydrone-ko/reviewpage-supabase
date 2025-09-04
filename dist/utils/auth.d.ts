type User = {
    id: string;
    email: string;
    role: string;
    birthDate: string;
    gender: string;
    phoneNumber: string;
    bankCode: string;
    accountNumber: string;
};
export declare const hashPassword: (password: string) => Promise<string>;
export declare const comparePassword: (password: string, hashedPassword: string) => Promise<boolean>;
export declare const generateToken: (user: Pick<User, "id" | "email" | "role" | "birthDate" | "gender">) => string;
export declare const verifyToken: (token: string) => any;
export {};
//# sourceMappingURL=auth.d.ts.map