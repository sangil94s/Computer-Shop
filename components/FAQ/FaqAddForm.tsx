'use client';
import { Button } from '../ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

// 아마도 FAQ를 작성하는 Form 역할

export default function FaqAddForm() {
  return (
    <>
      <form className="flex flex-col justify-center items-center m-auto my-1 w-6/12 min-h-screen">
        <h1 className="text-center text-2xl font-bold py-2">FAQ 작성 예제</h1>

        <div className="my-2">
          {' '}
          {/* Select 부분 수정 필요함 */}
          <label className="py-1 font-bold text-base">카테고리를 선택하시오</label>
          <Select>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select a timezone" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>North America</SelectLabel>
                <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
                <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
                <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
                <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
                <SelectItem value="akst">Alaska Standard Time (AKST)</SelectItem>
                <SelectItem value="hst">Hawaii Standard Time (HST)</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Europe & Africa</SelectLabel>
                <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
                <SelectItem value="cet">Central European Time (CET)</SelectItem>
                <SelectItem value="eet">Eastern European Time (EET)</SelectItem>
                <SelectItem value="west">Western European Summer Time (WEST)</SelectItem>
                <SelectItem value="cat">Central Africa Time (CAT)</SelectItem>
                <SelectItem value="eat">East Africa Time (EAT)</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Asia</SelectLabel>
                <SelectItem value="msk">Moscow Time (MSK)</SelectItem>
                <SelectItem value="ist">India Standard Time (IST)</SelectItem>
                <SelectItem value="cst_china">China Standard Time (CST)</SelectItem>
                <SelectItem value="jst">Japan Standard Time (JST)</SelectItem>
                <SelectItem value="kst">Korea Standard Time (KST)</SelectItem>
                <SelectItem value="ist_indonesia">Indonesia Central Standard Time (WITA)</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Australia & Pacific</SelectLabel>
                <SelectItem value="awst">Australian Western Standard Time (AWST)</SelectItem>
                <SelectItem value="acst">Australian Central Standard Time (ACST)</SelectItem>
                <SelectItem value="aest">Australian Eastern Standard Time (AEST)</SelectItem>
                <SelectItem value="nzst">New Zealand Standard Time (NZST)</SelectItem>
                <SelectItem value="fjt">Fiji Time (FJT)</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>South America</SelectLabel>
                <SelectItem value="art">Argentina Time (ART)</SelectItem>
                <SelectItem value="bot">Bolivia Time (BOT)</SelectItem>
                <SelectItem value="brt">Brasilia Time (BRT)</SelectItem>
                <SelectItem value="clt">Chile Standard Time (CLT)</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="my-2 w-full">
          <label className="py-1 font-bold text-base">제목을 입력하시오</label>
          <Input placeholder="제목을 입력하시오" />
        </div>

        <div className="my-2 w-full">
          <label className="py-1 font-bold text-base">설명을 입력하시오</label>
          <Textarea placeholder="설명을 입력하시오" className="h-40 resize-none" />
        </div>
        <Button>추가</Button>
      </form>
    </>
  );
}
