import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"
import { useState } from "react";
function Collapsible({
  defaultOpen,
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Root> & {defaultOpen : boolean}) {
  const [open, setOpen] = useState(defaultOpen);

  return <CollapsiblePrimitive.Root open={open} onOpenChange={setOpen}  data-slot="collapsible" {...props} />
}

function CollapsibleTrigger({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>) {
  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      data-slot="collapsible-trigger"
      {...props}
    />
  )
}

function CollapsibleContent({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>) {
  return (
    <CollapsiblePrimitive.CollapsibleContent
      data-slot="collapsible-content"
      {...props}
    />
  )
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
