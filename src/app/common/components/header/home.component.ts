import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private _authService: AuthService){
    //this.login();
  }

  public login = () => {
    this._authService.login();
  }

  // getAuthToken(){
  //   this.authService.getToken().subscribe(
  //     (token) => {
  //       console.log('Token: ', token);
  //       localStorage.setItem('token', token.access_token);
  //     },
  //     (error) => {
  //       console.error('Error fetching token: ', error);
  //     }
  //   );
  // }

}

