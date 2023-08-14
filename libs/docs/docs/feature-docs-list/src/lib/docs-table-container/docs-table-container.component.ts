import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DocumentsListComponentStore} from "./docs-table-container.store";
import {LetDirective} from "@ngrx/component";
import {DocsTableComponent} from "../docs-table/docs-table.component";
import {ActivatedRoute, Router, RouterOutlet} from "@angular/router";
import {SearchComponent, SearchForm} from "../search/search.component";
import {MatProgressBarModule} from "@angular/material/progress-bar";

@Component({
  selector: 'docs-table-container',
  standalone: true,
  imports: [CommonModule, LetDirective, DocsTableComponent, RouterOutlet, SearchComponent, MatProgressBarModule],
  templateUrl: './docs-table-container.component.html',
  styleUrls: ['./docs-table-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DocumentsListComponentStore]
})
export class DocsTableContainerComponent {
  private readonly componentStore = inject(DocumentsListComponentStore);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  public readonly docs$ = this.componentStore.filteredDocs$;
  public readonly status$ = this.componentStore.status$;
  public readonly organizations$ = this.componentStore.organizations$;
  public readonly docTypes$ = this.componentStore.documentTypes$;

  onSearch(form: SearchForm) {
    this.componentStore.patchSearchFormField(form)
  }

  public redirectToEditor(id: number | 'new') {
    this.router.navigate(['', {outlets: {detail: [id]}}], {relativeTo: this.route.parent});
  }

  public removeDocument(id: number) {
    this.componentStore.removeDocument(id);
  }
}
