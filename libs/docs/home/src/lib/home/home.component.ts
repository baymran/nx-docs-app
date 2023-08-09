import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DocsTableContainerComponent} from "@docs/feature-docs-list";

@Component({
  selector: 'documents-home',
  standalone: true,
  imports: [CommonModule, DocsTableContainerComponent],
  template: `<docs-table-container></docs-table-container>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
