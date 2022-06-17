import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css']
})
export class ItemFormComponent implements OnInit {
  itemForm: FormGroup = this.formBuilder.group({
    id: [],
    type: [],
    author: [],
    title: [],
    in_date: [],
    status: []
  })

  get id() { return this.itemForm.controls['id'].value }
  get title() { return this.itemForm.controls['title'].value }

  constructor(
    private formBuilder: FormBuilder,
    private itemService: ItemService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

    async ngOnInit(): Promise<void> {
      const id = this.activatedRoute.snapshot.queryParams['id'];
  
      if(id !== undefined) {
        const item = await this.itemService.loadOne(id);
        this.itemForm.patchValue(item);
      } else {
        this.itemForm.patchValue({
          type: 'Könyv',
          in_date: new Date().toISOString(),
          status: 'Szabad'
        })
      }
    }

    async addItem() {
      const data = this.itemForm.value;
      if(data.id !== null) {
        await this.itemService.updateItem(data);
      } else {
        await this.itemService.addItem(data);
      }
  
      this.router.navigateByUrl(`item_list`);
    }
  
    async deleteItem() {
      const data = this.itemForm.value;
      await this.itemService.deleteItem(data.id);
      this.router.navigateByUrl(`item_list`);
    }

}
