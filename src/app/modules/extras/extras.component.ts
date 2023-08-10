import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscribable, Subscription, of } from 'rxjs';
import { SnackbarComponent } from 'src/app/common/components/snackbar/snackbar.component';
import { CustomDialogComponent } from 'src/app/common/dialogs/custom-dialog/custom-dialog.component';
import { TypeDTO } from 'src/app/common/models/DTOs/TypeDTO';
import { DialogData } from 'src/app/common/models/MainClasses/DialogData';
import { VehicleType } from 'src/app/common/models/MainClasses/VehicleType';
import { ExtrasService } from 'src/app/core/services/extras.service';

@Component({
  selector: 'app-extras',
  templateUrl: './extras.component.html',
  styleUrls: ['./extras.component.scss']
})
export class ExtrasComponent {
  extraType: string;
  subscription: Subscription;
  types: TypeDTO[] = [];
  types$: Observable<TypeDTO[]>;
  isReadOnly = [];
  title: string;
  vehicleTypesSubscription: Subscription;
  requestTypeSubscription: Subscription;
  fuelcardExtrasSubscription: Subscription;

  constructor(private route: ActivatedRoute, private extrasService: ExtrasService, private _snackbar: MatSnackBar,
    private dialog: MatDialog) {}

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      this.extraType = params['extraType'];
      
      switch (this.extraType) {
        case 'fuelcardextra':
          this.handleFuelCardExtra();
          break;
        case 'vehicletype':
          this.handleVehicleType();
          break;
        case 'requesttype':
          this.handleRequestType();
          break;
        default:
          console.log('Unknown extra type: ', this.extraType);
      }
    });
  }
  
  handleVehicleType() {
    console.log('Handling Vehicle Type');
    this.title = "Vehicle Types";
    this.types$ = this.extrasService.getVehicleTypes();
    this.vehicleTypesSubscription = this.types$.subscribe(vehicleTypes => {
      this.types = vehicleTypes;
    });
  }
  
  handleRequestType() {
    console.log('Handling Request Type');
    this.title = "Request Types";
    this.types$ = this.extrasService.getRequestTypes();
    this.requestTypeSubscription = this.types$.subscribe(requestTypes => {
      this.types = requestTypes;
    })
  }
  
  handleFuelCardExtra() {
    console.log('Handling Fuel Card Extra');
    this.title = "Fuel Card Extras";
    this.types$ = this.extrasService.getFuelcardExtras();
    this.fuelcardExtrasSubscription = this.types$.subscribe(fuelcardExtras => {
      this.types = fuelcardExtras;
    });
  }

  editType2(type: TypeDTO) {
    console.log("type to update: ", type);
    if (type.id == 0 && type.name.length > 1){
      this.extrasService.addType(type).subscribe({
        next: (response: any) => {
          console.log(response);
          this.openSnackBar('added successfully');
        },
        error: (error: any) => {
          console.log(error);
        }
      })
    } else { 
      if (type.name.length > 1){
        this.extrasService.updateType(type, type.id).subscribe({
          next: (response: any) => {
            console.log(response);
            this.openSnackBar('updated successfully');
          },
          error: (error: any) => {
            console.log(error);
          }
        })
      }
    }
  }

  addType(){
    var length = this.types.length;
    if (this.types[length-1].name.length != 0 ) {
      this.types.push({name: '', id: 0});
    };
  }

  deleteType2(id: number, i: number) {
    if (this.types.length > 0 && id != 0){
      this.extrasService.deleteType(id).subscribe({
        next: (response: any) => {
          console.log(response);
          this.types.splice(i, 1);
          this.openSnackBar('deleted successfully');
        },
        error: (error: any) => {
          console.log(error);
        }
      })
    }
  }

  deleteType(type: TypeDTO, i: number) {
    if(type.id == 0) {this.types.splice(i, 1)} else {
    const dialogData: DialogData = {
      title: "Delete Type",
      message: 'Do you want to delete this vehicle type?'
    }
    const dialogRef = this.dialog.open(CustomDialogComponent , {
      data: dialogData});

      dialogRef.afterClosed().subscribe(result => {
        if (result == 'Ok') this.deleteType2(type.id, i);
      })
    }
  }

  editType(type: TypeDTO){
    if (type.id != 0 || type.name.length>0 ) {
    const dialogData: DialogData = {
      title: "Save Type",
      message: 'Do you want to save this vehicle type?'
    }
    const dialogRef = this.dialog.open(CustomDialogComponent , {
      data: dialogData});

      dialogRef.afterClosed().subscribe(result => {
        if (result == 'Ok') this.editType2(type);
      })
    }
  }


  openSnackBar(message : string){
    this._snackbar.openFromComponent(SnackbarComponent, {
      data: {message},
      duration: 4000});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.vehicleTypesSubscription.unsubscribe();
  }
}