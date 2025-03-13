// 아마도 상품 카테고리 별 얼마나 있는지 그래프로 보여주는 목적

'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { useQuery } from '@tanstack/react-query';

const fetchCategoryCount = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DEPLOY_URL}/api/product/admins`);
  if (!res.ok) throw new Error('데이터 호출 실패');
  return res.json();
};

export function ProductCategoryChart() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['categoryCounts'],
    queryFn: fetchCategoryCount,
    staleTime: 1000 * 60 * 5,
  });

  const chartData = data ? Object.entries(data).map(([category, count]) => ({ category, count })) : [];

  const chartConfig = {
    count: {
      label: '각 카테고리 별 상품 수량',
      color: '#2563eb',
    },
  } satisfies ChartConfig;

  return (
    <div className="w-10/12 flex flex-col justify-center items-center border">
      <h1 className="text-ceter text-violet-600 font-bold">각 카테고리 별 상품 수량</h1>
      {isLoading && <p>데이터 로딩 중...</p>}
      {isError && <p>데이터를 불러오는 중 오류가 발생했습니다.</p>}
      {!isLoading && !isError && (
        <ChartContainer config={chartConfig} className="min-h-[200px] w-6/12">
          <BarChart accessibilityLayer width={400} height={300} data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={value => value}
            />
            <YAxis allowDecimals={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="count" fill="#2563eb" radius={4} />
          </BarChart>
        </ChartContainer>
      )}
    </div>
  );
}
