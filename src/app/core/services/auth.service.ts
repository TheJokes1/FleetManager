import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { token } from 'src/app/common/models/MainClasses/token';
import { Constants } from 'src/app/common/models/interfaces/Constants';
import { UserManager, User, UserManagerSettings } from 'oidc-client';
import { Subject } from 'rxjs';

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})

@Injectable()

export class AuthService {
  private _userManager: UserManager;
  private _user: User;
  private _loginChangedSubject = new Subject<boolean>();
  public loginChanged = this._loginChangedSubject.asObservable();
  
  private get idpSettings() : UserManagerSettings {
    return {
      authority: Constants.idpAuthority,
      client_id: Constants.clientId,
      client_secret: Constants.clientSecret,
      redirect_uri: `${Constants.clientRoot}signin-callback`,
      scope: "openid profile api.read api.write",
      response_type: "code",
      post_logout_redirect_uri: `${Constants.clientRoot}signout-callback`
    }
  }
  constructor(private http: HttpClient) {
    this._userManager = new UserManager(this.idpSettings);
  }

  public login = () => {
    return this._userManager.signinRedirect();
  }

  public isAuthenticated = (): Promise<boolean> => {
    return this._userManager.getUser()
    .then(user => {
      if(this._user !== user){
        this._loginChangedSubject.next(this.checkUser(user));
      }
      this._user = user;
      return this.checkUser(user);
    })
  }
  
  private checkUser = (user : User): boolean => {
    return !!user && !user.expired;
  }


  public finishLogin = (): Promise<User> => {
    return this._userManager.signinRedirectCallback()
    .then(user => {
      (console.log("user: ", user));
      this._user = user;
      localStorage.setItem("access_token", user.access_token);
      this._loginChangedSubject.next(this.checkUser(user));
      return user;
    })
  }
}
