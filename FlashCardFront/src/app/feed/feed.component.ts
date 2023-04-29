import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Flashcard } from '../models/flashcard';
import {MatCardModule, MatCard} from '@angular/material/card';
import { ApiService } from '../api.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';


@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit{
  cardList: Flashcard[] = [];
  tableMode = false;
  answer: string ="";
  question: string ="";

  constructor(private service: ApiService, public dialog: MatDialog){

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      var card = {} as Flashcard;
      card.answer = result.answer;
      card.question = result.question;
      card.id = 0;

      this.service.createCard(card).subscribe((data: any) => {
        this.service.getAllPosts().subscribe((data: any) =>{
          this.cardList = data;
        })
      });
    });

  }

  editDialog(id: number): void {
    var initCard = this.getCardByID(id);
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '250px',
      data: {answer: initCard.answer, question: initCard.question}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      var card = {} as Flashcard;
      card.answer = result.answer;
      card.question = result.question;
      card.id = initCard.id;

      this.service.editCard(card).subscribe((data: any) => {
        this.service.getAllPosts().subscribe((data: any) =>{
          this.cardList = data;
        })
      });
    });

  }


  ngOnInit(): void {
    this.service.getAllPosts().subscribe((data: any) => {
      console.log(data);
      this.cardList = data;
    });
    //this.service.getAllCards();   
  }

 

  toggleView(){
    this.tableMode = !this.tableMode;
  }

  deleteCard(id: number){
    this.service.deleteCard(id).subscribe(data =>{
      console.log(data);
      this.service.getAllPosts().subscribe((data: any) =>{
        this.cardList = data;
      })
    })
  }

  getCardByID(id: number): Flashcard{
    var returnCard = {} as Flashcard;
    this.cardList.forEach(f =>{
      if(f.id == id){
        returnCard = f;
      }
    });
    return returnCard;
  }



}
