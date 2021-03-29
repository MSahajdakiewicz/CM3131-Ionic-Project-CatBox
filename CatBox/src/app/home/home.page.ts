import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

  //--------------------------------------------------------

export class HomePage {

  email = ""
  password = ""
  error = false
  errorMsg = ""
 
  //--------------------------------------------------------

  constructor(private storage: Storage, private router: Router) { }

  //--------------------------------------------------------

  login() {

    this.storage.get('user').then((user) => {
      //---console.log(user);
      if (user) {
        if (user.email == this.email && user.password == this.password) {
          this.email = ""
          this.password = ""
          this.error = false;
          this.router.navigate(['/dashboard'])
        }

        else {
          this.email = ""
          this.password = ""

          this.error = true;
          this.errorMsg = "Invalid email or password"
        }
      } 
      
      else {
        this.error = true;
        this.errorMsg = "No account found. Register first!"
      }
    });
  }


}
