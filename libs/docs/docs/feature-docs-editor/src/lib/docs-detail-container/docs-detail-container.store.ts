import {DocumentVm} from "../../../../document-vm";
import {DocTypesList, DocTypesListDTO, OrganizationsList, OrganizationsListDTO} from "@core/data-access";
import {ComponentStore} from "@ngrx/component-store";
import {inject, Injectable} from "@angular/core";
import {DocsFacade} from "@docs/data-access";
import {catchError, of, tap} from "rxjs";
import {ApiService} from "@core/http";
import {docsVMAdapter} from "../../../../docs-vm.adapter";

type DocsDetailState = {
  document: DocumentVm | null,
  organizations: OrganizationsList | null,
  documentTypes: DocTypesList | null,
  mode: 'create' | 'edit' | 'view'
}

const initialState: DocsDetailState = {
  document: null,
  organizations: null,
  documentTypes: null,
  mode: 'view'
}

// "id" | "organization" | "type" | "series" | "number" | "dateOfIssue" | "main" | "archival"

@Injectable()
export class DocsDetailComponentStore extends ComponentStore<DocsDetailState> {
  private readonly docsFacade = inject(DocsFacade);
  private readonly apiService = inject(ApiService);
  public readonly openedDocument$ = this.select(({document}) => document);
  public readonly organizations$ = this.select(({organizations}) => organizations);
  public readonly documentTypes$ = this.select(({documentTypes}) => documentTypes);
  public readonly isCreationMode$ = this.docsFacade.isCreationMode$
  // public readonly docs$ = this.select(({docs}) => docs)
  // public readonly status$: Observable<LoadingStatus> = this.select(this.docsFacade.status$, status => status)

  constructor() {
    super(initialState);
    this.fetchOrganizations();
    this.fetchDocTypes();
    this.setCurrentMode();
    this.fetchDocument();
    this.setOpenedDocumentIfExists();
  }

  private fetchDocument() {
    this.effect(
      () => this.docsFacade.openedDocument$.pipe(
        tap((document) => {
          if (!document) {
            this.docsFacade.loadDocumentFromUrl()
          }
        })
      )
    )
  }

  private setOpenedDocumentIfExists(): void {
    this.effect(
      () => this.docsFacade.openedDocument$.pipe(
        tap((document) => {
          if (document) {
            this.patchDocument(docsVMAdapter.entityToVM(document))
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

  private setCurrentMode() {
    this.effect(() =>
      this.isCreationMode$.pipe(
        tap(isCreationMode => {
          this.patchState({
            mode: isCreationMode ? 'create' : 'edit'
          });
        })
      )
    );
  }

  public sendData(data: DocumentVm) {
    const selectMode = (state: DocsDetailState) => state.mode;

    if (this.get(selectMode) === 'create') {
      this.createDocument(data);
    } else {
      this.updateDocument(data);
    }

  }

  private createDocument(data: DocumentVm) {
    const document = docsVMAdapter.VMToEntity(data)
    this.docsFacade.createDocument(document);
  }

  private updateDocument(data: DocumentVm) {
    const selectId = (state: DocsDetailState) => state.document?.id;
    const id = this.get(selectId);
    if (id) {
      const document = {...docsVMAdapter.VMToEntity(data), id}
      this.docsFacade.updateDocument(document);
    }
  }
}
