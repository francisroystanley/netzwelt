type RawTerritory = {
  id: string;
  name: string;
  parent: string | null;
};

type Territory = RawTerritory & {
  children?: Territory[];
};

type TerritoriesMap = {
  [key: string]: Territory;
};

type User = {
  username: string;
  displayName: string;
  roles: string[];
};
