import { Component } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent {
  existingRootTerritories: { [key: string]: boolean } = {};
  raw_territories = [
    {
      id: "1",
      name: "Metro Manila",
      parent: null,
    },
    {
      id: "101",
      name: "Manila",
      parent: "1",
    },
    {
      id: "10101",
      name: "Malate",
      parent: "101",
    },
    {
      id: "10102",
      name: "Ermita",
      parent: "101",
    },
    {
      id: "10103",
      name: "Binondo",
      parent: "101",
    },
  ];
  territories: Territory[] = [];

  ngOnInit() {
    const territoriesMap = this.raw_territories.reduce((obj, val) => {
      obj[val.id] = val;

      return obj;
    }, {} as TerritoriesMap);

    this.raw_territories.forEach((raw_territory) => {
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
  }
}
