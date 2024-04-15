import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoClientComponent } from './todo-client.component';

describe('TodoClientComponent', () => {
  let component: TodoClientComponent;
  let fixture: ComponentFixture<TodoClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoClientComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
