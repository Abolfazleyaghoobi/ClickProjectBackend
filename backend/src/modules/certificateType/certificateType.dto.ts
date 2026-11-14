export interface CreateCertificateTypeDto {
    key:string;
    title:string;
    iconKey:string;
    color:string;
    isActive:boolean;
}


export interface UpdateCertificateTypeDto {
    key?:string;
    title?:string;
    iconKey?:string;
    color?:string;
    isActive?:boolean;
}
