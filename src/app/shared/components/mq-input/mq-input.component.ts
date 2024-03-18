import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: "mq-input",
  template: `
    <div class="mq-margin-large-bottom">
      @if (label) {
      <div class="label">{{ label }}</div>
      }
      <input
        class="input"
        [type]="type"
        [placeholder]="placeholder"
        [formControl]="control"
      />
      @if (inValid) {
      <div class="red">Enter valid {{ name }}</div>
      }
    </div>
  `,
  styles: `
    .red {
      color: red;
      padding:4px;
    }
    .input {
      border-radius: var(--mq-space-base);
      width: -webkit-fill-available;
      background: whitesmoke;
      padding: var(--mq-space-small);
      font-size: var(--mq-space-small);
    }
    .label {
      padding-bottom: var(--mq-space-base);
      color: #978886;
    }
  `,
})
export class MqInputComponent implements OnInit, OnDestroy {
  @Input({ required: true }) fg!: FormGroup;
  @Input({ required: true }) name = "";
  @Input() label = "";
  @Input({ required: true }) placeholder = "";
  @Input({ required: true }) type = "";

  control!: FormControl;

  inValid: boolean = false;
  ngUnsubscribe = new Subject<void>();

  ngOnInit(): void {
    this.control = this.fg.get(this.name) as FormControl;
    this.control?.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((value) => {
        this.inValid =
          (this.control?.invalid || value === "") && this.control.touched;
        console.log(this.control.errors);
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.unsubscribe();
  }
}
