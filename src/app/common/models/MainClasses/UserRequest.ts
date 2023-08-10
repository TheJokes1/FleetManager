import { BaseEntity } from "./BaseEntity";
import { Driver } from "./Driver";
import { RequestStatus } from "./RequestStatus";
import { RequestType } from "./RequestType";
import { Vehicle } from "./Vehicle";

export interface UserRequest extends BaseEntity {
    requestDate: string | null;
    planned1: string | null;
    planned2: string | null;
    requestStatus: RequestStatus | null;
    vehicleId: number | null;
    vehicle: Vehicle;
    driverId: number;
    driver: Driver;
    requestTypeId: number;
    requestType: RequestType;
}