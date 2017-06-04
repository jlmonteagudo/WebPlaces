import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { Router } from '@angular/router';
import { AuthService } from '../shared/security/auth.service';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { DialogMessageComponent, DialogMessage } from '../components/html/dialog-message/dialog-message.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form:FormGroup;


  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService, private dialog: MdDialog) {

    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.form.value.email, this.form.value.password)
      .subscribe(
        () => this.router.navigate(['/areas']),
        err => this.showDialogMessage(new DialogMessage('warn', 'thumb_down', err))
      );
  }

  showDialogMessage(dialogMessage: DialogMessage) {

    let config: MdDialogConfig = {
      disableClose: true,
      data: dialogMessage
    }

    let dialogRef: MdDialogRef<DialogMessageComponent> = this.dialog.open(DialogMessageComponent, config);

  }

}
