import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCadastros } from './lista-cadastros';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('ListaCadastros', () => {
  let component: ListaCadastros;
  let fixture: ComponentFixture<ListaCadastros>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaCadastros]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaCadastros);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
