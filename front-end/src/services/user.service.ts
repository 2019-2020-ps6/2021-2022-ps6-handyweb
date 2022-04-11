import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Subject} from 'rxjs';
import { User } from '../models/user.model';
import { serverUrl, httpOptionsBase } from '../configs/server.config';
import {Config} from "../models/config.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  /*
   The list of user.
   */

  public static USER = 'user';
  public static CONFIG = 'config';

  private defaultConfig: Config = {
    id: '0',
    name: 'default',
    size: 5,
  }

  private users: User[] = [];

  /*
   Observable which contains the list of the user.
   */
  public users$: BehaviorSubject<User[]>
    = new BehaviorSubject([]);

  private userSelected: User;
  public userSelected$: BehaviorSubject<User> = new BehaviorSubject(JSON.parse(localStorage.getItem(UserService.USER)));

  public configs$: BehaviorSubject<Config[]> = new BehaviorSubject<Config[]>([]);

  public configSelected$: BehaviorSubject<Config> = new BehaviorSubject<Config>(this.defaultConfig);

  private userUrl = serverUrl + '/users';

  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient) {
    this.retrieveUsers();

    const user = JSON.parse(localStorage.getItem(UserService.USER));
    if (user) {
      setTimeout(() => this.logIn(user), 200);
    }

    const config = JSON.parse(localStorage.getItem(UserService.CONFIG));
    if (config) {
      this.configSelected$.next(config);
    }
    // // put a default user
    // const user: User = {
    //   firstName: "default",
    //   lastName: "1"
    // }
    //
    // setTimeout(() => this.logIn(user), 200);
  }

  retrieveUsers(): void {
    this.http.get<User[]>(this.userUrl).subscribe((userList) => {
      this.users = userList;
      this.users$.next(this.users);
    });
  }

  addUser(user: User): void {
    this.http.post<User>(this.userUrl, user, this.httpOptions).subscribe(() => this.retrieveUsers());
  }

  setSelectedUser(userId: string): void {
    const urlWithId = this.userUrl + '/' + userId;
    this.http.get<User>(urlWithId).subscribe((user) => {
      this.userSelected$.next(user);
    });
  }

  deleteUser(user: User): void {
    const urlWithId = this.userUrl + '/' + user.id;
    this.http.delete<User>(urlWithId, this.httpOptions).subscribe(() => this.retrieveUsers());
  }

  logIn(user: User): boolean {
    const userDatabase = this.users.find(u => u.firstName.toLowerCase() === user.firstName.toLowerCase()
                                          && u.lastName.toLowerCase() === user.lastName.toLowerCase());
    if (userDatabase !== undefined) {
      this.userSelected = userDatabase;
      this.userSelected$.next(userDatabase);
      localStorage.setItem(UserService.USER, JSON.stringify(this.userSelected))
      return true;
    }
    return false;
  }

  disconnect() {
    this.userSelected = undefined;
    this.userSelected$.next(undefined);
    localStorage.removeItem(UserService.USER);
    localStorage.removeItem(UserService.CONFIG);
  }

  retrieveConfigs(): void {
    const urlWithId = this.userUrl + '/' + this.userSelected.id + '/configs';
    this.http.get<Config[]>(urlWithId, this.httpOptions).subscribe((configList) => {
      this.configs$.next(configList);
    });
  }

  addConfig(config: Config): void {
    const urlWithId = this.userUrl + '/' + this.userSelected.id + '/configs';
    this.http.post<Config>(urlWithId, config, this.httpOptions).subscribe(() => this.retrieveConfigs())
  }

  setSelectedConfig(config: Config) {
    const urlWithId = this.userUrl + '/' + this.userSelected.id + '/configs/' + config.id;
    this.http.get<Config>(urlWithId, this.httpOptions).subscribe(config => {
      localStorage.setItem(UserService.CONFIG, JSON.stringify(config));
      this.configSelected$.next(config);
    });
  }

  deleteConfig(config: Config) {
    const urlWithId = this.userUrl + '/' + this.userSelected.id + '/configs/' + config.id;
    this.http.delete<Config>(urlWithId, this.httpOptions).subscribe(() => this.retrieveConfigs())
    localStorage.removeItem(UserService.CONFIG)
  }
}
