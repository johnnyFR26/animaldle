import { UserService } from './../services/user.service';
import { AfterViewInit, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
  export class LogInComponent implements AfterViewInit {

    constructor(private UserService: UserService) {}

    users = []

    ngOnInit(): void {
      this.loadUsers()
    }

    loadUsers(): void {
      this.UserService.getUsers().subscribe(
        (users: any) => {
          this.users = users;
          console.table(users)
        },
        (error: any) => {
          console.log('Error loading clients:', error);
        }
      );
    }

    cadastrar(): void{
      console.log('CLICADO')
    }
  
    private ctx!: CanvasRenderingContext2D;
    private width: number = window.innerWidth;
    private height: number = window.innerHeight;
    private items: Item[] = [];
  
    private rand(m: number, M: number): number {
      return Math.random() * (M - m) + m;
    }
  
    ngAfterViewInit(): void {
      const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
      this.ctx = canvas.getContext('2d')!;
      canvas.width = this.width;
      canvas.height = this.height;
  
      for (let i = 0; i < 65; i++) this.items.push(new Item(this.rand, this.width, this.height));
  
      this.loop();
    }
  
    private loop(): void {
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.items.forEach(item => item.move(this.ctx));
      requestAnimationFrame(() => this.loop());
    }
  }
  
  class Item {
    private x: number = 0;
    private y: number = 0;
    private angle: number = 0;
    private speed: number = 0;
    private IMG: HTMLImageElement;
    private readonly h: number = 32;
    private readonly w: number = 32;
  
    constructor(private rand: (m: number, M: number) => number, width: number, height: number) {
      this.IMG = new Image();
      this.IMG.src = '../../assets/public/foia.png';
      this.start(width, height);
    }
  
    private start(width: number, height: number): void {
      this.x = this.rand(0, width - this.w / 2);
      this.y = this.rand(0, height);
      this.angle = this.rand(0, Math.PI * 2);
      this.speed = this.rand(0.01, 0.1);
    }
  
    public move(ctx: CanvasRenderingContext2D): void {
      if (this.y < -this.h - this.IMG.height) {
        this.start(ctx.canvas.width, ctx.canvas.height);
        this.y = ctx.canvas.height + this.IMG.height;
      }
      this.y -= this.speed / 0.1;
      this.angle = Math.cos(this.y / 20);
  
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.drawImage(this.IMG, -this.w / 2, -this.h / 2);
      ctx.restore();
    }
  
}
