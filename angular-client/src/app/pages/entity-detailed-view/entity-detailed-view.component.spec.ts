import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityDetailedViewComponent } from './entity-detailed-view.component';

describe('EntityDetailedViewComponent', () => {
  let component: EntityDetailedViewComponent;
  let fixture: ComponentFixture<EntityDetailedViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntityDetailedViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntityDetailedViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
