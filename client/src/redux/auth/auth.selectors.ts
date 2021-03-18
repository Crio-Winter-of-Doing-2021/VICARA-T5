import { createSelector } from "reselect";
import { AuthReducer } from "./auth.types";

export const selectUser = (state: any): AuthReducer => state.auth;

export const selectUserId = createSelector(
  [selectUser],
  (auth): string => auth.uid || ""
);

export const selectProviderId = createSelector(
  [selectUser],
  (auth) => auth.providerId || ""
);

export const selectDisplayName = createSelector(
  [selectUser],
  (auth): string => auth.displayName || ""
);
export const selectEmail = createSelector(
  [selectUser],
  (auth): string => auth.email || ""
);
export const selectPhotoURL = createSelector(
  [selectUser],
  (auth) => auth.photoURL || ""
);

export const selectEmailVerified = createSelector(
  [selectUser],
  (auth): boolean => auth.emailVerified
);
