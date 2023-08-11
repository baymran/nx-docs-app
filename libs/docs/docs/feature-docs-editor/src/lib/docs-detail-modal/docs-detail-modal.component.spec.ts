import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DocsDetailModalComponent } from './docs-detail-modal.component';

describe('DocsDetailModalComponent', () => {
  let component: DocsDetailModalComponent;
  let fixture: ComponentFixture<DocsDetailModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocsDetailModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DocsDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
