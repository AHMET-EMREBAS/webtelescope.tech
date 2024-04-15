import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SampleWebLayoutComponent } from './sample-web-layout.component';

describe('SampleWebLayoutComponent', () => {
  let component: SampleWebLayoutComponent;
  let fixture: ComponentFixture<SampleWebLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SampleWebLayoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SampleWebLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
