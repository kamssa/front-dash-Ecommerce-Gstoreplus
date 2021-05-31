import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCategorieComponent } from './modal-categorie.component';

describe('ModalCategorieComponent', () => {
  let component: ModalCategorieComponent;
  let fixture: ComponentFixture<ModalCategorieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCategorieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
