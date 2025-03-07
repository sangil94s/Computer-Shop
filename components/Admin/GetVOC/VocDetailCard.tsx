// VOC를 카드 형태로 보여줍니다
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import dayjs from 'dayjs';
import VocDetailRemoveButton from './VocDetailRemoveButton';
import Nodata from '@/components/common/Nodata';

interface VOCType {
  id: number;
  title: string;
  category: string;
  description: string;
  createDate: string;
}

async function getDatas() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DEPLOY_URL}/api/voc`, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error('데이터 호출 실패');
  }

  return res.json();
}
export default async function VocDetailCard() {
  const getData = await getDatas();

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-4 justify-items-center w-full">
        {getData.data &&
          getData.data.map((item: VOCType) => (
            <Card key={item.id} className="my-1">
              <CardHeader>
                <CardTitle>Title: {item.title}</CardTitle>
                <CardDescription>Category: {item.category}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="prose" dangerouslySetInnerHTML={{ __html: item.description }} />
              </CardContent>
              <CardFooter>
                <p className="text-sm font-bold py-2">생성일 : {dayjs(item.createDate).format('YYYY-MM-DD HH:mm')}</p>
              </CardFooter>
              <VocDetailRemoveButton ids={item.id} />
            </Card>
          ))}
      </div>
      {getData.data && getData.data.length === 0 && <Nodata />}
    </>
  );
}
