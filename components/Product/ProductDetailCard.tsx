// 상품 상세 페이지에 상품 정보가 들어갈 부분

export default function ProductDetailCard() {
  return (
    <>
      <section className="w-full h-96 grid grid-cols-2 justify-items-center gap-1">
        <div className="w-8/12 border border-slate-300 rounded-md my-1">
          <h1>상품 이미지가 들어가는 부분</h1>
        </div>

        <div className="w-10/12 border border-slate-300 rounded-md my-1">
          <h1>상품 정보가 들어가는 부분</h1>
        </div>
      </section>
    </>
  );
}
