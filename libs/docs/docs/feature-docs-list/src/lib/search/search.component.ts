import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {DocTypeEntity, DocTypesList, OrganizationsList} from "@core/data-access";
import {CapitalizeFirstLetterPipe} from "@core/utils";
import {MatCardModule} from "@angular/material/card";

export type SearchForm = {
  type: DocTypeEntity;
  number: string;
}

@Component({
  selector: 'docs-search',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatSelectModule, ReactiveFormsModule, MatInputModule, MatButtonModule, CapitalizeFirstLetterPipe, MatCardModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  @Input({required: true}) directories!: {orgs: OrganizationsList, docTypes: DocTypesList}
  @Output() submitted = new EventEmitter<SearchForm>();
  public readonly form = new FormGroup({
    type: new FormControl(''),
    number: new FormControl('')
  });

  public onSubmit() {
    if (this.form.valid) {
      const form = this.form.value;
      const searchForm: SearchForm = {
        type: form.type as string,
        number: form.number as string
      }
      this.submitted.emit(searchForm);
    }
  }

  public reset() {
    this.form.reset();
    this.submitted.emit({
      type: '',
      number: ''
    });
  }
}
