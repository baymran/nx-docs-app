import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {DocumentsListComponentStore} from "./docs-table-container.store";
import {LetDirective} from "@ngrx/component";
import {DocsTableComponent} from "../docs-table/docs-table.component";

@Component({
  selector: 'docs-table-container',
  standalone: true,
  imports: [CommonModule, LetDirective, DocsTableComponent],
  templateUrl: './docs-table-container.component.html',
  styleUrls: ['./docs-table-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DocumentsListComponentStore]
})
export class DocsTableContainerComponent {
  private readonly componentStore = inject(DocumentsListComponentStore);
  public readonly docs$ = this.componentStore.docs$;
  public readonly status$ = this.componentStore.status$;
}
