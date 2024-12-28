import { UserService } from './../services/user.service';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LeafComponent } from '../leaf/leaf.component';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [RouterLink, FormsModule, LeafComponent],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
  export class LogInComponent{

    constructor(private UserService: UserService, private router: Router) {}

    users = []
    user = {
      phone: '',
      password: ''
    }

    loadUsers(): void {
      this.UserService.login(this.user).subscribe(
        (users: any) => {
          this.setUserToLocalStorage(users)
          this.router.navigateByUrl('/game')
        },
        (error: any) => {
          console.log('Invalid credentials:', error);
        }
      );
    }

    setUserToLocalStorage(user: any): void {
      const userData = {
        name: user.user.fullName,
        id: user.user.id,
        token: user.token.token
      }
      localStorage.setItem('token', JSON.stringify(userData));
    }  
}