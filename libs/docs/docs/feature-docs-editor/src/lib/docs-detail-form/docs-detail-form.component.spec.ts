import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DocsDetailFormComponent } from './docs-detail-form.component';

describe('DocsDetailFormComponent', () => {
  let component: DocsDetailFormComponent;
  let fixture: ComponentFixture<DocsDetailFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocsDetailFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DocsDetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
