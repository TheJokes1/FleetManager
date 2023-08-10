import { Component, ElementRef, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { LicensePlate } from '../../common/models/MainClasses/LicensePlate';
import { Vehicle } from '../../common/models/MainClasses/Vehicle';
import { VehicleService } from '../../core/services/vehicles.service';
import { Router } from '@angular/router';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule} from '@angular/material/table';
import { CommonModule, DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../../common/components/snackbar/snackbar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { DeleteVehicleDialogComponent } from '../../common/dialogs/delete-vehicle-dialog/delete-vehicle-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { VehicleDisplayDTO } from '../../common/models/DTOs/VehicleDisplayDTO';



@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss'],
  standalone: true,
  imports: [
    MatTableModule, CommonModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, MatButtonModule
  ],
  providers: [DatePipe]
})

export class VehiclesComponent implements OnInit{
  displayedColumns: string[] = ['id', 'make', 'model', 'licensePlate', 'firstRegistration', 'chassisNumber', 
    'durationLeasingMonths', 'startLeasing', 'actions'];
  data!: Vehicle[];
  vehicles: VehicleDisplayDTO[];
  pageSize = 10;
  pageIndex = 0;
  length = 1;
  pageSizeOptions = [5, 10, 25];
  filteredVehicles: any[];
  isLoading: boolean;
  searchQuery: string = '';
  filterTimeout: any;
  overallIndex: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('searchInput', { static: false, read: ElementRef }) searchInput!: ElementRef<HTMLInputElement>;

  constructor(private router: Router, private vehicleService: VehicleService, private _snackBar: MatSnackBar, 
    private dialog: MatDialog, private renderer: Renderer2) {
  }
  
  ngOnInit(): void {
    this.getVehicles();
    //this.applyFilter({ target: { value: '' } } as unknown as Event);
  }

  getVehicles(){
    this.isLoading = true;
    this.vehicleService.getVehicles(this.pageIndex, this.pageSize, this.searchQuery).subscribe({
      next: (response : any) => {
        console.log(response);
        this.vehicles = response.items;
        this.length = response.totalCount;
      },
      error: error => console.log(error),
      complete: () => {
        this.isLoading = false;   
        //this.renderer.selectRootElement(this.searchInput.nativeElement).focus();
      }
    });
  }

  applyFilter(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchQuery = target.value;
    clearTimeout(this.filterTimeout);
    // timeout to trigger the filtering after x milliseconds
    this.filterTimeout = setTimeout(() => {
      this.getVehicles();
    }, 1000);
  }

  pageEvent: PageEvent;

  handlePageEvent(e: PageEvent){
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.overallIndex = e.pageIndex * e.pageSize;
    this.getVehicles();
  }

  goToEditPage(vehicleId: number){
    this.router.navigate(['/vehicles/', vehicleId]);
  }

  addVehicle(){
    this.goToEditPage(59);
  }

  deleteVehicle(id: number){
    const dialogRef = this.dialog.open(DeleteVehicleDialogComponent, {
      data: {Id: id}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'Ok') this.confirmDeleteVehicle(id);
    })
  }
  
  confirmDeleteVehicle(vehicleId: number){
    this.vehicleService.deleteVehicle(vehicleId).subscribe({
      next: (response: any) => {
        console.log(response);
        this.vehicles = this.vehicles.filter((vehicle) => vehicle.id !== vehicleId);
        this.openSnackBar('deleted successfully');
        //toast
      },
      error: error => console.log(error)
    });
  }

  openSnackBar(message : string){
    this._snackBar.openFromComponent(SnackbarComponent, {
      data: {message},
      duration: 4000});
  }

}
