import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private readonly JWT_TOKEN="JWT_TOKEN";
private loggerUser ?: string;
private isAuthenticateSubject= new BehaviorSubject<boolean>(false);

private http=inject(HttpClient);

constructor(){}


login(user:{
  email:string,password:string   
}):Observable<any>{
return this.http.post('http://localhost:3000/login/users',user).pipe(
  tap((response:any)=>this.doLoginUser(user.email,response.token))
)

}

private doLoginUser(email:string , token:any){
this.loggerUser=email;
this.storeJwtToken(token);
this.isAuthenticateSubject.next(true);
}
private storeJwtToken(jwt:string){
  localStorage.setItem(this.JWT_TOKEN,jwt);
}
loggout():void{
  this.loggerUser=undefined;
  localStorage.removeItem(this.JWT_TOKEN);
this.isAuthenticateSubject.next(false);
  
}
getToken(): string | null {
  return localStorage.getItem('JWT_TOKEN');
}
isAuthenticated(): Observable<boolean> {
  return this.isAuthenticateSubject.asObservable();
}

private hasToken(): boolean {
  return !!localStorage.getItem(this.JWT_TOKEN);
}

getJwtToken(): string | null {
  return localStorage.getItem(this.JWT_TOKEN);
}

getUserIdFromToken(): string | null {
  const token = this.getToken();
  if (!token) return null;

  const payload = JSON.parse(atob(token.split('.')[1]));
  return payload.id;
}
private getTokenExpirationDate(token: string): Date {
  const payload = JSON.parse(atob(token.split('.')[1]));
  const expirationTimestamp = payload.exp * 1000; 
  return new Date(expirationTimestamp);
}
private isTokenExpired(token: string): boolean {
  const expirationDate = this.getTokenExpirationDate(token);
  return expirationDate < new Date();
}

isLoggedIn(){
  const token = this.getJwtToken();
  return !!token && !this.isTokenExpired(token);
}
}
