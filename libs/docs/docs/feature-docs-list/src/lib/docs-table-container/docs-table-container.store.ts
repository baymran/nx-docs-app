import {inject, Injectable} from "@angular/core";
import {ComponentStore} from "@ngrx/component-store";
import {DeepReadonly} from "@core/utils";
import {DocumentVm} from "../../../../document-vm";
import {DocsFacade} from "@docs/data-access";
import {Observable, tap} from "rxjs";
import {DocumentEntity, LoadingStatus} from "@core/data-access";
import {docsVMAdapter} from "../../../../docs-vm.adapter";

type DocsListState = {
  docs: DocumentVm[]
}

const initialState: DocsListState = {
  docs: []
}

@Injectable()
export class DocumentsListComponentStore extends ComponentStore<DocsListState> {
  private readonly docsFacade = inject(DocsFacade);
  public readonly docs$ = this.select(({docs}) => docs)
  public readonly status$: Observable<LoadingStatus> = this.select(this.docsFacade.status$, status => status)

  constructor() {
    super(initialState);
    this.docsFacade.init();
    this.setDocsFromGlobalToLocalStore();
  }

  private setDocsFromGlobalToLocalStore(): void {
    this.effect(
      () => this.docsFacade.allDocs$.pipe(
        tap((docs: DocumentEntity[]) => this.patchDocs(docs))
      )
    )
  }

  private patchDocs(docs: DocumentEntity[]): void {
    this.patchState({
      docs: docs.map(
        document => docsVMAdapter.entityToVM(document)
      )
    })
  }
}
