
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { companysFeatureKey, CompanyState } from "./../entities/company.entity";

export const selectCompanyState = createFeatureSelector<CompanyState>(
  companysFeatureKey
);

export const selectCompanyAssociates = createSelector(
  selectCompanyState,
  (state: CompanyState) => state?.associates);
