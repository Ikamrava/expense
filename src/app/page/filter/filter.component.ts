import { Component, OnInit } from '@angular/core';
import { FirestoreService, Item } from '../../services/firestore.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit {
  items: Item[] = [];
  totalSum: number = 0;
  private allItems: Item[] = [];

  fromDate: string = '';
  toDate: string = '';
  

  constructor(private firestoreService: FirestoreService) {}

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    this.firestoreService.getItems().subscribe({
      next: (res: Item[]) => {
        this.allItems = res;
        this.items = res;
        this.calculateSum();
      },
      error: (err) => {
        console.error('Error fetching items:', err);
      },
    });
  }

  private calculateSum(): void {
    this.totalSum = this.items.reduce((accumulator, currentItem) => {
      // ✅ FIX: Use the unary plus (+) to convert the amount to a number.
      return accumulator + +(currentItem.amount || 0);
    }, 0);
  }
  /**
   * Parses a 'DD/MM/YYYY' string into a Date object.
   */
  private parseDMY(dateString: string): Date {
    const [day, month, year] = dateString.split('/').map(Number);
    // In JavaScript's Date constructor, the month is 0-indexed (0=Jan, 11=Dec)
    return new Date(year, month - 1, day);
  }

  onFilter(form: NgForm) {
    const { from, to } = form.value;

    if (!from && !to) {
      this.items = this.allItems;
      return;
    }

    // Convert form dates (from YYYY-MM-DD) to Date objects
    const fromDate = from ? new Date(from) : null;
    if (fromDate) fromDate.setHours(0, 0, 0, 0);

    const toDate = to ? new Date(to) : null;
    if (toDate) toDate.setHours(23, 59, 59, 999);

    this.items = this.allItems.filter((item) => {
      // Exclude items that have no date
      if (!item.date) {
        return false;
      }

      // Convert the item's 'DD/MM/YYYY' string to a Date object before comparing
      const itemDate = this.parseDMY(item.date);

      // Perform the comparison on Date objects
      const afterFrom = fromDate ? itemDate >= fromDate : true;
      const beforeTo = toDate ? itemDate <= toDate : true;

      return afterFrom && beforeTo;
    });
    this.calculateSum();
  }

  resetDate() {
    this.fromDate = '';
    this.toDate = '';
    this.loadItems();
  }
}
