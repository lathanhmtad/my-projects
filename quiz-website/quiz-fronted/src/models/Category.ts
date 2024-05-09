import BaseResponse from "./BaseResponse";

export interface CategoryResponse extends BaseResponse {
    name: string
    image: string
    enabled: boolean
}
