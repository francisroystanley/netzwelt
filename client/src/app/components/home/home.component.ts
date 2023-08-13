import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  existingRootTerritories: { [key: string]: boolean } = {};
  loading = true;
  territories: Territory[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get<{ data: RawTerritory[] }>("/api/territories")
      .subscribe(({ data }) => {
        const territoriesMap = data.reduce((obj, val) => {
          obj[val.id] = val;

          return obj;
        }, {} as TerritoriesMap);

        data.forEach((raw_territory) => {
          let rootParent = raw_territory;

          while (rootParent.parent) {
            const newRootParent = territoriesMap[rootParent.parent];

            if (!newRootParent.children) newRootParent.children = [];

            const isExist = newRootParent.children.some(
              (item) => item.id === rootParent.id
            );

            if (!isExist) newRootParent.children.push(rootParent);

            rootParent = newRootParent;
          }

          if (!this.existingRootTerritories[rootParent.id]) {
            this.territories.push(rootParent);
            this.existingRootTerritories[rootParent.id] = true;
          }
        });

        this.loading = false;
      });
  }
}
