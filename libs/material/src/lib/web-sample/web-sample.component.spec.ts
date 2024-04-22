import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WebSampleComponent } from './web-sample.component';

describe('WebSampleComponent', () => {
  let component: WebSampleComponent;
  let fixture: ComponentFixture<WebSampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebSampleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WebSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
