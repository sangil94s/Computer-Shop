// 아마도 상품 필터가 배치되는 부분?
import { Badge } from '@/components/ui/badge';

export default function ProductFilter() {
  return (
    <div className="flex flex-row m-1 gap-1">
      <Badge variant="outline" className="cursor-pointer">
        전체
      </Badge>
      <Badge variant="outline" className="cursor-pointer">
        모니터
      </Badge>
      <Badge variant="outline" className="cursor-pointer">
        CPU
      </Badge>
      <Badge variant="outline" className="cursor-pointer">
        SSD
      </Badge>
      <Badge variant="outline" className="cursor-pointer">
        HDD
      </Badge>
    </div>
  );
}
