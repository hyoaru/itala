import type { AnyFieldApi } from "@tanstack/react-form";

export const getFieldError = (field: AnyFieldApi) => {
  const { isTouched, isValid, errors } = field.state.meta;
  const isInvalid = isTouched && !isValid;

  const errorMessage = isInvalid
    ? errors
        ?.map((e) => e?.message)
        .filter(Boolean)
        .join(", ")
    : "";

  return { isInvalid, errorMessage };
};
