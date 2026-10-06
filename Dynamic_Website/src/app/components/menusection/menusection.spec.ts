import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Menusection } from './menusection';

describe('Menusection', () => {
  let component: Menusection;
  let fixture: ComponentFixture<Menusection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Menusection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Menusection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
