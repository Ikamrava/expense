import { Component, inject, Input, OnInit } from '@angular/core';
import { FirestoreService, Item } from '../../services/firestore.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-expenses-list',
  templateUrl: './expenses-list.component.html',
  styleUrls: ['./expenses-list.component.css'],
  providers: [DatePipe]  // Fix typo: use style**Urls**
})
export class ExpensesListComponent  {

  @Input({required: true})items: Item[] = [];

  selectedItem: Item | null = null;
  editDialogVisible: boolean = false;

  constructor(private firestoreService: FirestoreService) {}
  private datePipe = inject(DatePipe) 



  onDeleteItem(itemId: string | undefined) {
    if (itemId) {
      this.firestoreService.deleteItem(itemId)
        .then(() => {
          console.log('Item deleted successfully!');
        })
        .catch(err => console.error(err));
    }
  }

  // openEditDialog(item: Item) {
   
  //   this.editDialogVisible = true;
  //   const rawDate = item.date;
  //   let formattedDate: string | null = null;
  //   if (rawDate) {
  //     formattedDate = this.datePipe.transform(rawDate, 'dd/MM/yyyy');
  //   }
  //   this.selectedItem = { ...item, date: formattedDate}; 
    
  // }

  openEditDialog(item: Item) {
  this.editDialogVisible = true;

  const rawDate = item.date;
  let formattedDate: string | null = null;

  if (rawDate) {
    // Parse "14/07/2025" as dd/MM/yyyy
    const parts = rawDate.split('/');
    if (parts.length === 3) {
      const [day, month, year] = parts.map(Number);
      const parsedDate = new Date(year, month - 1, day); // JS months are 0-indexed
      formattedDate = this.datePipe.transform(parsedDate, 'dd/MM/yyyy');
    }
  }

  this.selectedItem = { ...item, date: formattedDate };
}


  onSaveEdit() {
    if (this.selectedItem) {
      this.firestoreService.updateItem(this.selectedItem)
        .then(() => {
          console.log('Item edited successfully!');
          this.editDialogVisible = false;
        })
        .catch(err => console.error(err));
    }
  }


}
