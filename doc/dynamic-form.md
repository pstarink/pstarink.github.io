DynamicForm takes a list of UI control descriptions and a model with values
While the user is interacting with the form, the model is updated and a formValid flag is emitted each time a control value changes

A control has a type:
text, password, email, search, tel, url
textarea, checkbox, select, fk, number, date

Each control has optional validators:
min, max, required, requiredTrue, email,
minLength, maxLength, pattern, nullValidator

DialogService is passed
NotifyComponent component to pop up
data configuration options
... styling options

NotifyComponent
ref reference to the dialog
dlg dialog config with data
If model is passed, clone it into local model
If dynamicForm is passed, adjust date format

DynamicFormConfig is passed to the Notify Service
Notify Service creates a reactive form and binds the data
Form creates a dynamic dialog using the Notify Component passing in the form
The Notify Component displays the dialog which contains the DynamicForm component
The DynamicForm component renders the form controls and attaches event handlers
Every time a value changes, a form valid event is emitted
Upon submit, the form values are passed back to the caller of the service
