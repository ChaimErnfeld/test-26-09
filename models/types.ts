export interface Beeper {
  id: String;
  name: String;
  status: string;
  created_at: Date;
  detonated_at?: Date;
  latitude?: Number;
  longitude?: Number;
}

// export enum statuses {
//   manufactured = "manufactured",
//   assembled = "assembled",
//   shipped = "shipped",
//   deployed = "deployed",
//   detonated = "detonated",
// }

export const statuses: string[] = [
  "manufactured",
  "assembled",
  "shipped",
  "deployed",
  "detonated",
];
