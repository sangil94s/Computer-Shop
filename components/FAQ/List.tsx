// FAQ List Components
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FAQListTypes } from '@/types/types';
import Nodata from '../common/Nodata';
import FaqRemoveButton from './FaqRemoveButton';

async function getFaqDatas() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DEPLOY_URL}/api/faq`, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error('데이터 호출 실패');
  }

  return res.json();
}

export default async function FaqList({ id }: { id: string }) {
  const getFaqData = await getFaqDatas();

  return (
    <div className="flex flex-col justify-center items-center">
      {getFaqData &&
        getFaqData.data.map((item: FAQListTypes) => (
          <Accordion key={item.id} type="single" collapsible className="w-11/12 my-2">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                {item.category}-{item.title}
              </AccordionTrigger>
              <AccordionContent>
                <div className="prose" dangerouslySetInnerHTML={{ __html: item.description }} />
                <FaqRemoveButton id={Number(item.id)} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      {getFaqData.data.length === 0 && <Nodata />}
    </div>
  );
}
