import "../../assets/css/footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-wrap">
        <div className="footer-top-box">
          <div className="footer-top-text">
            <p>이용약관</p>
            <p>개인정보처리방침</p>
            <p>고객센터</p>
          </div>
        </div>
        <div className="footer-bottom-box">
          <div className="footer-bottom-text">
            <p>(주) READ PICK</p>
            <p>사업자번호 : 211-82-08632</p>
            <p>전화번호 : 123-4567</p>
            <p>팩스 : 064-123-4567</p>
            <p>이메일 : redPick@redPick.co.kr</p>
          </div>
          <div className="footer-bottom-right-text">
            <p>CUSTOMER CENTER</p>
            <p>1234-5678</p>
            <p>평일 : AM 09:00 - PM 18:00</p>
            <p>주말, 공휴일 : 휴무</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
