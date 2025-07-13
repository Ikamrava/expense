import { Component, inject, OnInit } from '@angular/core';
import { FirestoreService, Item } from '../../services/firestore.service';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [DatePipe]
})
export class HomeComponent implements OnInit{
  items: Item[] = [];
  constructor(private firestoreService: FirestoreService) {
  }
    ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    this.firestoreService.getItems().subscribe({
      next: (res: Item[]) => {
        this.items = res
      },
      error: (err) => {
        console.error('Error fetching items:', err);
      }
    });
  }

  private datePipe = inject(DatePipe) 
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
      description: form.value.description
    };

    this.firestoreService.addItem(newItem)
      .then(() => {
        console.log('Item added successfully!');
        form.reset(); // Reset the form after successful submission
      })
      .catch(err => console.error(err));
  }

  // Method to delete an item


}
