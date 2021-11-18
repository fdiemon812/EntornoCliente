import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnopruebaComponent } from './alumnoprueba.component';

describe('AlumnopruebaComponent', () => {
  let component: AlumnopruebaComponent;
  let fixture: ComponentFixture<AlumnopruebaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlumnopruebaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumnopruebaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
