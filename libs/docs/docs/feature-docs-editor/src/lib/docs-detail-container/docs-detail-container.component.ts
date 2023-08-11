import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {DocsDetailComponentStore} from "./docs-detail-container.store";
import {MatDialog} from "@angular/material/dialog";
import {DocsDetailModalComponent} from "../docs-detail-modal/docs-detail-modal.component";

@Component({
  selector: 'docs-detail-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './docs-detail-container.component.html',
  styleUrls: ['./docs-detail-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DocsDetailComponentStore]
})
export class DocsDetailContainerComponent implements OnInit {
  private readonly dialog = inject(MatDialog);
  private readonly componentStore = inject(DocsDetailComponentStore);
  private readonly document$ = this.componentStore.openedDocument$;
  private readonly organizations$ = this.componentStore.organizations$;
  private readonly documentTypes$ = this.componentStore.documentTypes$;

  ngOnInit() {
    this.openDocumentDetailModal();
  }

  private openDocumentDetailModal() {
    this.dialog.open(DocsDetailModalComponent, {
      data: {
        document$: this.document$,
        organizations$: this.organizations$,
        documentTypes$: this.documentTypes$
      },
      width: '80%',
    });
  }
}
