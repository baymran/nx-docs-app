import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DocsDetailComponentStore} from "./docs-detail-container.store";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {DocsDetailModalComponent} from "../docs-detail-modal/docs-detail-modal.component";
import {Router} from "@angular/router";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'docs-detail-container',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './docs-detail-container.component.html',
  styleUrls: ['./docs-detail-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DocsDetailComponentStore]
})
export class DocsDetailContainerComponent implements OnInit {
  private readonly dialog = inject(MatDialog);
  private router = inject(Router)
  private readonly componentStore = inject(DocsDetailComponentStore);
  private readonly document$ = this.componentStore.openedDocument$;
  private readonly organizations$ = this.componentStore.organizations$;
  private readonly documentTypes$ = this.componentStore.documentTypes$;
  private readonly mode$ = this.componentStore.mode$;
  private readonly destroyRef = inject(DestroyRef);
  private readonly dialogRef = this.dialog.open(DocsDetailModalComponent, {
    data: {
      document$: this.document$,
      organizations$: this.organizations$,
      documentTypes$: this.documentTypes$,
      mode$: this.mode$
    },
    autoFocus: false,
    restoreFocus: false,
    backdropClass: ['modal-backdrop'],
    panelClass: 'dialog-responsive'
  })

  ngOnInit() {

    this.dialogRef.afterClosed().pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {

        // this.router.navigate([''], {relativeTo: this.route.root})
        this.router.navigate([{outlets: {detail: null}}])
      })

    this.dialogRef.componentInstance.formSubmitted.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(({data, onSuccessCb}) => {
        this.componentStore.sendData(data, onSuccessCb);
      });
  }
}
