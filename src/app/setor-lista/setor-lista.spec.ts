import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SetorLista } from './setor-lista';

describe('SetorLista', () => {
  let component: SetorLista;
  let fixture: ComponentFixture<SetorLista>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetorLista],
    }).compileComponents();

    fixture = TestBed.createComponent(SetorLista);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
