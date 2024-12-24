import { FormsModule } from '@angular/forms';
import { UserService } from './../services/user.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LeafComponent } from '../leaf/leaf.component';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [FormsModule, LeafComponent],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
  export class SignInComponent {

    user = {
      phone: '',
      fullName: '',
      password:'',
      gender: ''
    }

    verifyPassword: string = ''

    veryfyPasswordMatch(): boolean {
      return this.user.password === this.verifyPassword
    }

    constructor( private UserService: UserService, private router: Router){}

    cadastrar(): void {
      this.UserService.createUser(this.user).subscribe(
        (response: any) => {
          console.log(response);
          this.router.navigateByUrl('/logIn')
        },
        (error: any) => {
          console.log(error);
        }
      )
    }
}