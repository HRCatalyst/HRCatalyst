import { createFeatureSelector } from "@ngrx/store";
import { companysFeatureKey, CompanyState } from "./../entities/company.entity";

export const selectCompanyState = createFeatureSelector<CompanyState>(
  companysFeatureKey
);
