import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DispensingFormComponent } from './dispensing-form.component';

describe('DispensingFormComponent', () => {
  let component: DispensingFormComponent;
  let fixture: ComponentFixture<DispensingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DispensingFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DispensingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
