import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {DocumentsListComponentStore} from "./docs-table-container.store";
import {LetDirective} from "@ngrx/component";
import {DocsTableComponent} from "../docs-table/docs-table.component";
import {Router} from "@angular/router";

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
  private router = inject(Router);
  public readonly docs$ = this.componentStore.docs$;
  public readonly status$ = this.componentStore.status$;

  public redirectToEditor(id: number) {
    this.router.navigate(['/documents', id])
  }
}