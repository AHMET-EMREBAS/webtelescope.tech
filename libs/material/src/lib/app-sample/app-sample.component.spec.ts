import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserTestingModule } from '@angular/platform-browser/testing';
import { AppSampleComponent } from './app-sample.component';

describe('AppSampleComponent', () => {
  let component: AppSampleComponent;
  let fixture: ComponentFixture<AppSampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppSampleComponent, BrowserTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AppSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
