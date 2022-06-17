import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from '../models/member';
import { MemberService } from '../services/member.service';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css']
})
export class MemberFormComponent implements OnInit {
  memberForm: FormGroup = this.formBuilder.group({
    id: [],
    name: [],
    phone: [],
    pid: [],
    address: []
  })

  get id() { return this.memberForm.controls['id'].value }
  get name() { return this.memberForm.controls['name'].value }

  constructor(
    private formBuilder: FormBuilder,
    private memberService: MemberService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    const id = this.activatedRoute.snapshot.queryParams['id'];

    if(id !== undefined) {
      const member = await this.memberService.loadOne(id);
      this.memberForm.patchValue(member);
    }
  }

  async addMember() {
    const data = this.memberForm.value;
    if(data.id !== null) {
      await this.memberService.updateMember(this.memberForm.value);
    } else {
      await this.memberService.addMember(this.memberForm.value);
    }

    this.router.navigateByUrl(``);
  }

  async deleteMember() {
    const data = this.memberForm.value;
    data['deleted'] = true;
    await this.memberService.updateMember(this.memberForm.value);
    this.router.navigateByUrl(``);
  }
}
