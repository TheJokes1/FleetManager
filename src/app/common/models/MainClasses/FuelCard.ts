import { AuthenticationType } from "./AuthenticationType";
import { BaseEntity } from "./BaseEntity";
import { DriverFuelCard } from "./DriverFuelCard";
import { FuelCardExtra } from "./FuelCardExtra";
import { FuelType } from "./FuelType";

export interface FuelCard extends BaseEntity {
    number: string;
    pincode: number | null;
    authenticationType: AuthenticationType | null;
    fuelType: FuelType | null;
    driverFuelCards: DriverFuelCard[] | null;
    fuelCardExtras: FuelCardExtra[] | null;
}