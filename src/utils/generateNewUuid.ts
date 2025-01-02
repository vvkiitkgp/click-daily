import UUID from 'react-native-uuid';

export const generateNewUuid = (): string=>{
    return UUID.v4() as string;
}