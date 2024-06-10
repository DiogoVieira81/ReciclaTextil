import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePointsDonorComponent } from './change-points-donor.component';

describe('ChangePointsDonorComponent', () => {
  let component: ChangePointsDonorComponent;
  let fixture: ComponentFixture<ChangePointsDonorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangePointsDonorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChangePointsDonorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
