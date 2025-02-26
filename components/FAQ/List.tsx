// FAQ List Components

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function FaqList() {
  return (
    <div className="flex flex-col justify-center items-center">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>고객문의 관련</AccordionTrigger>
          <AccordionContent>고객문의 관련 답변 부분</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
