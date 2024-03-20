import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginWithCodeComponent } from './login-with-code.component';

describe('LoginWithCodeComponent', () => {
  let component: LoginWithCodeComponent;
  let fixture: ComponentFixture<LoginWithCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginWithCodeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginWithCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
