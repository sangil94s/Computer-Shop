import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function GetVOC() {
  return (
    <>
      <Card className="w-10/12 my-1">
        <CardHeader>
          <CardTitle>익명 문의 조회</CardTitle>
          <CardDescription>X건의 익명 문의가 있어요</CardDescription>
        </CardHeader>

        <div className="flex justify-center my-1">
          <Link href="/admin/voc">
            <Button>자세히 보기</Button>
          </Link>
        </div>
      </Card>
    </>
  );
}
