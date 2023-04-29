import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditDialogComponent } from './edit-dialog.component';
import { MatFormField } from '@angular/material/form-field';

describe('EditDialogComponent', () => {
  let component: EditDialogComponent;
  let fixture: ComponentFixture<EditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDialogComponent ],
      imports: [MatFormField],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: { question: 'Question', answer: 'Answer' } }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the EditDialogComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should render the passed data', () => {
    fixture.detectChanges();
    const questionEl = fixture.nativeElement.querySelector('.question');
    const answerEl = fixture.nativeElement.querySelector('.answer');
    expect(questionEl.textContent).toContain(component.data.question);
    expect(answerEl.textContent).toContain(component.data.answer);
  });

  it('should close the dialog when onNoClick is called', () => {
    spyOn(component.dialogRef, 'close').and.callThrough();
    component.onNoClick();
    expect(component.dialogRef.close).toHaveBeenCalled();
  });
});
