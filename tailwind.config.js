/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "main-book": "url('/src/assets/img/main-book.png')",
        "good-icon": "url('/src/assets/img/main-good.png')",
        "good-line": "url('/src/assets/img/icon-good-line.png')",
        "like-line": "url('/src/assets/img/icon-like-line.png')",
        "like-line-hover": "url('/src/assets/img/icon-good-line-hover.png')",
        "logo-png": "url('/src/assets/img/logo2.png')",
        "select-arrow": "url('/src/assets/img/selectbox-arrow.png')",
        "search-icon": "url('/src/assets/img/icon-search.png')",
        "login-back": "url('/src/assets/img/login-main.png')",
        "reading-woman": "url('/src/assets/img/reading-woman.png')",
        "icon-check": "url('/src/assets/img/icon-check.png')",
        "keyword-home": "url('/src/assets/img/keyword-home.png')",
        "keyword-arrow": "url('/src/assets/img/keyword-arrow.png')",
        "profile.png": "url('/src/assets/img/book-detail-review-profile.png')",
        "camera.png": "url('/src/assets/img/icon-camera.png')",
        "review-profile-png":
          "url('/src/assets/img/book-detail-review-profile.png')",
        "review-add": "url('/src/assets/img/book-detail-review-add.png')",
        "popup-cancel": "url('/src/assets/img/book-detail-cancel.png')",
        "my-page-icon": "url('/src/assets/img/mypage-info-icon.png')",
        "default-img": "url('/src/assets/img/book-detail-review-profile.png')",
        "trash-icon": "url('/src/assets/img/icon-trash.png')",
        "recommend-icon": "url('/src/assets/img/book-detail_recommend.png')",
        "recommend-icon-hover":
          "url('/src/assets/img/book-detail_recommend-hover.png')",
        "bookmark-icon": "url('/src/assets/img/book-detail-bookmark.png')",
        "buy-icon": "url('/src/assets/img/book-detail-buy.png')",
        "buy-icon-hover": "url('/src/assets/img/book-detail-buy-hover.png')",
      },
      spacing: {
        "main-w": "1300px",
        "container-w": "1200px",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        gowun: ["Gowun Dodum", "sans-serif"],
        McLaren: ["McLaren", "sans-serif"],
        noto: ["Noto Sans KR", "sans-serif"],
      },
      boxShadow: {
        "card-shadow": "3px 2px 20.4px 1px rgba(0, 0, 0, 0.15)",
      },

      colors: {
        "gray-line": "#eaeaea",
      },

      screens: {
        "laptop-lg": { max: "1600px" },
      },

      keyframes: {
        "popup-slide-in": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },

      animation: {
        popup: "popup-slide-in 0.3s ease 0.05s forwards",
      },
    },
  },
  plugins: [],
};
