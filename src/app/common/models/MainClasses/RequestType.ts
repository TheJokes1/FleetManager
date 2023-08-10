import { BaseEntity } from "./BaseEntity";
import { UserRequest } from "./UserRequest";

export interface RequestType extends BaseEntity {
    name: string;
}