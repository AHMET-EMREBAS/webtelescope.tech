import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WebNavigationComponent } from './web-navigation.component';

describe('WebNavigationComponent', () => {
  let component: WebNavigationComponent;
  let fixture: ComponentFixture<WebNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebNavigationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WebNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
