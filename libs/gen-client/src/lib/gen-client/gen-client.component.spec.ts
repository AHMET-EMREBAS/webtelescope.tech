import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GenClientComponent } from './gen-client.component';

describe('GenClientComponent', () => {
  let component: GenClientComponent;
  let fixture: ComponentFixture<GenClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenClientComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GenClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
