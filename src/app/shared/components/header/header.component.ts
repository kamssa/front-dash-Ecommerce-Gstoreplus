import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from "../../../service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSideBarMenu: EventEmitter<any> = new EventEmitter<any>();
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  toggleSideBar() {
    this.toggleSideBarMenu.emit();
    setTimeout (() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/connexion']);
  }
}
