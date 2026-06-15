/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'login-back': "url('/src/assets/img/login-background.png')",
        'login-woman': "url('/src/assets/img/login-woman.png')",
        'main-logo': "url('/src/assets/img/main-logo.png')",
        'icon-check-color': "url('/src/assets/img/icon-check-color.png')",
        'icon-check': "url('/src/assets/img/icon-check.png')",
        'main-book': "url('/src/assets/img/main-book.png')",
        'select-arrow': "url('/src/assets/img/selectbox-arrow.png')",
        'icon-search': "url('/src/assets/img/icon-search.png')",
        'icon-recommend-none': "url('/src/assets/img/icon-recommend-none.png')",
        'icon-bookmark-color': "url('/src/assets/img/icon-bookmark-color.png')",
        'icon-recommend-color': "url('/src/assets/img/icon-recommend-color.png')",
        'icon-bookmark-line': "url('/src/assets/img/icon-bookmark-line.png')",
        'icon-recommend-white': "url('/src/assets/img/icon-recommend-white.png')",
        'icon-recommend-line': "url('/src/assets/img/icon-recommend-line.png')",
        'icon-home': "url('/src/assets/img/icon-home.png')",
        'icon-arrow': "url('/src/assets/img/icon-arrow.png')",
        'icon-default': "url('/src/assets/img/icon-default.png')",
        'icon-camera': "url('/src/assets/img/icon-camera.png')",
        'icon-add': "url('/src/assets/img/icon-add.png')",

        'like-line-hover': "url('/src/assets/img/icon-good-line-hover.png')",
        'popup-cancel': "url('/src/assets/img/book-detail-cancel.png')",
        'my-page-icon': "url('/src/assets/img/mypage-info-icon.png')",
        'trash-icon': "url('/src/assets/img/icon-trash.png')",
        'bookmark-icon': "url('/src/assets/img/book-detail-bookmark.png')",
        'buy-icon': "url('/src/assets/img/book-detail-buy.png')",
        'buy-icon-hover': "url('/src/assets/img/book-detail-buy-hover.png')",
        'review-icon': "url('/src/assets/img/book-detail-reviews.png')",
        'review-icon-hover': "url('/src/assets/img/book-detail-reviews-hover.png')",
      },

      screens: {
        // 1600px 기준
        'laptop-lg': { max: '1600px' },
      },

      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        gowun: ['Gowun Dodum', 'sans-serif'],
        McLaren: ['McLaren', 'sans-serif'],
        noto: ['Noto Sans KR', 'sans-serif'],
      },

      colors: {
        borderLightColor: '#c9c9c9',
        pointColor: '#248f8f',
        mainBoxColor: '#f2f2f2',

        memberColor: '#797979',
        borderLightGray: '#c4bfbf',
        borderMColor: '#393939',
        borderLineColor: '#eaeaea',
        bgColor: '#1e7373',
      },

      spacing: {
        'main-w': '1300px',
        'container-w': '1200px',
      },

      boxShadow: {
        borderShadow: '0 8px 20px rgba(36,143,143,0.15)',
        cardShadow: '3px 2px 20.4px 1px rgba(0, 0, 0, 0.15)',
      },

      keyframes: {
        'popup-slide-in': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'popup-fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },

      animation: {
        popup: 'popup-slide-in 0.3s ease 0.05s forwards',
        'popup-bg-fade': 'popup-fade-in 0.25s ease forwards',
        'popup-box-fade': 'popup-fade-in 0.25s ease 0.05s forwards',
      },
    },
  },
  plugins: [],
};
