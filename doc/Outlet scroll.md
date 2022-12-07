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
