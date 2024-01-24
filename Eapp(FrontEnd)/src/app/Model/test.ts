//
// import {Observable, of} from "rxjs";
// import {catchError, switchMap} from "rxjs/operators";
//
// export class Test {
//   User :User=new User();
//   msg="";
//   isLoggedin = false;
// // Key for storing authentication information in localStorage
// private readonly AUTH_KEY = 'auth_token';
//
// constructor(private servicelogin:LoginService,private  router:Router) {
//   const storedToken = localStorage.getItem(this.AUTH_KEY);
//   this.isLoggedin = !!storedToken;
//
// }
//
// loginUser() {
//   this.servicelogin.registration(this.User).subscribe(data=> {
//     console.log("response recieved ");
//     this.isLoggedin=true;
//     console.log("true")
//     localStorage.setItem(this.AUTH_KEY, 'token_user_info');
//     this.router.navigate(['/products']);
//
//     this.servicelogin.setUser(data);
//   }, error=> {
//     console.error("exception occured",error);
//     this.msg ="Bad credentials ,please enter valid email and password";
//   })
// }
//
//  protected readonly onsubmit = onsubmit;
//
// onSubmit() {
//   this.router.navigate(['clients/addClient']);
// }
// isLoggedIn(): boolean {
//   return this.servicelogin.isLoggedIn();
//   }
//
// }
