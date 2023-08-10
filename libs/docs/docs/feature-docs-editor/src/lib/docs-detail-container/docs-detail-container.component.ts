import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DocsDetailComponentStore} from "./docs-detail-container.store";

@Component({
  selector: 'docs-detail-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './docs-detail-container.component.html',
  styleUrls: ['./docs-detail-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DocsDetailComponentStore]
})
export class DocsDetailContainerComponent {}
