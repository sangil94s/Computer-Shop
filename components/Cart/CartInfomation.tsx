import { Button } from '../ui/button';

// 장바구니에서 고객 정보 등 을 보여주는 부분 [주문자 성명, 주소 등]

export default function CartInfomation() {
  return (
    <>
      <div className="w-2/3 h-max mx-1">
        <h1 className="text-center text-xl font-bold py-2">주문자 정보</h1>
        <Button className="w-full my-1">주문하기</Button>
      </div>
    </>
  );
}
