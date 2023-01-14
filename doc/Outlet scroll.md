## Fill router outlet to remaining height

In the layout component (questionable):

```javascript
@Component({
    ....
    encapsulation: ViewEncapsulation.None
})
export class ....
```

Then in the layout component:

```html
<div class="flex-auto flex flex-column">
    <div>Header element</div>

    <router-outlet></router-outlet>
</div>
```

In the routed component:

```javascript
@Component({
    ....
    host: { 'class': 'flex-auto flex flex-column' }
})
export class ....
```

And in the routed template:

```html
<div id="boxy" class="flex-auto">....</div>
```

This `div` element now stretches across the available space.


# DIFFERENT METHOD
Create a class `.flex-wrapper` in a style file that is globally loaded:

```css
.flex-wrapper {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 56px);
}
```
Then wrap the content of a view in a div styled with this class:

```html
<div class="flex-wrapper">
  ...
</div>
```

The components in the `div` are now laid out in a flex-column.

Alternatively, for larger mobile headers, add inside the `.flex-wrapper` class:

```css
@media (max-width: 1091px) {
    router-outlet + * {
        height: calc(100vh - 110px);
    }
    .layout-content {
        padding-top: 8px !important;
        margin-top: 0 !important;
    }
}
```