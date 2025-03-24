// src/branchData.ts

export interface Branch {
  branchName: string;
  manager: string;
  orderedProducts: number;
}

export const branchList: Branch[] = [
  {
    branchName: "Top Juan Makati",
    manager: "Mark Dimaano",
    orderedProducts: 12000,
  },
  {
    branchName: "Top Juan Batangas",
    manager: "Andres Reyes",
    orderedProducts: 120000,
  },
  {
    branchName: "Top Juan Quezon",
    manager: "Carlos Ramirez",
    orderedProducts: 5000,
  },
  {
    branchName: "Top Juan Mandaluyong",
    manager: "Alicia Gonzales",
    orderedProducts: 3456,
  },
  {
    branchName: "Top Juan Rosario ",
    manager: "Eduardo Cruz",
    orderedProducts: 120,
  },
  {
    branchName: "Top Juan Batangas Rizal Ave",
    manager: "Catherine Morales",
    orderedProducts: 250,
  },
  {
    branchName: "Top Juan San JUan",
    manager: "Javier Bautista",
    orderedProducts: 260,
  },
];
