import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonFormFieldComponent } from './common-form-field.component';

describe('CommonFormFieldComponent', () => {
  let component: CommonFormFieldComponent;
  let fixture: ComponentFixture<CommonFormFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonFormFieldComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CommonFormFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
