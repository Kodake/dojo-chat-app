export interface User { 
    id: string;
    displayName: string;
    online: boolean;
    photoUrl: string;
}

export interface Users {
    transactions: User[];
}

export interface Options {
    value: User;
    label: string;
}

export interface Project {
    id: string;
    name: string;
}