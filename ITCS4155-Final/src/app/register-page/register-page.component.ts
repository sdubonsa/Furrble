import { Component } from '@angular/core';
import * as bcrypt from 'bcryptjs';
@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {

}

const saltRounds = 10;  //  Data processing speed
var password = "456";  // Original Password
var password2 = "456";
bcrypt.hash(password, saltRounds, function(err, hash) { // Salt + Hash
  bcrypt.compare(password2, hash, function(err, result) {  // Compare
    // if passwords match
    if (result) {
          console.log("It matches!")
    }
    // if passwords do not match
    else {
          console.log("Invalid password!");
    }
  });
});