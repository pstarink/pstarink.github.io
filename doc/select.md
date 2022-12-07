Select bind data may be passed in the following formats:

### Simple

```javascript
options: [name, name];
```

model: name | [name, name]

### Options

```typescript
options: [
    { name, id },
    { name, id },
];
```

model: id | [id, id]

### Picklist

```typescript
options: [
    name,
    options: [
        { name, id },
        { name, id }
    ]
]
```

model: id | [id, id]

### Cascade

Passed as a list of picklists.

```javascript
options: [
    options: [
        {
            name,
            options: [
                { name, id },
                { name, id }
            ]
        },
        {
            name,
            options: [
                { name, id },
                { name, id }
            ]
        }
    ]
]
```

model: id

The model is the `id` of the selected option, or the `name` for the `Simple` format. For non-cascading selects
Primeng select binds to the `Options list` format or the `Cascading picklist` format.
