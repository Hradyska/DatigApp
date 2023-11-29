import { Component, Input } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  registerMode = false;
  users: any;
  modalRef?: BsModalRef;
 
  constructor(private modalService: BsModalService) {
  }
 
  openModal(template: any) {
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit(): void {
  }

  registerToogle() {
    this.registerMode = !this.registerMode;
  }

  cancelRegisterMode(event: boolean) {
    this.registerMode = event;
  }

}
