import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

async function getCountDatas() {
  const res = await fetch('http://localhost:3000/api/voc/allcount', { cache: 'no-store' });

  if (!res.ok) {
    throw new Error('데이터 호출 실패');
  }

  return res.json();
}

export default async function GetVOC() {
  const getCountData = await getCountDatas();

  return (
    <>
      <Card className="w-10/12 m-1">
        <CardHeader>
          <CardTitle>익명 문의 조회</CardTitle>
          <CardDescription>
            {getCountData.data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}건의 익명 문의가 있어요
          </CardDescription>
        </CardHeader>

        <div className="flex justify-center items-center my-1">
          <Link href="/admin/voc">
            <Button>자세히 보기</Button>
          </Link>
        </div>
      </Card>
    </>
  );
}
