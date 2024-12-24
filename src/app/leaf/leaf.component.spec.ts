import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeafComponent } from './leaf.component';

describe('LeafComponent', () => {
  let component: LeafComponent;
  let fixture: ComponentFixture<LeafComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeafComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LeafComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
