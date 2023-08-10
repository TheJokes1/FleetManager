import { BaseEntity } from "./BaseEntity";
import { Vehicle } from "./Vehicle";

export interface VehicleType extends BaseEntity {
    name: string;
}