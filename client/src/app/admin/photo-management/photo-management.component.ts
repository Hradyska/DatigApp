import { Component, Input, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { Photo } from 'src/app/_models/photo';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-photo-management',
  templateUrl: './photo-management.component.html',
  styleUrls: ['./photo-management.component.css']
})
export class PhotoManagementComponent implements OnInit{
  photos: Photo[] = [];

  constructor(private adminService: AdminService) { }
  
  ngOnInit(): void {
    this.getPhotosForApproval();
  }

  getPhotosForApproval() {
    this.adminService.getPhotosForApproval().subscribe({
      next: photos => this.photos = photos
    })
  }

  approvePhoto(photoId: number) {
    
    this.adminService.approvePhoto(photoId).subscribe({
      next: _ => {
        this.photos = this.photos.filter(x => x.id !== photoId);
      }
    })   
  }

  rejectPhoto(photoId: number) {

    this.adminService.rejectPhoto(photoId).subscribe({
      next: _ => {
        this.photos = this.photos.filter(x => x.id !== photoId);          
      }
    })
  }
}
