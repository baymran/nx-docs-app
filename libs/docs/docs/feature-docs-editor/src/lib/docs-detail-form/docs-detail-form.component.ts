import {
  ChangeDetectionStrategy, Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {DocumentVm} from "../../../../document-vm";
import {DocTypesList, OrganizationsList} from "@core/data-access";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatButtonModule} from "@angular/material/button";
import {NgxMaskDirective} from "ngx-mask";
import {CapitalizeFirstLetterPipe} from "@core/utils";

type FormInputData = {
  document: DocumentVm,
  organizations: OrganizationsList,
  docTypes: DocTypesList
}

@Component({
  selector: 'docs-detail-form',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatSelectModule, ReactiveFormsModule, MatInputModule, MatDatepickerModule, MatCheckboxModule, MatButtonModule, NgxMaskDirective, CapitalizeFirstLetterPipe],
  templateUrl: './docs-detail-form.component.html',
  styleUrls: ['./docs-detail-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsDetailFormComponent implements OnChanges {
  @Input({required: true}) formInput!: FormInputData;
  @Output() formSubmitted = new EventEmitter<DocumentVm>();
  @Output() formClosed = new EventEmitter();
  private fb: FormBuilder = inject(FormBuilder);
  public readonly form: FormGroup = this.fb.group({
      type: ['', Validators.required],
      series: ['', Validators.required],
      number: ['', Validators.required],
      dateOfIssue: ['', Validators.required],
      organization: ['', Validators.required],
      departmentCode: ['', Validators.required],
      main: [false],
      archival: [false],
    });

  ngOnChanges() {
    setTimeout(() => {
      if (this.formInput.document) {
        this.form.patchValue(this.formInput.document);
      }
    }, 0)
  }

  public submitForm() {
    if (this.form.valid) {
      this.formSubmitted.emit({...this.form.value});
    }
  }

  public closeModal() {
    this.formClosed.emit();
  }
}
