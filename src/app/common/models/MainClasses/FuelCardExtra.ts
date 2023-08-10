import { BaseEntity } from "./BaseEntity";
import { Extra } from "./Extra";
import { FuelCard } from "./FuelCard";

export interface FuelCardExtra extends BaseEntity {
    fuelCardId: number;
    fuelCard: FuelCard;
    extraId: number;
    extra: Extra;
}