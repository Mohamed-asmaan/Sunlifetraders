import type { ProductCategory } from "./types";

export const productCategories: { label: string; value: ProductCategory }[] = [
  { label: "Photovoltaic (PV)", value: "pv" },
  { label: "Inverter", value: "inverter" },
  { label: "Roof-Top Power Plant", value: "rooftop" },
  { label: "Structure Materials", value: "structure" },
  { label: "BOS Materials", value: "bos" },
  { label: "Solar Water Heater", value: "heater" },
];
