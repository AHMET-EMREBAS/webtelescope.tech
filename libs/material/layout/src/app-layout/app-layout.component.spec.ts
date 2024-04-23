import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppLayoutComponent } from './app-layout.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
describe('AppLayoutComponent', () => {
  let component: AppLayoutComponent;
  let fixture: ComponentFixture<AppLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [],
      imports: [AppLayoutComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AppLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
