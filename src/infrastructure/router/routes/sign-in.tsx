import type { IdentityProviderInvalidCredentialsError } from "@/application/ports/identity-provider";
import { SignIn } from "@/application/use-cases";
import { useDependencies } from "@/infrastructure/dependencies/context";
import { getFieldError } from "@/infrastructure/forms";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, NotebookPen } from "lucide-react";
import { useState } from "react";
import { z } from "zod";

export const Route = createFileRoute("/sign-in")({
  component: RouteComponent,
});

const { fieldContext, formContext } = createFormHookContexts();

const { useAppForm } = createFormHook({
  fieldComponents: {
    TextField,
  },
  formComponents: {
    Button,
  },
  fieldContext,
  formContext,
});

function RouteComponent() {
  const { useCaseBus, identityProvider } = useDependencies();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useAppForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onChange: z.object({
        email: z.email(),
        password: z.string(),
      }),
    },
    onSubmit: async ({ value }) => {
      setSubmitError(null);
      try {
        await useCaseBus.dispatch(
          new SignIn(identityProvider, {
            email: value.email,
            password: value.password,
          }),
        );
      } catch (error) {
        if (
          (error as IdentityProviderInvalidCredentialsError).name ===
          "IdentityProviderError"
        ) {
          setSubmitError("Incorrect email or password.");
        } else {
          setSubmitError("Something went wrong. Please try again.");
        }
      }
    },
  });

  return (
    <>
      <div className="w-full space-y-8">
        <div className="relative flex w-full items-center justify-center text-3xl">
          <div className="absolute flex w-full justify-start">
            <Link to="/" className="button button--icon button--secondary">
              <ArrowLeft className="" />
            </Link>
          </div>
          <span className="inline-flex items-center gap-1">
            <NotebookPen className="bg-accent h-[1em] w-[1em] rounded-xl p-0.5" />
            <span className="font-heading font-semibold">ITALA</span>
          </span>
        </div>
        <div className="flex flex-col items-center">
          <p className="font-heading text-2xl font-medium">Welcome back</p>
          <p className="text-muted text-sm">
            Sign in to pick up where you left off.
          </p>
        </div>
        <Form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit(e);
          }}
        >
          <form.AppField name="email">
            {(field) => {
              const { isInvalid, errorMessage } = getFieldError(field);
              return (
                <field.TextField isInvalid={isInvalid}>
                  <Label>Email address</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    variant="secondary"
                    placeholder="John.doe@email.com"
                  />
                  <FieldError>{errorMessage}</FieldError>
                </field.TextField>
              );
            }}
          </form.AppField>

          <form.AppField name="password">
            {(field) => {
              const { isInvalid, errorMessage } = getFieldError(field);
              return (
                <field.TextField isInvalid={isInvalid}>
                  <Label>Password</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    type="password"
                    variant="secondary"
                    placeholder="Enter your password"
                  />
                  <FieldError>{errorMessage}</FieldError>
                </field.TextField>
              );
            }}
          </form.AppField>

          <p className="text-muted text-end text-xs underline">
            Forgot password?
          </p>

          {submitError && <p className="text-danger text-xs">{submitError}</p>}

          <form.AppForm>
            <form.Button type="submit" className="w-full">
              Continue to Workspace
            </form.Button>
          </form.AppForm>
        </Form>
      </div>
    </>
  );
}
