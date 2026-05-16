const Footer = () => {
  return (
    <footer
      className="w-full bg-[#202e24] flex flex-col
        items-center p-[30px] box-border text-[#d9d9d9]"
    >
      <div
        className="w-main-w h-[35px] border-b border-solid border-[#64856c]
          flex justify-between relative
        "
      >
        <div
          className="flex text-xs gap-[10px]
          items-end pb-[10px]"
        >
          <p>이용약관</p>
          <p>개인정보처리방침</p>
          <p>고객센터</p>
        </div>
      </div>
      <div className="w-[1300px] flex justify-between mt-[30px]">
        <section className="text-xs">
          <p className="font-bold text-[14px] mb-[15px]">(주) READ PICK</p>
          <p>사업자번호 : 211-82-08632</p>
          <p>전화번호 : 123-4567</p>
          <p>팩스 : 064-123-4567</p>
          <p>이메일 : readPick@readPick.co.kr</p>
        </section>
        <section className="text-xs">
          <p className="font-bold text-[14px] mb-[15px]">CUSTOMER CENTER</p>
          <p className="text-xl font-bold">1234-5678</p>
          <p>평일 : AM 09:00 - PM 18:00</p>
          <p>주말, 공휴일 : 휴무</p>
        </section>
      </div>
    </footer>
  );
};
export default Footer;
