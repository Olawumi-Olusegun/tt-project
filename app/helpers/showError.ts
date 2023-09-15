import { ShowErrorObject } from "../types/types";


export default function showError(error: ShowErrorObject | null, type: string) {
    if(error && Object.entries(error).length > 0 && error?.type == type ) {
        return error?.message;
    }

    return '';
}