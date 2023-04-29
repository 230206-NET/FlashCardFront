import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../api.service';
import { DialogComponent } from '../dialog/dialog.component';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { FeedComponent } from './feed.component';
import { Flashcard } from '../models/flashcard';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('FeedComponent', () => {
  let component: FeedComponent;
  let fixture: ComponentFixture<FeedComponent>;
  let apiService: ApiService;
  let dialog: MatDialog;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedComponent ],
      imports: [ MatCardModule, MatDialogModule, HttpClientTestingModule],
      providers: [ ApiService, MatDialog ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    dialog = TestBed.inject(MatDialog);
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call getAllPosts method of ApiService', () => {
      spyOn(apiService, 'getAllPosts').and.returnValue(of([]));
      component.ngOnInit();
      expect(apiService.getAllPosts).toHaveBeenCalled();
    });
  });

  describe('toggleView', () => {
    it('should toggle tableMode', () => {
      component.toggleView();
      expect(component.tableMode).toBeTruthy();
      component.toggleView();
      expect(component.tableMode).toBeFalsy();
    });
  });

  describe('getCardByID', () => {
    it('should return a flashcard object with the specified id', () => {
      const testId = 1;
      const testCard = {id: testId, answer: 'test answer', question: 'test question'};
      component.cardList = [testCard];
      expect(component.getCardByID(testId)).toEqual(testCard);
    });
  });

  describe('openDialog', () => {
    it('should call createCard method of ApiService', () => {
      spyOn(apiService, 'createCard').and.returnValue(of({} as Flashcard));
      // spyOn(dialog, 'open').and.returnValue();
      component.openDialog();
      expect(apiService.createCard).toHaveBeenCalled();
    });
  });

  describe('editDialog', () => {
    it('should call editCard method of ApiService', () => {
      const testId = 1;
      const testCard = {id: testId, answer: 'test answer', question: 'test question'};
      component.cardList = [testCard];
      spyOn(apiService, 'editCard').and.returnValue(of({} as Flashcard));
     // spyOn(dialog, 'open').and.returnValue({afterClosed: () => of({answer: 'test answer edited', question: 'test question edited', id: 0} as Flashcard)});
      component.editDialog(testId);
      expect(apiService.editCard).toHaveBeenCalled();
    });
  });

  describe('deleteCard', () => {
    it('should call deleteCard method of ApiService', () => {
      const testId = 1;
      spyOn(apiService, 'deleteCard').and.returnValue(of({} as boolean));
      spyOn(component, 'getCardByID').and.returnValue({id: testId, answer: 'test answer', question: 'test question'});
      component.deleteCard(testId);
      expect(apiService.deleteCard).toHaveBeenCalled();
    });
  });

});


