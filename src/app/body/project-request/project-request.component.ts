import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { DialogComponent } from '../../common/dialog/dialog.component';

interface ContactForm {
  firstName: FormControl<string | null>;
  lastName: FormControl<string | null>;
  phone: FormControl<string | null>;
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
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      phone: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      message: new FormControl('', Validators.required)
    });
  }

  validate() : boolean {
    return this.contactForm.controls.firstName.value !== '' &&
    this.contactForm.controls.lastName.value !== '' &&
    this.contactForm.controls.phone.value !== '' &&
    this.contactForm.controls.email.value !== '' &&
    this.contactForm.controls.message.value !== '' &&
    this.contactForm.valid;
  }

  onSubmit(): void {
    this.disable = true;

    if (this.contactForm.valid) {
      const templateParams = {
        firstName: this.contactForm.value.firstName,
        lastName: this.contactForm.value.lastName,
        phone: this.contactForm.value.phone,
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

  private openDialog(message: string, dialogButton: string): void {
    this.dialog.open(DialogComponent, {
      width: '250px',
      data: { message, dialogButton }
    });
  }
}
