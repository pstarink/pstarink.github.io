import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { BizService, PyramidService } from '@services'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ["./login.component.scss"]
})
export class LoginComponent {
  returnUrl = null;
  error = null;

  email: string = "user@pyramid.com"
  password: string = "secret"

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    public biz: BizService
  ) {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || 'dash'
  }

  login() {
    this.biz.login(this.email, this.password)
      .subscribe({
        next: () => this.router.navigate([this.returnUrl]),
        error: e => this.error = e.error
      })
  }
}
