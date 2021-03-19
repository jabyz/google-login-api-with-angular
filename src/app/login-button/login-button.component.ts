import { DOCUMENT } from '@angular/common';
import { Component, OnInit, NgZone, Inject, Renderer2 } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styles: [
  ]
})
export class LoginButtonComponent implements OnInit {

  guser;
  profile;
  profileEmail;
  constructor(
      ngZone: NgZone,
      private metaservice: Meta,
      @Inject(DOCUMENT) private doc: Document,
      private renderer: Renderer2
  )
  {
    window['onSignIn'] = user => ngZone.run(()=>{
      this.afterSignUp(user);
    });
  }

  ngOnInit(): void {
    this.metaservice.addTags([
      {name:'google-signin-client_id',content:'557884841872-ujtldee2dtcr05f76mjcvjnrkigq35ll.apps.googleusercontent.com'}
    ]);

    let script = this.renderer.createElement('script');
    script.src = 'https://apis.google.com/js/platform.js';
    script.defer = true;
    script.async = true;
    this.renderer.appendChild(document.body,script);
  }

  afterSignUp(googleUser){
    this.guser = googleUser;
    this.profile = googleUser.getBasicProfile();
    console.log('ID: ' + this.profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + this.profile.getName());
    console.log('Image URL: ' + this.profile.getImageUrl());
    console.log('Email: ' + this.profile.getEmail()); // This is null if the 'email' scope is not present.
    this.profileEmail = this.profile.getEmail();

    let id_token = googleUser.getAuthResponse().id_token; //send this token to backend API for a more secure way to verify the account logged in
    console.log('Token: ' + id_token);
  }

}
