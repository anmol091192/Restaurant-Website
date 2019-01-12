import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';
import { flyInOut ,visibility} from '../animations/app.animation';
import { FeedbackService } from '../services/feedback.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    visibility()
  ]
})
export class ContactComponent implements OnInit {

  feedbackForm: FormGroup;
  feedback: Feedback;
  feedbackcopy = null;
  contactType = ContactType;
  visibility = 'shown';
  submitted= null;
  feedback2 = null;

  formErrors = {
  	'firstname': '',
  	'lastname': '',
  	'telnum': '',
  	'email': ''
  };

  validationMessages = {
  	'firstname': {
  		'required': 'First Name is required.',
  		'minlength': 'First Name must be at least 2 characters long',
  		'maxlength': 'First Name cannot be more than 25 characters long'
  	},
  	'lastname': {
  		'required': 'Last Name is required.',
  		'minlength': 'Last Name must be at least 2 characters long',
  		'maxlength': 'Last Name cannot be more than 25 characters long'
  	},
  	'telnum': {
  		'required': 'Tel. Number is required.',
  		'pattern': 'Tel. number must contain only numbers',
  	},
  	'email': {
  		'required': 'Email is required.',
  		'email': 'email is not a valid format'
  	}
  };

  constructor(private fb: FormBuilder, private feedbackservice: FeedbackService) {
  this.createForm();
   }

  ngOnInit() {
  }

  createForm(){
  this.feedbackForm = this.fb.group({
  	firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
  	lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
  	telnum: [0, [Validators.required, Validators.pattern ]],
  	email: ['', [Validators.required, Validators.email ]],
  	agree: false,
  	contacttype: 'None',
  	message: ''
   }); 

   this.feedbackForm.valueChanges
   	.subscribe(data => this.onValueChanged(data));

   this.onValueChanged(); //reset form validation messages
  }

  onValueChanged(data?: any){
  	if(!this.feedbackForm) { return; }
  	const form = this.feedbackForm;

  	for(const field in this.formErrors) {
  		this.formErrors[field] = '';
  		const control = form.get(field);
  		if (control && control.dirty && !control.valid){
  			const messages = this.validationMessages[field];
  			for (const key in control.errors) {
  				this.formErrors[field] += messages[key] + ' ';
  			}
  		}
  	}
  }

  onSubmit(){
  	this.feedback = this.feedbackForm.value;
  	this.feedbackservice.submitFeedback(this.feedback)
  	.subscribe((feedback)=>{
        this.feedback2=feedback;
        this.submitted=false;
        setTimeout(()=>{
          
          this.feedback2=null;
          
        },5000)
      });
  	this.feedbackForm.reset({
  		firstname: '',
  		lastname: '',
  		telnum: '',
  		email: '',
  		agree: false,
  		contacttype: 'None',
  		message: ''
  	});
  }
}
