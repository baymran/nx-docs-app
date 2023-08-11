import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {LetDirective} from "@ngrx/component";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Observable} from "rxjs";
import {DocumentVm} from "../../../../document-vm";
import {DocTypesList, OrganizationsList} from "@core/data-access";
import {DocsDetailFormComponent} from "../docs-detail-form/docs-detail-form.component";

type DocumentData = {
  document$: Observable<DocumentVm>,
  organizations$: Observable<OrganizationsList>,
  documentTypes$: Observable<DocTypesList>
}

@Component({
  selector: 'docs-detail-modal',
  standalone: true,
  imports: [CommonModule, LetDirective, DocsDetailFormComponent],
  templateUrl: 'docs-detail-modal.component.html',
  styleUrls: ['./docs-detail-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsDetailModalComponent {
  private readonly dialogRef: MatDialogRef<DocsDetailModalComponent> = inject(MatDialogRef);
  public readonly data: DocumentData = inject(MAT_DIALOG_DATA);

  public close() {
    this.dialogRef.close();
  }
}