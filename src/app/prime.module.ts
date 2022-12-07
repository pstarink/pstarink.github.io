import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DragDropModule } from "@angular/cdk/drag-drop"
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { ButtonModule } from 'primeng/button'
import { CalendarModule } from 'primeng/calendar'
import { CardModule } from 'primeng/card'
import { CascadeSelectModule } from 'primeng/cascadeselect'
import { ChartModule } from 'primeng/chart'
import { CheckboxModule } from 'primeng/checkbox'
import { ContextMenuModule } from 'primeng/contextmenu'
import { ConfirmDialogModule } from 'primeng/confirmdialog'
import { DialogModule } from 'primeng/dialog'
import { DropdownModule } from 'primeng/dropdown'
import { DynamicDialogModule } from 'primeng/dynamicdialog'
import { FieldsetModule } from 'primeng/fieldset'
import { InputNumberModule } from 'primeng/inputnumber'
import { InputTextModule } from 'primeng/inputtext'
import { InputTextareaModule } from 'primeng/inputtextarea'
import { MenuModule } from 'primeng/menu'
import { MultiSelectModule } from 'primeng/multiselect'
import { OverlayPanelModule } from 'primeng/overlaypanel'
import { SplitterModule } from 'primeng/splitter'
import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table'
import { TabViewModule } from 'primeng/tabview'
import { ToastModule } from 'primeng/toast'
import { ToolbarModule } from 'primeng/toolbar'
import { TreeModule } from 'primeng/tree'
import { TreeTableModule } from 'primeng/treetable'
import { InputSwitchModule } from 'primeng/inputswitch'
import { AccordionModule } from 'primeng/accordion'
import { DividerModule } from 'primeng/divider'

const Modules = [
  CommonModule,
  DragDropModule,
  FormsModule,
  ReactiveFormsModule,
  //
  AccordionModule,
  ButtonModule,
  CalendarModule,
  CardModule,
  CascadeSelectModule,
  ChartModule,
  CheckboxModule,
  ContextMenuModule,
  ConfirmDialogModule,
  DialogModule,
  DividerModule,
  DropdownModule,
  DynamicDialogModule,
  FieldsetModule,
  InputNumberModule,
  InputSwitchModule,
  InputTextareaModule,
  InputTextModule,
  MenuModule,
  MultiSelectModule,
  OverlayPanelModule,
  SplitterModule,
  TagModule,
  TableModule,
  TabViewModule,
  ToastModule,
  ToolbarModule,
  TreeModule,
  TreeTableModule,
]

@NgModule({
  imports: [...Modules],
  exports: [...Modules]
})
export class PrimeModule { }
