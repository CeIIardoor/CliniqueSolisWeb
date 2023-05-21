import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserInterface} from "./Interfaces/UserInterface";
import {UsersDashboardService} from "./Services/users-dashboard.service";

@Component({
  selector: 'app-users-dashboard',
  templateUrl: './users-dashboard.component.html'
})
export class UsersDashboardComponent implements OnInit, OnDestroy {

  public users: UserInterface[] = [];
  public viewTarget: UserInterface | null = null;
  public editTarget: UserInterface | null = null;

  constructor(
    private httpClient: HttpClient,
    private usersDashboardService: UsersDashboardService
  ) {
  }

  ngOnInit(): void {
    this.usersDashboardService.getAllUsers().subscribe((data: UserInterface[]) => {
      this.users = data;
      }
    );
  }

  ngOnDestroy(): void {
    this.viewTarget = null;
    this.editTarget = null;
    this.users = [];
  }

  toggleBackgroundBlur(blur: boolean): void {
    if (blur) {
      const bg = document.getElementById('bg');
      bg?.classList.add('bg-black', 'opacity-50', 'top-0', 'left-0', 'w-full', 'h-full', 'fixed', 'z-40');
    } else {
      const bg = document.getElementById('bg');
      bg?.classList.remove('bg-black', 'opacity-50', 'top-0', 'left-0', 'w-full', 'h-full', 'fixed', 'z-40');
    }
  }

  openViewModal(id: number): void {
    const modal = document.getElementById('viewUserModal');
    modal?.classList.remove('hidden');
    this.toggleBackgroundBlur(true);
    this.viewTarget = this.users.find(user => user.id == id) as UserInterface;
    console.log(this.viewTarget);

  }

  closeViewModal() {
    const modal = document.getElementById('viewUserModal');
    modal?.classList.add('hidden');
    this.toggleBackgroundBlur(false);
    this.viewTarget = null;
  }

  openEditModal(id: number): void {
    this.editTarget = this.users.find(user => user.id == id) as UserInterface;
    const modal = document.getElementById('editUserModal');
    modal?.classList.remove('hidden');
    this.toggleBackgroundBlur(true);
    console.log(this.editTarget);
  }

  closeEditModal() {
    const modal = document.getElementById('editUserModal');
    modal?.classList.add('hidden');
    this.toggleBackgroundBlur(false);
    this.editTarget = null;
  }

  deleteUser(id: number) {
    let user = this.users.find(user => user.id == id) as UserInterface;
    if (user.role == "ROLE_ADMIN") {
      alert("You cannot delete an admin");
      return;
    }

    if (user.role == "ROLE_UTILISATEUR") {
      this.usersDashboardService.deleteUserById(id);
      this.usersDashboardService.getAllUsers();
    }
    document.getElementById('user-' + id)?.remove();
  }
}
