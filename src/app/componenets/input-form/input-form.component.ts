import { Component, inject, OnInit } from '@angular/core';
import { descriptionList } from '../../../categoty';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';
import { FirestoreService, Item } from '../../services/firestore.service';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrl: './input-form.component.css',
})
export class InputFormComponent implements OnInit {
  desc = descriptionList;
  filteredDesc: string[] = [];
  selectedDesc: string = ''; // can hold typed or selected value

  constructor(private firestoreService: FirestoreService) {}

  ngOnInit() {
    this.firestoreService.getCategories().subscribe((data) => {
      this.desc = data.map((c) => c.name);
    });
  }

  selectedDate: Date = new Date();

  filterDesc(event: any) {
    const query = event.query.toLowerCase();
    this.filteredDesc = this.desc.filter((item) =>
      item.toLowerCase().includes(query)
    );
  }

  private datePipe = inject(DatePipe);
  // Method to handle form submission for adding a new item
  async onAddItem(form: NgForm) {
    if (form.invalid) {
      return;
    }

    // Get the raw date value from the form
    const rawDate = this.selectedDate;

    // Format the date to 'YYYY/MM/DD' if it exists
    let formattedDate: string | null = null;
    if (rawDate) {
      formattedDate = this.datePipe.transform(rawDate, 'dd/MM/yyyy');
    }

    const newItem: Item = {
      amount: form.value.amount,
      date: formattedDate, // Use the formatted date here
      dateObj: rawDate,
      description: form.value.description,
    };

    try {
      await this.firestoreService.addItem(newItem);
      await this.firestoreService.addCategoryIfNotExists(
        form.value.description
      ); // 🔥 add category if new
      form.resetForm();
      this.selectedDate = new Date(); // Reset date to today
    } catch (err) {
      console.error(err);
    }
  }
}
