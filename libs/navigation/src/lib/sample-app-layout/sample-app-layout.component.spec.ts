import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SampleAppLayoutComponent } from './sample-app-layout.component';

describe('SampleAppLayoutComponent', () => {
  let component: SampleAppLayoutComponent;
  let fixture: ComponentFixture<SampleAppLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SampleAppLayoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SampleAppLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
