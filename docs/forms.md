# Form Implementation Guide

> **Standard**: We use **React Hook Form** + **Zod** + **shadcn/ui** components.
> **Goal**: Type-safe, accessible, and consistent forms.

## 1. Schema Definition
Define the Zod schema first. This drives the types and validation.

```tsx
import { z } from "zod";

export const createOrganizationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  domain: z.string().url("Must be a valid URL"),
  type: z.enum(["coop", "union"]),
});

export type CreateOrganizationFormValues = z.infer<typeof createOrganizationSchema>;
```

## 2. Component Structure
Use the `Form` components from `@/components/ui/form`.

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const AddOrganizationForm = () => {
  // 1. Initialize Form
  const form = useForm<CreateOrganizationFormValues>({
    resolver: zodResolver(createOrganizationSchema),
    defaultValues: {
      name: "",
      domain: "",
    },
  });

  // 2. Handle Submit
  const onSubmit = (data: CreateOrganizationFormValues) => {
    console.log(data);
    // Call mutation here
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Name Field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organization Name</FormLabel>
              <FormControl>
                <Input placeholder="Acme Corp" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Domain Field */}
        <FormField
          control={form.control}
          name="domain"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Domain</FormLabel>
              <FormControl>
                <Input placeholder="https://..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
```

## 3. Integration with Mutations
Wrap the submit handler with your custom hook mutation.

```tsx
const { mutate, isPending } = useAddOrganization();

const onSubmit = (data: CreateOrganizationFormValues) => {
  mutate(data, {
    onSuccess: () => {
      form.reset();
      setIsOpen(false); // If in dialog
    },
  });
};
```
