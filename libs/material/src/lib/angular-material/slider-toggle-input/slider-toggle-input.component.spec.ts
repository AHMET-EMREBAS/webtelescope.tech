import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SliderToggleInputComponent } from './slider-toggle-input.component';

describe('SliderToggleInputComponent', () => {
  let component: SliderToggleInputComponent;
  let fixture: ComponentFixture<SliderToggleInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SliderToggleInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SliderToggleInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
