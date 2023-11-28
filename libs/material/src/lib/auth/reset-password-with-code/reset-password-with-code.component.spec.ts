import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResetPasswordWithCodeComponent } from './reset-password-with-code.component';

describe('ResetPasswordWithCodeComponent', () => {
  let component: ResetPasswordWithCodeComponent;
  let fixture: ComponentFixture<ResetPasswordWithCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResetPasswordWithCodeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ResetPasswordWithCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
