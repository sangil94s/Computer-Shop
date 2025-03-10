// 아마도 상품 필터가 배치되는 부분?
'use client';
import { Badge } from '@/components/ui/badge';

interface ProductFilterProps {
  onCategoryChange: (category: string | null) => void;
}

export default function ProductFilter({ onCategoryChange }: ProductFilterProps) {
  const categories = ['Monitor', 'CPU', 'SSD', 'HDD', 'VGA', 'RAM'];

  return (
    <div className="flex flex-row m-1 gap-1">
      <Badge variant="outline" className="cursor-pointer" onClick={() => onCategoryChange(null)}>
        전체
      </Badge>
      {categories.map(category => (
        <Badge key={category} variant="outline" className="cursor-pointer" onClick={() => onCategoryChange(category)}>
          {category}
        </Badge>
      ))}
    </div>
  );
}
