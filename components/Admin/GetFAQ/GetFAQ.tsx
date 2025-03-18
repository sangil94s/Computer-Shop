import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

async function getCountDatas() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DEPLOY_URL}/api/faq/allcount`, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error('데이터 호출 실패');
  }

  return res.json();
}

export default async function GetFAQ() {
  const getCountData = await getCountDatas();

  return (
    <>
      <Card className="w-10/12 m-1">
        <CardHeader>
          <CardTitle>모든 FAQ 수량 조회</CardTitle>
          <CardDescription>
            {getCountData.data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}건의 익명 문의가 있어요
          </CardDescription>
        </CardHeader>
      </Card>
    </>
  );
}
