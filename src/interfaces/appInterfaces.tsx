export interface User { 
    id: string;
    displayName: string;
    online: boolean;
    photoUrl: string;
}

export interface Users {
    transactions: User[];
}