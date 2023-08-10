import { Component, Input, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { VehicleService } from 'src/app/core/services/vehicles.service';
import { Lyric } from '../../models/interfaces/lyric';

@Component({
  selector: 'app-header',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  lyrics: Lyric[] = [];

  constructor(private _authService: AuthService, private vehicleService: VehicleService){
    //this.login();
    console.log("ddddddddddddddddddddddd");
    this.getLyrics();
  }

  public login = () => {
    this._authService.login();
  }

  getLyrics(){
    this.vehicleService.GetLyrics("","","").subscribe(
      (response) => {
        console.log('Lyrics: ', response);
        this.lyrics = response;
      },
      (error) => {
        console.error('Error fetching token: ', error);
      }
    );
  }

}

