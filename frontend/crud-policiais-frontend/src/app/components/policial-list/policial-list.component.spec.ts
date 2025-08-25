import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicialListComponent } from './policial-list.component';

describe('PolicialListComponent', () => {
  let component: PolicialListComponent;
  let fixture: ComponentFixture<PolicialListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PolicialListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PolicialListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
