// 데이터가 없을때 보여질 컴포넌트

export default function Nodata() {
  return (
    <div className="flex flex-col justify-center items-center mx-auto w-full">
      <h1 className="text-center text-red-600 text-2xl font-bold">데이터가 없어요!</h1>
    </div>
  );
}
