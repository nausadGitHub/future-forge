export interface LOGIN {
        data: [];
        message: string;
        status: string;
}

export interface User {
        userID: string;
        userFirstName: string;
        userLastName: string;
        userEmail: string;
        userCountryCode: string;
        userMobile: string;
        userPassword: string;
        userProfilePicture: string;
        languageID: string;
        userVerified: string;
        userStatus: string;
        userCreatedDate: string;
        unread?: number;
        chats: [{
                recent_chat: Chat[];
                unread: Chat[];
                time?: string;
        }];
}

export interface Token {
        access: {
                token: string;
                expires: Date;
        };
}

export interface Users {
        results: User[];
        page: number;
        limit: number;
        totalPages: number;
        totalResults: number;
}

export interface ResponseUsers {
        message: string;
        status: string;
        code: number;
        data: Users[];
}

export interface ResetInterface {
        userNewPassword: string;
        userReNewPassword: string;
}

export interface OtpInterface {
        userOTP1: string;
        userOTP2: string;
        userOTP3: string;
        userOTP4: string;
}

export interface DataTypeUsers {
        userID: string;
        searchword: string;
        pagesize: string;
        page: string;
        sortBy: string;
}

export interface DataTypeChats {
        userID: string;
        receiverUserID: string;
        searchword: string;
        pagesize: string;
        page: string;
        sortBy: string;
}

export interface Chat {
        chatID?: string;
        fromUserId: string;
        toUserId: string;
        senderName: string;
        date: string;
        time: string;
        time_in_ms: number;
        receiverName: string;
        isRead?: boolean;
        message: string;
        apiType?: string;
        apiVersion?: string;
        chatCreatedOn: Date;
        createdAt?: Date;
        id?: string;
}

export interface Chats {
        results: Chat[];
        page: number;
        limit: number;
        totalPages: number;
        totalResults: number;
}

export interface ResponseChats {
        message: string;
        status: string;
        code: number;
        data: Chats[];
}

export interface ResponseRead {
        message: string;
        status: string;
        code: number;
}

export interface UserSignIn {
        userEmail: {
                email: string;
                state: boolean;
        };
        userPassword: {
                password: string;
                state: boolean;
        };
}

export interface UserRegister {
        userName: {
                name: string;
                state: boolean;
        };
        userEmail: {
                email: string;
                state: boolean;
        };
        userMobile: {
                mobile: string;
                state: boolean;
        };
        userPassword: {
                password: string;
                state: boolean;
        };
        userRePassword: {
                re_password: string;
                state: boolean;
        };
        userCountryCode?: string;
        userProfilePicture?: string;
}

export interface SignInSuccess {
        data: User[];
        tokens: Token;
        status: string;
        message: string;
}

export interface SignUpResponse {
        data: User[];
        status: string;
        message: string;
}

export interface ScrollSize {
        page: number;
        limit: number;
        totalPages: number;
        totalResults: number;
        query: QueryUsers;
}

export interface QueryUsers {
        userID: string;
        searchword: string;
        pagesize: string;
        page: string;
        sortBy: string;
}