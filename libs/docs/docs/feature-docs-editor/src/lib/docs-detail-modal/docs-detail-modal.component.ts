import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  OnDestroy,
  OnInit,
  Output, TemplateRef,
  ViewChild
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LetDirective} from "@ngrx/component";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Observable} from "rxjs";
import {DocumentVm} from "../../../../document-vm";
import {DocTypesList, onSuccessEditionCbType, OrganizationsList} from "@core/data-access";
import {DocsDetailFormComponent} from "../docs-detail-form/docs-detail-form.component";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";

type DocumentData = {
  document$: Observable<DocumentVm>,
  organizations$: Observable<OrganizationsList>,
  documentTypes$: Observable<DocTypesList>,
  mode$: Observable<'edit' | 'create' | 'view'>
}

@Component({
  selector: 'docs-detail-modal',
  standalone: true,
  imports: [CommonModule, LetDirective, DocsDetailFormComponent, MatSnackBarModule],
  templateUrl: 'docs-detail-modal.component.html',
  styleUrls: ['./docs-detail-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsDetailModalComponent implements OnInit, OnDestroy {
  @Output() formSubmitted = new EventEmitter<{ data: DocumentVm, onSuccessCb: onSuccessEditionCbType }>()
  private readonly dialogRef: MatDialogRef<DocsDetailModalComponent> = inject(MatDialogRef);
  public readonly data: DocumentData = inject(MAT_DIALOG_DATA);
  @ViewChild('snackbarOnEdit') snackbarTemplateRef!: TemplateRef<any>
  private snackBar = inject(MatSnackBar);

  ngOnInit() {
    document.body.classList.add("cdk-global-scrollblock");
  }

  ngOnDestroy() {
    document.body.classList.remove("cdk-global-scrollblock");
  }

  public close() {
    this.dialogRef.close();
  }

  public transferFormData(data: DocumentVm) {
    this.formSubmitted.emit({data, onSuccessCb: this.onEditSuccess})
  }

  private onEditSuccess: () => void = () =>
    this.snackBar.openFromTemplate(this.snackbarTemplateRef, {
      duration: 2500, horizontalPosition: 'center', verticalPosition: 'top'
    })
}
