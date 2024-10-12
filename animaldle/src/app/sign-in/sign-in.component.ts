import { UserService } from './../services/user.service';
import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
  export class SignInComponent implements AfterViewInit {

    user = {
      phone: '',
      name: '',
      password:'',
      gender: ''
    }

    constructor( private UserService: UserService){}
  
    private ctx!: CanvasRenderingContext2D;
  private width: number = window.innerWidth;
  private height: number = window.innerHeight;
  private colunas: number = 0;
  private linhas: number = 0;
  private items: Item[] = [];

  private rand(m: number, M: number): number {
    return Math.random() * (M - m) + m;
  }

  ngAfterViewInit(): void {
    const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
    this.ctx = canvas.getContext('2d')!;
    const TempItem = new Item(this.rand, this.width, this.height,0);
    this.colunas = Math.floor(this.width*1.5/Item.w);
    this.linhas = Math.floor(this.height/(Item.h*this.colunas))*2;
    canvas.width = this.width;
    canvas.height = this.height;

    for (let i = 0; i < this.colunas * this.linhas; i++) this.items.push(new Item(this.rand, this.width, this.height,this.colunas));

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
  private static currentImage: number = 0;
  private static previousWidth: number = 1;
  private static previousHeight: number =1;
  public static h: number = 0;
  public static w: number = 0;

  constructor(private rand: (m: number, M: number) => number, width: number, height: number, colunas: number) {
    this.IMG = new Image();
    this.IMG.src = '../../assets/public/foia.png';
    Item.w = 3000*(width/1536)*0.07;
    Item.h = 3000*(width/1536)*0.07/4;
    this.start(width, height, colunas);
  }

  private start(width: number, height: number,colunas: number): void {
    Item.currentImage++;
    if((Item.currentImage)%colunas==0){
      this.x = Item.w;
      this.y = Item.previousHeight - Item.h;
    }
    else{
      this.x = Item.previousWidth+Item.w;
      this.y = Item.previousHeight+Item.h;
    }
    Item.previousHeight = this.y;
    Item.previousWidth = this.x;
    this.angle = this.rand(0, Math.PI * 2);
    this.speed = 0.1;
  }

  public move(ctx: CanvasRenderingContext2D): void {
    if (this.y < -Item.h*2) {
      this.y = ctx.canvas.height + Item.h*2;
    }if (this.x < 0) {
      this.x = ctx.canvas.width + Item.w*2;
    }
    this.y -= this.speed / 0.1;
    this.x -= this.speed / 0.1;
    this.angle = Math.cos(this.y / 20);
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.translate(-this.IMG.width*(ctx.canvas.width/1536)*0.07/2, -this.IMG.height*(ctx.canvas.width/1536)*0.07/2);
    ctx.drawImage(this.IMG, -Item.w / 2, -Item.h / 2, this.IMG.height*(ctx.canvas.width/1536)*0.07, this.IMG.width*(ctx.canvas.width/1536)*0.07);
    ctx.restore();
  }
  
  }
  