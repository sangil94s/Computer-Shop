// FAQ List Components

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
interface FAQTypes {
  id: number;
  category: string;
  title: string;
  description: string;
  createDate: string;
}
async function getFaqDatas() {
  const res = await fetch('http://localhost:3000/api/faq', { cache: 'no-store' });

  if (!res.ok) {
    throw new Error('데이터 호출 실패');
  }

  return res.json();
}

export default async function FaqList() {
  const getFaqData = await getFaqDatas();

  return (
    <div className="flex flex-col justify-center items-center">
      {getFaqData &&
        getFaqData.data.map((item: FAQTypes) => (
          <Accordion key={item.id} type="single" collapsible className="w-11/12 my-2">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                {item.category}-{item.title}
              </AccordionTrigger>
              <AccordionContent>{item.description}</AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
    </div>
  );
}
