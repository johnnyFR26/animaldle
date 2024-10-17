import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CanvasService {
  private ctx!: CanvasRenderingContext2D;
  private width: number = window.innerWidth;
  private height: number = window.innerHeight;
  private colunas: number = 0;
  private linhas: number = 0;
  private items: Item[] = [];

    constructor() {}

    public initializeCanvas(canvasId: string): void {
        console.log('Initializing canvas...');
        const canvas = window.document.getElementById(canvasId) as HTMLCanvasElement;
        this.ctx = canvas.getContext('2d')!;
        this.setCanvasSize(canvas);
        this.generateItems();
        this.loop();
    }

    private setCanvasSize(canvas: HTMLCanvasElement): void {
        this.colunas = Math.floor(this.width*1.8/(Item.w*2));
        this.linhas = Math.floor(this.height*1.5/(Item.h*2));
        canvas.width = this.width;
        canvas.height = this.height;
      }

      private generateItems(): void {
        for (let i = 0; i < this.colunas * this.linhas; i++) {
          this.items.push(new Item(this.rand, this.width, this.height, this.colunas));
        }
      }
  
    private rand(m: number, M: number): number {
      return Math.random() * (M - m) + m;
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
    private anglespeed: number = 0;
    private speed: number = 0;
    private IMG: HTMLImageElement;
    private static currentImage: number = 0;
    private static previousWidth: number = 1;
    private static previousHeight: number = 1;
    public static h: number = 0;
    public static w: number = 0;
  
    constructor(private rand: (m: number, M: number) => number, width: number, height: number, colunas: number) {
      this.IMG = new Image();
      this.IMG.src = '../../assets/public/foia'+Math.round(rand(0.5,4.5))+'.png';
      Item.w = 210*(width/1536);
      Item.h = 210*(width/1536)/4/1.5;
      this.start(width, height, colunas);
    }
  
    private start(width: number, height: number,colunas: number): void {
      Item.currentImage++;
      if((Item.currentImage)%colunas==0){
        this.x = Item.w;
        this.y = Item.previousHeight + Item.h*2;
      }
      else{
        this.x = Item.previousWidth+Item.w*2;
        this.y = Item.previousHeight;
      }
      Item.previousHeight = this.y;
      Item.previousWidth = this.x;
      this.angle = this.rand(0, Math.PI * 2);
      this.speed = this.rand(0.05, 0.15);
    }
  
    public move(ctx: CanvasRenderingContext2D): void {
      if (this.y < -Item.h*8) {
        this.y = ctx.canvas.height + Item.h*8;
      }if (this.x < -Item.w*2) {
        this.x = ctx.canvas.width + Item.w*2;
      }
      this.y -= this.speed / 0.1;
      this.x -= this.speed / 0.1;
      this.anglespeed -= 1;
      this.angle += Math.cos(this.anglespeed / 50)/250;
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.translate(-this.IMG.width*(ctx.canvas.width/1536)/2, -this.IMG.height*(ctx.canvas.width/1536)/2);
      ctx.drawImage(this.IMG, -Item.w / 2, -Item.h / 2, this.IMG.height*(ctx.canvas.width/1536), this.IMG.width*(ctx.canvas.width/1536));
      ctx.restore();
    }
  
  }