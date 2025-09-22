import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetrolDispensingRecordComponent } from './petrol-dispensing-record.component';

describe('PetrolDispensingRecordComponent', () => {
  let component: PetrolDispensingRecordComponent;
  let fixture: ComponentFixture<PetrolDispensingRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetrolDispensingRecordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetrolDispensingRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
