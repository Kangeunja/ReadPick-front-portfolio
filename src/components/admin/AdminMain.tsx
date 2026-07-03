import { useEffect, useState } from "react";
import "../../assets/css/admin.css";
import axiosInstance from "../../api/axiosInstance";

interface UserInfo {
  userIdx: number;
  id: string;
  nickName: string;
  userName: string;
  email: string;
  regDate: string;
}

interface BookInfo {
  bookIdx: number;
  bookName: string;
  isbn: string;
  pubDate: string;
}

interface ReviewInfo {
  rvIdx: number;
  bookIdx: number;
  content: string;
  reportCount: number;
  regDate: string;
  userIdx: number;
}

const AdminMain = () => {
  const [activeTab, setActiveTab] = useState("menu1");
  const [userList, setUserList] = useState<UserInfo[]>([]);
  const [bookList, setBookList] = useState<BookInfo[]>([]);
  const [reviewList, setReviewList] = useState<ReviewInfo[]>([]);

  const showTab = (tabId: string) => {
    setActiveTab(tabId);
  };

  const DataTable = ({ headers, rows }: any) => {
    return (
      <table className="admin-table">
        <thead>
          <tr>
            {headers.map((head: any, idx: any) => (
              <th key={idx} className="admin-th">
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows?.map((row: any[], rowIdx: number) => (
            <tr key={rowIdx}>
              {row.map((cell: any, cellIdx: number) => (
                <td key={cellIdx} className="admin-td">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        {/* <tbody>
          <tr>
            {row.map((cell: any, idx: any) => (
              <td key={idx} className="admin-th">
                {cell}
              </td>
            ))}
          </tr>
        </tbody> */}
      </table>
    );
  };

  useEffect(() => {
    adminUserList();
    adminBookList();
    adminReviewList();
  }, []);

  // 회원관리 리스트 api
  const adminUserList = () => {
    axiosInstance
      .get("/adminUserList")
      .then((res) => {
        console.log(res.data);
        setUserList(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 회원삭제 버튼
  const handleUserDelete = (userIdx: number) => {
    if (window.confirm("회원을 삭제하시겠습니까?")) {
      axiosInstance
        .get("/adminUserDelete", {
          params: { userIdx: userIdx },
        })
        .then((res) => {
          console.log(res.data);
          adminUserList();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // 도서관리 리스트 api
  const adminBookList = () => {
    axiosInstance
      .get("/adminBookList")
      .then((res) => {
        console.log(res.data);
        setBookList(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 도서삭제 버튼
  const handleBookDelete = (bookIdx: number) => {
    if (window.confirm("도서를 삭제하시겠습니까?")) {
      axiosInstance
        .get("/adminBookDelete", {
          params: { bookIdx: bookIdx },
        })
        .then((res) => {
          console.log(res.data);
          adminBookList();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // 리뷰관리 리스트 api
  const adminReviewList = () => {
    axiosInstance
      .get("/adminReviewList")
      .then((res) => {
        console.log(res.data);
        setReviewList(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="admin-wrap">
        <div className="admin-header">
          <h1>Admin Dashboard</h1>
          <ul className="admin-nav">
            <li onClick={() => showTab("menu1")}>
              회원 관리
              <br />
            </li>
            <li onClick={() => showTab("menu2")}>도서 관리</li>
            <li onClick={() => showTab("menu3")}>리뷰 관리</li>
          </ul>
        </div>
      </div>

      <div className="tab-content">
        {/* 회원 관리 */}
        {activeTab === "menu1" && (
          <div>
            <h2>회원 관리</h2>
            <div className="admin-user">
              <form className="admin-form-wrap">
                <select className="admin-form-option">
                  <option value="all">전체보기</option>
                  <option value="name">아이디</option>
                </select>
                <input className="admin-search" defaultValue="검색어" />
                <input
                  type="button"
                  className="admin-search-button"
                  value="검색"
                  onClick={() => alert("검색 실행")}
                />
              </form>
            </div>
            <DataTable
              headers={[
                "회원 번호",
                "회원 ID",
                "회원 닉네임",
                "이름",
                "이메일",
                "가입일",
                "회원삭제",
              ]}
              // row={[
              //   "회원 번호 데이터",
              //   "아이디",
              //   "닉네임",
              //   "이름",
              //   "이메일",
              //   "가입일",
              //   <button className="admin-search-button">회원삭제</button>,
              // ]}
              rows={userList?.map((user) => [
                user.userIdx,
                user.id,
                user.nickName,
                user.userName,
                user.email,
                user.regDate,
                <button
                  className="admin-search-button"
                  onClick={() => handleUserDelete(user.userIdx)}
                >
                  회원삭제
                </button>,
              ])}
            />
          </div>
        )}

        {/* 도서 관리 */}
        {activeTab === "menu2" && (
          <div>
            <h2>도서 관리</h2>
            <div style={{ textAlign: "right", marginRight: "30px" }}>
              <button
                className="admin-search-button"
                title="모든 장르의 도서 데이터를 추가합니다"
              >
                도서 추가
              </button>
            </div>
            <DataTable
              headers={["도서 번호", "도서 제목", "ISBN", "출판일", "삭제"]}
              rows={bookList.map((book) => [
                book.bookIdx,
                book.bookName,
                book.isbn,
                book.pubDate,
                <button
                  className="admin-search-button"
                  onClick={() => handleBookDelete(book.bookIdx)}
                >
                  삭제
                </button>,
              ])}
              // row={[
              //   "번호",
              //   "제목",
              //   "ISBN",
              //   "출판일",
              //   <button className="admin-search-button">삭제</button>,
              // ]}
            />
          </div>
        )}

        {/* 리뷰 관리 */}
        {activeTab === "menu3" && (
          <div>
            <h2>리뷰 관리</h2>
            <DataTable
              headers={[
                "리뷰 번호",
                "도서 번호",
                "리뷰 내용",
                "신고횟수",
                "작성일",
                "삭제",
                "초기화",
              ]}
              rows={reviewList.map((review) => [
                review.bookIdx,
                review.bookIdx,
                review.content,
                review.reportCount,
                review.regDate,
                <button className="admin-search-button">삭제</button>,
                <button
                  className="admin-search-button"
                  title="신고횟수를 초기화합니다."
                >
                  초기화
                </button>,
              ])}
              // row={[
              //   "리뷰 번호",
              //   "도서 번호",
              //   "리뷰 내용",
              //   "신고횟수",
              //   "작성일",
              //   <button className="admin-search-button">삭제</button>,
              //   <button
              //     className="admin-search-button"
              //     title="신고횟수를 초기화합니다."
              //   >
              //     초기화
              //   </button>,
              // ]}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default AdminMain;
