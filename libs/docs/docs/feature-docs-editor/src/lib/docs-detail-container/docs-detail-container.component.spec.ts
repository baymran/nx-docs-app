import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DocsDetailContainerComponent } from './docs-detail-container.component';

describe('DocsDetailContainerComponent', () => {
  let component: DocsDetailContainerComponent;
  let fixture: ComponentFixture<DocsDetailContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocsDetailContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DocsDetailContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
