Lookups have the following fields:

id
parentId
key
name
roleType
isItem
isEnabled

The id is the unique id of the lookup. The parentId is 0 for picklists and reference the picklist id for options.

The key is a unique text id for the lookup, and can be joined using a pipe symbol to indicate a specific option, for example 'Role|Admin'.

The name is displayed in the UI for that lookup.

The key can be subtyped using the dot notation. For example, Container can be subtyped into
Container.384Well
Container.96Well
Container.Dish
Container.Tube
When a container type is requested, e.g. when creating new items, a cascading select can be used to group the options. In other cases, when a specific container is needed, such as a Dish, it can be typed as such.

The roleType indicates which roles can see or manipulate the picklist.

When isItem is true, a label can be printed.

A picklist or option can be disabled by setting isEnabled to false.
