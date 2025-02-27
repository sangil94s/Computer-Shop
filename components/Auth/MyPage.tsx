// MyPage 목적의 컴포넌트
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '../ui/input';

export default function MyPage() {
  return (
    <div className="w-10/12 flex flex-col justify-center m-auto my-2">
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-xl py-1">사용자 마이 페이지</CardTitle>
        </CardHeader>
        <CardContent>
          <h4 className="py-1 font-bold">사용자 ID</h4>
          <Input placeholder="사용자 ID가 들어가는 부분" />

          <h4 className="py-1 font-bold">사용자 가입일</h4>
          <Input placeholder="사용자 가입일 시간 정보 들어가는 부분" />
        </CardContent>
      </Card>
    </div>
  );
}
