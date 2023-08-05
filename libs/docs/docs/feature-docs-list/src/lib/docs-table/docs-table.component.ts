import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatSortModule} from "@angular/material/sort";

@Component({
  selector: 'documents-docs-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCheckboxModule, MatPaginatorModule, MatInputModule, MatSelectModule, MatSortModule],
  templateUrl: './docs-table.component.html',
  styleUrls: ['./docs-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsTableComponent {
  dataSource = new MatTableDataSource<Document>(documents);
}
