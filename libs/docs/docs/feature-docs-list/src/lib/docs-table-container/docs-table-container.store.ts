import {inject, Injectable} from "@angular/core";
import {ComponentStore} from "@ngrx/component-store";
import {DocumentVm} from "../../../../document-vm";
import {DocsFacade} from "@docs/data-access";
import {catchError, map, Observable, of, switchMap, tap} from "rxjs";
import {
  DocTypesList,
  DocTypesListDTO,
  DocumentEntity,
  LoadingStatus,
  OrganizationsList,
  OrganizationsListDTO
} from "@core/data-access";
import {docsVMAdapter} from "../../../../docs-vm.adapter";
import {SearchForm} from "@docs/feature-docs-list";
import {ApiService} from "@core/http";

type DocsListState = {
  docs: DocumentVm[],
  searchForm: SearchForm;
  organizations: OrganizationsList,
  documentTypes: DocTypesList,
}

const initialState: DocsListState = {
  docs: [],
  searchForm: {
    type: '',
    number: ''
  },
  organizations: [],
  documentTypes: []
}

@Injectable()
export class DocumentsListComponentStore extends ComponentStore<DocsListState> {
  private readonly docsFacade = inject(DocsFacade);
  private readonly apiService = inject(ApiService);
  public readonly docs$ = this.select(({docs}) => docs)
  public readonly status$: Observable<LoadingStatus> = this.select(this.docsFacade.status$, status => status)
  public readonly searchForm$ = this.select(state => state.searchForm);
  public readonly organizations$ = this.select(({organizations}) => organizations);
  public readonly documentTypes$ = this.select(({documentTypes}) => documentTypes);

  public readonly filteredDocs$ = this.searchForm$.pipe(
    switchMap(searchForm =>
      this.docs$.pipe(
        map(docs =>
          docs.filter(doc =>
            (searchForm.number === null || searchForm.number === '' || doc.number.startsWith(searchForm.number)) &&
            (searchForm.type === null || searchForm.type === '' || doc.type.includes(searchForm.type))
          )
        )
      )
    )
  );

  constructor() {
    super(initialState);
    this.docsFacade.init();
    this.setDocsFromGlobalToLocalStore();
    this.fetchOrganizations();
    this.fetchDocTypes();
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

  public removeDocument(id: number) {
    this.docsFacade.removeDocument(id);
  }

  public patchSearchFormField(form: SearchForm) {
    this.patchState({
      searchForm: form
    });
  }

  private fetchOrganizations() {
    this.effect(
      () => this.apiService.get<OrganizationsListDTO>('/organizations/').pipe(
        tap((list) => {
          const organizations = list.map((item) => item.name);
          this.patchState({organizations});
        }),
        catchError((error) => of(error))
      )
    )
  }

  private fetchDocTypes() {
    this.effect(
      () => this.apiService.get<DocTypesListDTO>('/document-types/').pipe(
        tap((list) => {
          const documentTypes = list.map((item) => item.name);
          this.patchState({documentTypes});
        }),
        catchError((error) => of(error))
      )
    )
  }
}
