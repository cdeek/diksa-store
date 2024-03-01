import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function AccordionDetails({description}) {
 return (
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Description</AccordionTrigger>
          <AccordionContent>
            {description}
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-2">
          <AccordionTrigger>Features</AccordionTrigger>
          <AccordionContent>
            Yes. It comes with default styles that matches the other
             aesthetic.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-3">
          <AccordionTrigger>Reviews</AccordionTrigger>
          <AccordionContent>
            Yes. It&apos;s animated by default, but you can disable it if you
            prefer.
          </AccordionContent>
        </AccordionItem>
    </Accordion>
  )
}