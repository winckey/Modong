export interface groupbuyingtype{
    closeTime: Date
    id: number
    pickupLocation: string
    price: string
    productName: string
    url: string
    userInfo:userType
};
export interface deliverytype {
    closeTime: Date
    id: number
    pickupLocation: string
    storeName: string
    url: string
    userInfo: userType
}
export interface chatListType {
    name: string,
    roomId: number,
    type: string,
    numberUser: number
};
export interface communitytype  {
    id: number,
    description: string,
    userId: number,
    createdDate: Date,
    modifiedDate: Date,
    commentNumber: number
};
export interface chatDetailtype{
    userId:string;
    message:string;
    date:number;
};
export interface userType{
    age: number
    banned: boolean
    date_create: string
    deleted: boolean
    dongDto: dongDtotype
    id: number
    image: any
    nickname: string
    phone: string
    userId: string
};
export interface dongDtotype{
    dong: string
    dongcode: string
};
export interface commentsDataType{
    boardId: number
    deleted: boolean
    description: string
    id: number
    user: userType
};
export interface gropupbuyingmodalpropstype  {
    closeTime: Date,
    id: number,
    pickupLocation: string,
    price: string,
    productName: string,
    url: string,
};
export interface chatListType {
    name: string,
    roomId: number,
};
export interface communityDataType  {
    id: number,
    description: string,
    userId: number,
    createdDate: Date,
    modifiedDate: Date,
    commentNumber: number
};
export interface menuDataType{
    description: string,
    name: string,
    one_dish: boolean,
    price: string,
    section: string,
    soldout: boolean,
    subchoices: optionDataType[]
};
export interface optionDataType{
    is_available_quantity: boolean,
    mandatory: boolean,
    multiple: boolean,
    name: string,
    subchoices: subOptionDataType[]
};
export interface subOptionDataType{
    name: string,
    price: string,
    soldout: boolean
}
export interface subOptionApartDataType{
    optionContent: string
}
export interface orderDataType{
    itemContent: string,
    options: subOptionApartDataType[],
    price: number,
    quantity: number
}
export interface deliveryRequestedDataType{
    boardId: number,
    itemDtoList: ordermenuDataType[],
    orderType: string,
    userId: number
};
export interface ordermenuDataType{
    itemContent: string,
    options: subOptionApartDataType[],
    price: number,
    quantity: number
};
export interface groupBuyingRecordDataType{
    boardDto: mixedRecordDataType,
    boardId: number,
    itemDtoList: ordermenuDataType[],
    orderType: string,
    userDto: littleUserType,
    userId: number
}
export interface littleUserType{
    id: number,
    image: any, 
    nickname: string
}
export interface mixedRecordDataType{
    boardId: number,
    closeTime: Date,
    pickupLocation: string,
    price: string,
    productName: string,
    storeName: string,
    url: string
}