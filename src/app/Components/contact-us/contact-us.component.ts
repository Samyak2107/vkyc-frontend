import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, NgModule, OnInit } from '@angular/core';
import { MatLabel } from '@angular/material';
import { MatFormField } from '@angular/material/form-field';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
})
export class ContactUsComponent implements OnInit {
  fullName!: string;
  emailAddress!: string;
  mobile!: string;
  companyName!: string;
  country!: string;
  city!: string;
  reference!: string;
  message!: string;
  responseBody!: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  setInitialState() {
    this.fullName = '';
    this.emailAddress = '';
    this.mobile = '';
    this.companyName = '';
    this.country = '';
    this.city = '';
    this.reference = '';
    this.message = '';
  }

  onSubmit() {
    const data = {
      fullName: this.fullName,
      emailAddress: this.emailAddress,
      mobile: this.mobile,
      companyName: this.companyName,
      country: this.country,
      city: this.city,
      reference: this.reference,
      message: this.message,
    };
    console.log(data);
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
    this.http
      .post('https://samyak-vkyc-api.onrender.com/contacts/add', data, {
        headers: headers,
      })
      .subscribe((responseData) => {
        console.log('Response from contact api ->', responseData);
        this.responseBody = responseData;
        if (this.responseBody.error) {
          alert(this.responseBody.message);
          return;
        }
        alert(this.responseBody.message);
        this.setInitialState();
      });
  }
}
