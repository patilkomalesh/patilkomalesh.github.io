import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rsvp',
  imports: [FormsModule, CommonModule],
  templateUrl: './rsvp.html',
  styleUrl: './rsvp.scss'
})
export class Rsvp {
  rsvpData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    attending: '',
    guests: '1',
    message: ''
  };

  onSubmit() {
    if (this.isFormValid()) {
      console.log('RSVP Submitted:', this.rsvpData);
      alert('Thank you for your RSVP! We will send you a confirmation email soon.');
      // In a real app, you would send this data to a backend service
    }
  }

  private isFormValid(): boolean {
    return !!(
      this.rsvpData.firstName && 
      this.rsvpData.lastName && 
      this.rsvpData.email && 
      this.rsvpData.attending
    );
  }
}
