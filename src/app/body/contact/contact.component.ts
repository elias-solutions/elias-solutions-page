import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { ContactForm } from './ContactForm';
import { DialogComponent } from '@common/dialog/dialog.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {
  
  private serviceId = 'service_v2e6h4j';
  private templateId = 'template_ffykjl8';
  private publicKey = 'RM-yBe0-jPUPgCD2Q'; // UserId

  public contactForm!: FormGroup<ContactForm>;
  public disable: boolean = false;

  constructor(private fb: FormBuilder, public dialog: MatDialog) {
  }
  
  ngOnInit(): void {    
    this.contactForm = this.fb.group<ContactForm>({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      phone: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      message: new FormControl('', Validators.required),
      terms: new FormControl(false, Validators.requiredTrue)
    });
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
  
  validate() : boolean {
    let isValid = this.contactForm.controls.firstName.value !== '' &&
    this.contactForm.controls.lastName.value !== '' &&
    this.contactForm.controls.phone.value !== '' &&
    this.contactForm.controls.email.value !== '' &&
    this.contactForm.controls.message.value !== ''&&
    this.contactForm.controls.terms.value === true;
    
    return isValid && this.contactForm.valid;
  }

  disableSubmit() {
    return this.contactForm.invalid || this.disable;
  }

  isFieldValid(field: string): boolean | undefined {
    return this.contactForm.get(field)?.valid && this.contactForm.get(field)?.touched;    
  }

  isFieldInValid(field: string): boolean | undefined {
    return this.contactForm.get(field)?.invalid && this.contactForm.get(field)?.touched;    
  }

  private openDialog(message: string, dialogButton: string): void {
    this.dialog.open(DialogComponent, {
      width: '250px',
      data: { message, dialogButton }
    });
  }
}
