export class DynamicFormValidators {
    min?: number
    max?: number
    required?: boolean
    requiredTrue?: boolean
    email?: boolean
    minLength?: boolean
    maxLength?: boolean
    pattern?: string
    nullValidator?: boolean
}

export class DynamicFormControl {
    type:
        'text' |
        'password' |
        'email' |
        'search' |
        'tel' |
        'url' |
        //
        'textarea' |
        'checkbox' |
        'select' |
        'fk' |
        'number' |
        'date' = 'text'
    key: string
    name: string
    label: string
    icon?: string
    prompt?: string = ""
    value?: string

    // textarea
    rows?: number = 1

    min?: string
    max?: string
    step?: string
    options?: any

    // allow multiple options to be picked
    multi?: boolean = false
    cascade?: boolean = false

    // date: date with optional time, time, or date range
    dateMode?: "single" | "range" = "single"
    showTime?: boolean = false
    showSeconds?: boolean = false

    readonly?: boolean = false
    validators: DynamicFormValidators

    constructor(some?: Partial<DynamicFormControl>) {
        Object.assign(this, some)
    }
}
