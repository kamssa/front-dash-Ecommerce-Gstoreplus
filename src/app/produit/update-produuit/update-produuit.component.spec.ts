import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProduuitComponent } from './update-produuit.component';

describe('UpdateProduuitComponent', () => {
  let component: UpdateProduuitComponent;
  let fixture: ComponentFixture<UpdateProduuitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateProduuitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProduuitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
