import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { DialogComponent } from '../../common/dialog/dialog.component';

interface ContactForm {
  name: FormControl<string | null>;
  email: FormControl<string | null>;
  message: FormControl<string | null>;
}

@Component({
  selector: 'app-project-request',
  templateUrl: './project-request.component.html',
  styleUrl: './project-request.component.scss'
})
export class ProjectRequestComponent {
  private serviceId = 'service_v2e6h4j';
  private templateId = 'template_ffykjl8';
  private publicKey = 'RM-yBe0-jPUPgCD2Q'; // UserId

  public contactForm!: FormGroup<ContactForm>;
  public disable: boolean = false;

  constructor(private fb: FormBuilder, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group<ContactForm>({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      message: new FormControl('', Validators.required)
    });
  }

  validate() : boolean {
    return this.contactForm.controls.name.value !== '' &&
    this.contactForm.controls.email.value !== '' &&
    this.contactForm.controls.message.value !== '' &&
    this.contactForm.valid;
  }

  private openDialog(message: string, dialogButton: string): void {
    this.dialog.open(DialogComponent, {
      width: '250px',
      data: { message, dialogButton }
    });
  }

  onSubmit(): void {
    this.disable = true;

    if (this.contactForm.valid) {
      const templateParams = {
        name: this.contactForm.value.name,
        email: this.contactForm.value.email,
        message: this.contactForm.value.message
      };

      emailjs.send(this.serviceId, this.templateId, templateParams, this.publicKey)
        .then((response: EmailJSResponseStatus) => {
          this.disable = false;
          this.openDialog('message sent successfully!', 'close');
        }, (error) => {
          this.disable = false;
          this.openDialog('Error: '+ error.status + ' message sent failed!' , 'close');
        });
    }
  }

  disableSubmit() {
    if(this.contactForm.invalid) {
      return true;
    }

    if(this.disable) {
      return true;
    }

    return false;
  }
}
