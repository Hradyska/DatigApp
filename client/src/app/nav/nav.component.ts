import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../_models/user';
import { of } from 'rxjs/internal/observable/of';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MembersService } from '../_services/members.service';
import { UserParams } from '../_models/userParams';
import { take } from 'rxjs';
import { MemberListComponent } from '../members/member-list/member-list.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(public accountService: AccountService,
    private router: Router,
    private toastr: ToastrService) {    
    }

  ngOnInit(): void {
  }

  login(){
    this.accountService.login(this.model).subscribe({
      next: _ => {
        this.router.navigateByUrl('/members');
        this.model = {};
      }
    })
  }
  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}