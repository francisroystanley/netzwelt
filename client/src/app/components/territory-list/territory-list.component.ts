import { Component, Input } from "@angular/core";

@Component({
  selector: "app-territory-list",
  templateUrl: "./territory-list.component.html",
  styleUrls: ["./territory-list.component.scss"],
})
export class TerritoryListComponent {
  @Input() territories: Territory[] = [];
}
