export type Player = {
    id: number;
    firstName: string;
    lastName: string;
    position?: string | null;
    birthday?: string | null;
    capNumber?: number | null
  };
  
  export type PlayerWithCapNumber = {
    id: number;
    name: string;
    capNumber: number;
  };
  
  export type Roster = PlayerWithCapNumber[];
  
  export type StartingLineup = number[]; // array of player IDs