import { createFeatureSelector } from "@ngrx/store";
import { companysFeatureKey, CompanyState } from "./company.entity";

export const selectCompanyState = createFeatureSelector<CompanyState>(
  companysFeatureKey
);
