import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DocsTableContainerComponent } from './docs-table-container.component';

describe('DocsTableContainerComponent', () => {
  let component: DocsTableContainerComponent;
  let fixture: ComponentFixture<DocsTableContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocsTableContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DocsTableContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
