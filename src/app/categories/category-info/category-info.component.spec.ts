import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryInfoComponent } from './category-info.component';

describe('CategoryInfoComponent', () => {
  let component: CategoryInfoComponent;
  let fixture: ComponentFixture<CategoryInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoryInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
