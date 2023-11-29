import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { ConfirmService } from 'src/app/_services/confirm.service';
import { MembersService } from 'src/app/_services/members.service';
import { ConfirmDialogComponent } from 'src/app/modals/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm | undefined;
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.editForm?.dirty) {
      $event.returnValue = true;
    }
  }
 bsModalRef: BsModalRef<ConfirmDialogComponent> = new BsModalRef< ConfirmDialogComponent>();
  member: Member | undefined;
  user: User | null = null;

  constructor(private accountService: AccountService,
    private memberService: MembersService,
    private toastr: ToastrService,
    private router: Router,
    private confirmService: ConfirmService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => this.user = user
    })
  }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    if (!this.user) return;
    this.memberService.getMember(this.user.username).subscribe({
      next: member => this.member = member
    })
  }


  updateMember() {
    this.memberService.updateMember(this.editForm?.value).subscribe({
      next: _ => {
        this.toastr.success('Profile updated successfully');
        this.editForm?.reset(this.member);
      }
    })

  }

  deleteMember() {
    this.confirmDeleting().subscribe({
      next: confirmation => {
        if (confirmation) {
          const username = this.user!.username;
          this.router.navigateByUrl('/');
          this.memberService.deleteMember(username).subscribe({
            next: _ => {
              this.toastr.success('Profile deleted successfully');
              this.accountService.logout();
            }
          })
        }
      }
   });
    
  }

  private confirmDeleting() {
    return this.confirmService.confirm();
  }

}
