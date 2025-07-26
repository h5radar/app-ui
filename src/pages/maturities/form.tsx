import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/ui/form";
import { Input } from "@/ui/input";
import { Textarea } from "@/ui/textarea";

import { maturitiesSchema } from "@/schemas/maturity";

interface MaturityFormProps {
  defaultDataForm?: z.infer<typeof maturitiesSchema>;
  onSubmit: (values: z.infer<typeof maturitiesSchema>) => void;
  disabled: boolean;
}

/**
 * MaturityForm is ... .
 */
export const MaturityForm: React.FC<MaturityFormProps> = ({
  defaultDataForm,
  onSubmit,
  disabled,
}: MaturityFormProps) => {
  const form = useForm<z.infer<typeof maturitiesSchema>>({
    resolver: zodResolver(maturitiesSchema),
    defaultValues: defaultDataForm || {
      id: 0,
      title: "",
      description: "",
      position: 0,
      color: "",
    },
  });

  /**
   * Function to handle submit. Important to prevent the default action
   * before execute onSubmit handler.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    form.handleSubmit((data) => {
      onSubmit(data);
    })();
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-8">
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem className="hidden">
              <FormLabel>id</FormLabel>
              <FormControl>
                <Input id="id" type="hidden" placeholder="id" {...field} />
              </FormControl>
              <FormDescription>This is maturity id</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  id="title"
                  placeholder="title"
                  {...field}
                  onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                />
              </FormControl>
              <FormDescription>This is maturity title</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea id="description" placeholder="descripton" {...field} />
              </FormControl>
              <FormDescription>This is maturity descripton</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Position</FormLabel>
              <FormControl>
                <Input
                  id="position"
                  type="number"
                  min={0}
                  max={3}
                  placeholder="0"
                  {...field}
                  value={field.value ?? 0}
                  {...form.register("position", {
                    setValueAs: (v) => Number(v),
                  })}
                />
              </FormControl>
              <FormDescription>This is maturity position</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color</FormLabel>
              <FormControl>
                <div className="z-5 relative w-16 h-16 rounded-full border border-input cursor-pointer overflow-hidden">
                  <input
                    id="color"
                    type="color"
                    placeholder="color"
                    {...field}
                    className="z-1 absolute w-20 h-20 cursor-pointer -top-2 -left-2 "
                  />
                </div>
              </FormControl>
              <FormDescription>This is maturity color</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className={disabled ? "cursor-progress" : "cursor-pointer"} disabled={disabled}>
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default MaturityForm;
