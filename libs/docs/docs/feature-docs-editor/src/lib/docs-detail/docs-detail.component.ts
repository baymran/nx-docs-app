import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'docs-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './docs-detail.component.html',
  styleUrls: ['./docs-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsDetailComponent {}
