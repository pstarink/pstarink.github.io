import { Component, OnInit } from '@angular/core';
import { PyramidService } from '@services';

@Component({
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss'],
})
export class DashComponent implements OnInit {

  panels = [
    {
      title: "ADMIN",
      steps: [
        {
          title: "Lookups",
          description: "Manage lookups and picklists",
          icon: "category",
          link: "/lookups"
        },
        {
          title: "Lookups",
          description: "Manage lookups and picklists",
          icon: "published_with_changes",
          link: "/manage-lookups"
        },
        {
          title: "Users",
          description: "Manage Pyramid Users",
          icon: "people",
          link: "/users"
        },
        {
          title: "Edit Data",
          description: "Directly edit database tables using custom UI components",
          icon: "table_chart",
          link: "/edit-data"
        }
      ]
    },
    {
      title: "MANAGER",
      steps: [
        {
          title: "Storage",
          description: "Manage the storage hierarchy",
          icon: "kitchen",
          link: "/storage"
        },
        {
          title: "Storage",
          description: "Manage the storage hierarchy",
          icon: "inventory_2",
          link: "/manage-storage"
        },
        {
          title: "Recipes",
          description: "Manage recipes and consumables",
          icon: "blender",
          link: "/manage-recipes"
        },
        {
          title: "Containers",
          description: "Browse containers and content",
          icon: "view_compact",
          link: "/containers"
        },
      ]
    },
    {
      title: "WORKFLOW",
      steps: [
        {
          title: "Items & Labels",
          description: "Create new items, such as containers and tools, and optionally print their barcode labels",
          icon: "qr_code_2",
          link: "/create-items"
        },
        {
          title: "Contents",
          description: "Create well contents using samples and reagens",
          icon: "water_drop",
          link: "/set-contents"
        },
        {
          title: "Aliquot",
          description: "Aliquot a consumable from one container to one or more other containers",
          icon: "bloodtype",
          link: "/aliquot"
        }
      ]
    }
  ]

  constructor(
    // private breadcrumbService: BreadcrumbService,
    private pyramid: PyramidService) {
    // this.breadcrumbService.setItems([
    //   { label: 'Dashboard', routerLink: ['/'] }
    // ]);
  }

  async ngOnInit() {
    // init
    const v = await this.pyramid.readSetting("barcode")
    console.log(v)
  }
}
