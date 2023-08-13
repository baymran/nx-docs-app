import {DocumentVm} from "../../../../document-vm";
import {DocTypesList, DocTypesListDTO, OrganizationsList, OrganizationsListDTO} from "@core/data-access";
import {ComponentStore} from "@ngrx/component-store";
import {inject, Injectable} from "@angular/core";
import {DocsFacade} from "@docs/data-access";
import {catchError, of, tap} from "rxjs";
import {ApiService} from "@core/http";

type DocsDetailState = {
  document: DocumentVm | null,
  organizations: OrganizationsList | null,
  documentTypes: DocTypesList | null
}

const initialState: DocsDetailState = {
  document: null,
  organizations: null,
  documentTypes: null
}

// "id" | "organization" | "type" | "series" | "number" | "dateOfIssue" | "main" | "archival"

@Injectable()
export class DocsDetailComponentStore extends ComponentStore<DocsDetailState> {
  private readonly docsFacade = inject(DocsFacade);
  private readonly apiService = inject(ApiService);
  public readonly openedDocument$ = this.select(({document}) => document);
  public readonly organizations$ = this.select(({organizations}) => organizations);
  public readonly documentTypes$ = this.select(({documentTypes}) => documentTypes);
  // public readonly docs$ = this.select(({docs}) => docs)
  // public readonly status$: Observable<LoadingStatus> = this.select(this.docsFacade.status$, status => status)

  constructor() {
    super(initialState);
    this.fetchDocument();
    this.setOpenedDocument();
    this.fetchOrganizations();
    this.fetchDocTypes();
  }

  private fetchDocument() {
    this.effect(
      () => this.docsFacade.openedDocument$.pipe(
        tap((document) => {
          if(!document) {
            this.docsFacade.loadDocumentFromUrl()
          }
        })
      )
    )
  }

  private setOpenedDocument(): void {
    this.effect(
      () => this.docsFacade.openedDocument$.pipe(
        tap((document) => {
          if (document) {
            this.patchDocument(document)
          }
        })
      )
    )
  }

  private patchDocument(document: DocumentVm): void {
    this.patchState({document})
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
