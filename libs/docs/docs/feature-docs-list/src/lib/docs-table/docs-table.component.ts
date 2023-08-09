import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component, Input,
  OnChanges, ViewChild
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {DocsListVm} from "../docs-list-vm";
import {DocumentVm} from "../../../../document-vm";
import {MatIconModule} from "@angular/material/icon";
import {CapitalizeFirstLetterPipe} from "@core/utils";
import {CdkTableModule} from "@angular/cdk/table";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'docs-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCheckboxModule, MatPaginatorModule, MatInputModule, MatSelectModule, MatSortModule, MatIconModule, CapitalizeFirstLetterPipe, CdkTableModule, MatMenuModule, MatButtonModule],
  templateUrl: './docs-table.component.html',
  styleUrls: ['./docs-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsTableComponent implements OnChanges, AfterViewInit {
  @Input({required: true}) vm!: DocsListVm;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public dataSource = new MatTableDataSource<DocumentVm>();
  public showArchival = true;

  displayedColumns: string[] = [
    'main',
    'type',
    'series',
    'number',
    'dateOfIssue',
  ];

  // "id" | "organization" | "type" | "series" | "number" | "dateOfIssue" | "main" | "archival"

  ngOnChanges() {
    if (this.vm.docs) {
      this.patchDataSource()
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private patchDataSource() {
    this.dataSource.data = this.showArchival
      ? [...this.vm.docs]
      : this.vm.docs.filter(item => !item.archival);
  }

  public toggleArchival() {
    this.showArchival = !this.showArchival;
    this.patchDataSource()
  }
}
