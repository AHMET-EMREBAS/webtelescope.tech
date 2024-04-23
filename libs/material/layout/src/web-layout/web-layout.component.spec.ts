import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WebLayoutComponent } from './web-layout.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('WebLayoutComponent', () => {
  let component: WebLayoutComponent;
  let fixture: ComponentFixture<WebLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebLayoutComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(WebLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
