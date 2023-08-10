import { CommonModule, DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { DriversService } from 'src/app/core/services/drivers.service';
//import { Driver } from '../../common/models/Driver';
import { DriverVehicleDTO } from '../../common/models/DTOs/DriverVehicleDTO';
import { MatTableModule} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarComponent } from 'src/app/common/components/snackbar/snackbar.component';
import { DeleteVehicleDialogComponent } from 'src/app/common/dialogs/delete-vehicle-dialog/delete-vehicle-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.scss'],
  standalone: true,
  imports: [CommonModule, MatPaginatorModule, MatTableModule, MatPaginatorModule, MatButtonModule, MatIconModule, MatFormFieldModule],
  providers: [DatePipe]
})
export class DriversComponent implements OnInit{
  displayedColumns: string[] = ['id', 'firstName', 'name', 'driversLicenseType', 'vehicle', 'number', 'dateFrom', 'actions'];
  data! : DriverVehicleDTO[];
  pageSize = 10;
  pageIndex = 0;
  length = 1;
  pageSizeOptions = [5, 10, 25];
  drivers: DriverVehicleDTO[];
  searchQuery: string = "";
  filterTimeout: any;
  overallIndex: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('searchInput', { static: false, read: ElementRef }) searchInput!: ElementRef<HTMLInputElement>;
  constructor(private router: Router, private driverService: DriversService, private dialog: MatDialog, private _snackBar: MatSnackBar){
  }
  
  ngOnInit(): void {
    this.getDrivers();
  }

  getDrivers() {
    this.driverService.getDrivers(this.pageIndex, this.pageSize, this.searchQuery).subscribe({
      next: (response : any) => {
        console.log(response);
          //this.drivers = response.items.filter((driver) => driver.active === true);
          this.drivers = response.items;
          this.length = response.totalCount;
      },
      error: error => console.log(error),
      complete: () => {
      }
    });
  }

  applyFilter(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchQuery = target.value;
    clearTimeout(this.filterTimeout);
    // timeout to trigger the filtering after x milliseconds
    this.filterTimeout = setTimeout(() => {
      this.getDrivers();
    }, 1000);
  }

  addDriver(){
    this.router.navigate(['/drivers/add']);
  }

  deleteDriver(id: number){
    const dialogRef = this.dialog.open(DeleteVehicleDialogComponent, {
      data: {Id: id}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'Ok') this.confirmDeleteDriver(id);
    })
  }

  editDriver(id: number){
    this.router.navigate(['/drivers/', id]);
  }


  pageEvent: PageEvent;
  handlePageEvent(e: PageEvent){
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.overallIndex = e.pageIndex * e.pageSize;
    this.getDrivers();
  }
  
  confirmDeleteDriver(driverId: number){
    this.driverService.deleteDriver(driverId).subscribe({
      next: (response: any) => {
        console.log(response);
        this.drivers = this.drivers.filter((driver) => driver.id !== driverId);
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

