import { GameService } from './../services/game.service';
import { Component, computed, effect, signal, WritableSignal } from '@angular/core';
import { AnimalService } from '../services/animal.service';
import { FormsModule } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { Animal } from '../models/Animal.model';
import { Game } from '../models/Game.model';
import { StorageUser } from '../lib/getLocalStorageUser';
import { LeafComponent } from '../leaf/leaf.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [FormsModule, LeafComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {

  constructor(private AnimalService: AnimalService, private GameService: GameService) {
    effect(() => console.log('atualizado', this.gameTip()));
  }

  animals: Animal[] = []
  animalGuessed: WritableSignal<Animal[]> = signal([])
  guess: string = ''
  animalRand!: Animal
  win: boolean = false
  howToPlay:boolean=false
  tela:number=1
  gameTip: WritableSignal<number> = signal(0)
  addGameTip = computed(() => this.gameTip() + 1)

  ngOnInit(): void {
    this.howToPlay=true
    this.loadAnimals()
  }

  changeScreen():void{
    this.tela++;
    if(this.tela==5){
      this.howToPlay=false;
    }
  }

  //funcionalidade de ajuda, escuta o signal do gameTip, se igual a 1 ele mostra a quantidade de letras no nome do animal em underlines
  gameTips():void{
    this.animalRand.name.length
    if(this.gameTip()==1){
      this.animalRand.name.split('').map((letter) => {
        console.log(letter);
        return `<span class="underline">${letter}</span>`
      })}
  }


  /**
   * Generate a Game object based on the given Animal, with the user id
   * obtained from local storage and a random id.
   *
   * @param animal The Animal that was guessed.
   * @returns A Game object with the user id, animal id and a random id.
   */
  generateGameLog(animal: Animal): Game {
    const userId = StorageUser().id
    const animalId = animal.id
    const id = uuidv4()
    const game = {
      id,
      userId,
      animalId
    }
    return game
  }

  /**
   * Creates a new game log in the database based on the given game object.
   * This is called when the user guesses an animal correctly.
   *
   * @param game The game log to be created, with the user id, animal id and a random id.
   */
  createGame(game: Game): void {
    this.GameService.createGame(game).subscribe(
      (game: any) => {
        return game
      },
      (error: any) => {
        console.log('Invalid credentials:', error);
      }
    );
  }
  
/**
 * Loads a list of animals from the AnimalService, sorts them by name, 
 * and stores them in the component's `animals` property. 
 * It also triggers the `randomAnimal` function after loading.
 * Logs an error message to the console if the request fails.
 */
  loadAnimals(): void {
    this.AnimalService.getAnimals().subscribe(
      (animals: any) => {
        this.animals = animals.sort((a: Animal, b: Animal) => {
          if (a.name < b.name) {
            return -1;
          } else if (a.name > b.name) {
            return 1;
          } else {
            return 0;
          }
        });
        this.randomAnimal()
      },
      (error: any) => {
        console.log('Invalid credentials:', error);
      }
    );
  }

  randomAnimal(): void {
    this.animalRand = this.animals[Math.ceil(Math.random()*this.animals.length)];
    console.log(this.animalRand);
    this.animalGuessed.set([]);
    this.win = false;
  }

  winGame(): void {
    const game = this.generateGameLog(this.animalRand)
    this.createGame(game)
    this.win = true
    this.animalGuessed.set([]);
  }

  searchAnimals(guess:string): any[] {
    return this.animals.filter((animal: any) => animal.name.toLowerCase().includes(guess.toLowerCase()))
  }

  /**
   * This function is called when the user guesses an animal.
   * It verifies all the characteristics of the guessed animal against
   * the animal randomly chosen by the component, and stores the result
   * in the `animalGuessed` property.
   * If the guessed animal is the same as the randomly chosen animal,
   * it sets the `win` property to true.
   * @param animal The animal guessed by the user.
   */
  guessAnimal(animal: Animal): void {
    let verified = {
      ...animal,
      status: {
        name: this.verifyCharacteristic(animal,'name'),
        habitat: this.verifyCharacteristic(animal,'characteristics.Habitat'),
        filo: this.verifyCharacteristic(animal,'characteristics.Filo'),
        conservacao: this.verifyCharacteristic(animal,'characteristics.Estado de conservação'),
        dieta: this.verifyCharacteristic(animal,'characteristics.Dieta'),
        reproducao: this.verifyCharacteristic(animal,'characteristics.Método de reprodução'),
        classe: this.verifyCharacteristic(animal,'characteristics.Classe')

      }
    }
    this.animalGuessed.set([verified, ...this.animalGuessed()]);
    this.guess = '';
    if(animal.name == this.animalRand.name)
      this.winGame()
  }

  getCharacteristic(animal : Animal ,type:string) :string {
    const types = type.split('.')
    let value: any = animal;

    for (let key of types) {
      value = value[key];
    }

    return value;
  }

  randCharacteristic(animal : Object ,type:string) :string {
    const types = type.split('.')
    let value: any = animal;

    for (let key of types) {
      value = value[key];
    }

    return value;
  }

  verifyCharacteristic(animal : Object ,type: string): string {
    const types = type.split('.')
    let guessed: any = animal;
    let random: any = this.animalRand;

  for (let key of types) {
    guessed = guessed[key];
    random = random[key];
  }
  guessed = guessed.toLowerCase();
  random = random.toLowerCase();
    if(guessed == random){
      return "certo";
    } else {
      let guessWords = guessed.split(" ");
      let randomWords = random.split(" ");
      let bool = false;
      for(let i = 0; i < guessWords.length;i++){
        for(let j = 0; j < randomWords.length;j++){
          if (randomWords[j].includes(guessWords[i]) && guessWords[i].length > 2){
            bool = true;
          }
        }
      }
      if (bool){
        return "meio";
      }
      else{
        return "errado";
      }
    }
  }
}