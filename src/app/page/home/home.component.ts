import { Component, inject, OnInit } from '@angular/core';
import { FirestoreService, Item } from '../../services/firestore.service';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import {  descriptionList } from '../../../categoty';



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





  // Method to delete an item


}
