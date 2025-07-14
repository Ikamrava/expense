import { Component, inject } from '@angular/core';
import { descriptionList } from '../../../categoty';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';
import { FirestoreService, Item } from '../../services/firestore.service';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrl: './input-form.component.css',
})
export class InputFormComponent {
  desc = descriptionList;
  filteredDesc: string[] = [];
  selectedDesc: string = ''; // can hold typed or selected value

  constructor(private firestoreService: FirestoreService) {}

  filterDesc(event: any) {
    const query = event.query.toLowerCase();
    this.filteredDesc = this.desc.filter((item) =>
      item.toLowerCase().includes(query)
    );
  }

  private datePipe = inject(DatePipe);
  // Method to handle form submission for adding a new item
  onAddItem(form: NgForm) {
    if (form.invalid) {
      return;
    }

    // Get the raw date value from the form
    const rawDate = form.value.date;

    // Format the date to 'YYYY/MM/DD' if it exists
    let formattedDate: string | null = null;
    if (rawDate) {
      formattedDate = this.datePipe.transform(rawDate, 'dd/MM/yyyy');
    }

    const newItem: Item = {
      amount: form.value.amount,
      date: formattedDate, // Use the formatted date here
      description: form.value.description,
    };

    this.firestoreService
      .addItem(newItem)
      .then(() => {
        form.reset(); // Reset the form after successful submission
      })
      .catch((err) => console.error(err));
  }
}
