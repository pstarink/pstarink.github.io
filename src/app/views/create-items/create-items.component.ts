import { Component, OnInit } from "@angular/core"
// import { fadeInUp400ms } from "@shared/animations/fade-in-up.animation"
// import { stagger40ms } from "@shared/animations/stagger.animation"
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms"
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy"
import { Container, ContainerModel, Lookup, Well } from "@shared/entities"
import { Picklists, Profile } from "@shared/models"
import { PyramidService } from "@app/services"
import * as _ from "lodash"
import { Check } from "@shared"
import { BarcodeLabel, LabelTemplate, PrinterType } from "@shared/barcdode"
import { ConfirmationService, Message, MessageService } from 'primeng/api'
import { NotifyService } from "@components"
import { BizService, StoreService } from "@services"

@UntilDestroy()
@Component({
  selector: 'app-create-labels',
  templateUrl: './create-items.component.html',
  styleUrls: ['./create-items.component.scss'],
  providers: [ConfirmationService, MessageService],
  // animations: [fadeInUp400ms, stagger40ms]
})
export class CreateItemsComponent implements OnInit {
  profile: Profile;
  picklists: Picklists = null;
  containerDefs: ContainerModel[] = [];
  form: UntypedFormGroup;

  theList: Lookup = null;
  itemSets = [];

  msgs: Message[] = [];

  cols = [
    { field: "barcode", header: "Barcode", render: row => this.biz.toBarcode(row.barcode) },
    { field: "part", header: "Part", render: row => `${row.picklist.name}.${row.option.name}` },
    { field: "count", header: "Count" },
    { field: "title", header: "Title" },
    { field: "details1", header: "Details" },
    { field: "details2", header: "Details" },
    { field: "format", header: "Format", render: row => row.format?.name },
    { field: "printer", header: "Printer", render: row => row.printer?.name },
    { type: "icon", field: "icon_delete", icon: "delete", wd: 30, click: (action, row) => this.onClick(action, row) },
  ]

  constructor(
    public pyramid: PyramidService,
    private store: StoreService,
    private biz: BizService,
    private fb: UntypedFormBuilder,
    private ns: NotifyService,
    private ms: MessageService
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.store.profile$.pipe(untilDestroyed(this)).subscribe(profile => this.profile = profile);
    this.store.picklists$.pipe(untilDestroyed(this)).subscribe(picklists => this.picklists = picklists);

    this.form = this.fb.group({
      picklist: [null, [Validators.required]],
      option: [null, [Validators.required]],
      count: [1, [...Check.Range(1, 1000, true)]],
      title: ["PCR Plate", [...Check.Text(30, true)]],
      details1: ["PRJ-01a5", [...Check.Text(30, false)]],
      details2: ["BRCA", [...Check.Text(30, false)]],
      format: [null, []],
      printer: [null, []],
    });

    this.containerDefs = await this.pyramid.list("ContainerModels");
  }

  // called when labels are removed from the worklist
  onClick(action, row) {
    this.ns.message(`${row.count} labels removed from worklist`);
    this.itemSets = this.itemSets.filter(set => set != row);
  }

  async addItems() {
    if (!this.form.invalid) {
      const model = this.form.value;
      const set = {
        barcode: await this.biz.reserveBarcodes(model.count),
        ...model
      }
      this.itemSets = [...this.itemSets, set]
      this.ns.message("ITEMS ADDED")
    }
  }

  // create the items and labels in the worklist
  async create() {
    // expand the item sets into a list of items
    const items = [];
    this.itemSets.forEach((set) => {
      const base: number = this.biz.fromBarcode(set.barcode)
      for (let i = 0; i < set.count; i++) {
        items.push({
          barcode: this.biz.toBarcode(base + i),
          picklist: set.picklist,
          option: set.option,
          title: set.title,
          data: [set.details1, set.details2],
          format: set.format,
          printer: set.printer
        })
      }
    })

    // print the labels
    const labels = items.filter(item => item.format && item.printer)
    if (labels.length > 0) {
      try {
        const resp = await this.ns.confirm(
          "Print Labels",
          (labels.length === 1
            ? `Do you want to print the label now?`
            : `Do you want to print the ${labels.length} labels now?`)
        )
        if (resp) {
          this.printLabels(labels)
          const success = await this.ns.confirm("Print Labels", (labels.length == 1
            ? "Now printing the label..."
            : `Now printing ${labels.length} labels...`) +
            `<br/><br/> Check the printer ... did the ${this.pl("label", labels.length)} print correctly?`);
          if (!success) {
            // printing failed: retry, skip, abort
            throw new Error()
          }
        }
      } catch (e) {
        await this.ns.alert("Print Labels", "Printing failed. Any labels that were printed should be discarded. The items have not been created. Check the printer problem and try again.")
      } finally {
        this.ns.close()
      }
    }

    try {
      this.ns.message(`Creating ${items.length} new ${this.pl("item", items.length)}`)
      await this.createItems(items)
      this.itemSets = []
    } finally {
      setTimeout(() => this.ns.close(), 250)
    }
  }

  pl(word: string, n: number) {
    return word + (n == 1 ? "" : "s")
  }

  public printLabels(labels) {
    labels.forEach(label => {
      const lbl = new BarcodeLabel(LabelTemplate.Tube, label.barcode, label.name, label.data)
      lbl.printLabel(PrinterType.Zebra300)
    })
  }

  async createItems(items) {
    try {
      const groups = this.groupBy(items, items => items.picklist.key)
      groups.forEach(async (items, category) => {
        // containers
        if (category.startsWith("Container")) {
          await this.createContainers(items)
          console.log("Containers created!")
        }
        // instruments
        else if (category.startsWith("Instrument")) {
          //
        }
        // locations
        else if (category.startWith("Location")) {
          //
        }
        // holders
        else if (category.startWith("Holder")) {
          //
        }
      })
    } catch (e) {
      this.ns.alert("Error", `Error creating containers:<br>${e.message}`)
    }
  }

  groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
      const key = keyGetter(item)
      const collection = map.get(key)
      if (!collection) {
        map.set(key, [item])
      } else {
        collection.push(item)
      }
    })
    return map
  }

  // Create new containers
  async createContainers(items): Promise<any> {
    const requests = []
    const pl = this.picklists
    const ts = new Date().toISOString()
    items.forEach(item => {
      const cd = this.containerDefs.find(def => def.containerType === item.option.id)
      // check cd not null
      const container = new Container({
        barcode: item.barcode,
        containerModelId: cd?.id ?? 0,
        containerState: pl.idByKey("ContainerState|Created"),
        containerStatus: pl.idByKey("ContainerStatus|Valid"),
        wells: [],
      })
      for (let row = 0; row < cd?.wellRows; row++) {
        for (let col = 0; col < cd?.wellCols; col++) {
          container.wells.push(new Well({
            row,
            col,
            wellStatus: pl.idByKey("WellStatus|Valid"),
          }))
        }
      }
      console.log(`Saving container ${container.barcode}`)
      requests.push(this.biz.saveContainer(container))
    })
    return Promise.all(requests)
  }

  async cancel() {
    if (this.itemSets.length > 0) {
      const resp = await this.ns.confirm("Clear Worklist", "Are you sure you want to remove all worklist items?");
      if (resp) {
        this.itemSets.length = 0;
      }
    }
  }

  async removeItem(row) {
    _.remove(this.itemSets, row);
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
