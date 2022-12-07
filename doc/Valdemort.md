# ngx-valdemort

-   Install Valdemort

-   Import the Valdemort module into the Shared module

-   In the Shared module, create and export a component with shared message templates, such as:

```javascript
error.templates.ts;

import { Component } from "@angular/core";

@Component({
    selector: "valdemort-templates",
    template: `<val-default-errors>
        <ng-template valError="required" let-label>
            <small class="p-error">
                {{ label || "This field" }} is required
            </small>
        </ng-template>
        <ng-template valError="email" let-label>
            {{ label || "This field" }} must be a valid email address
        </ng-template>
        <ng-template valError="minlength" let-error="error" let-label>
            <small class="p-error">
                {{ label || "This field" }} must be at least
                {{ error.requiredLength | number }} characters
            </small>
        </ng-template>
        <ng-template valError="maxlength" let-error="error" let-label>
            <small class="p-error">
                {{ label || "This field" }} must be at most
                {{ error.requiredLength | number }} characters
            </small>
        </ng-template>
    </val-default-errors>`,
})
export class ErrorTemplates {}
```

-   Include `<valdemort-templates>` in the app's component markup

```typescript
app.component.ts

@Component({
    selector: 'app-root',
    template: `
    <valdemort-templates></valdemort-templates>
    <router-outlet></router-outlet>`
})
export class AppComponent implements OnInit {
```

-   Import Shared into the UI module

-   Create the form and validation model:

```typescript
this.form = this.fb.group({
    username: [
        null,
        [Validators.required, Validators.minLength(3), Validators.maxLength(6)],
    ],
});
```

-   Add the valdemort markup to the form controls:

```html
<input type="text" pInputText formControlName="username" />
<val-errors controlName="username" label="The user name"></val-errors>
```

-   Profit
