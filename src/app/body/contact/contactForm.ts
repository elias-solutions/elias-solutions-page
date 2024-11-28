import { FormControl } from "@angular/forms";

export interface ContactForm {
  firstName: FormControl<string | null>;
  lastName: FormControl<string | null>;
  phone: FormControl<string | null>;
  email: FormControl<string | null>;
  message: FormControl<string | null>;
  terms: FormControl<boolean | null>;
}
