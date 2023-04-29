import { Component, Input } from '@angular/core';
import { Flashcard } from '../models/flashcard';

@Component({
  selector: 'app-flashcard',
  templateUrl: './flashcard.component.html',
  styleUrls: ['./flashcard.component.css']
})
export class FlashcardComponent {
@Input() cardData!: Flashcard;
questionUp = true;



flipCard(){
  this.questionUp = !this.questionUp;
}



}
