// 로딩시 보여지는 부분

export default function loading() {
  return (
    <>
      <p className="text-center text-blue-500 font-bold py-4">
        <svg className="mr-3 size-5 animate-spin ..." viewBox="0 0 24 24"></svg>
        로딩중...
      </p>
    </>
  );
}
