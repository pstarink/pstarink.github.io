import { OnInit } from '@angular/core'
import { Component } from '@angular/core'

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

  model: any[] = [];

  ngOnInit() {
    this.model = [
      { label: 'Dash', icon: 'dashboard', routerLink: ['/'] },
      { label: 'Sandbox', icon: 'precision_manufacturing', routerLink: ['/sandbox'] },
      { label: 'Activity', icon: 'integration_instructions', routerLink: ['/activity'] },
      { label: 'Four', icon: 'grid_on', routerLink: ['/four'] },
      { separator: true },
      {
        label: 'Views', icon: 'wysiwyg',
        items: [
          { label: 'Empty', icon: 'star', routerLink: ['/empty'] },
          { label: 'Dash', icon: 'dashboard', routerLink: ['/dash'] },
          { label: 'Docs', icon: 'article', routerLink: ['/docs'] },
        ]
      },
      { separator: true },
      {
        label: 'Pages', icon: 'content_copy', routerLink: ['/pages'],
        items: [
          { label: 'Login', icon: 'vpn_key', routerLink: ['/login'] },
          { label: 'Error', icon: 'error', routerLink: ['/error'] },
          { label: 'Not Found', icon: 'not_listed_location', routerLink: ['/notfound'] },
          { label: 'Access Denied', icon: 'lock', routerLink: ['/access'] },
        ]
      }
    ]
  }
}
