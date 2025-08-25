import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicialFormComponent } from './policial-form.component';

describe('PolicialFormComponent', () => {
  let component: PolicialFormComponent;
  let fixture: ComponentFixture<PolicialFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PolicialFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PolicialFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
