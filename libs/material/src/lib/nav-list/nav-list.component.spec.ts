import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WtNavListComponent } from './nav-list.component';

describe('NavListComponent', () => {
  let component: WtNavListComponent;
  let fixture: ComponentFixture<WtNavListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WtNavListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WtNavListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
