export const getLargeBookImage = (url?: string) => {
  if (!url) return '';
  return url.replace('coversum', 'cover500');
};

export const getProfileImage = (fileName: any) => {
  if (!fileName || fileName === 'default') {
    return '/default-profile.png'; // 💡 public 폴더에 있는 기본 프로필 이미지 경로
  }

  // 로컬 개발 환경일 때
  if (window.location.hostname === 'localhost') {
    return `http://localhost:8080/ReadPickImages/${fileName}`;
  }

  // Render 배포 서버 환경일 때
  const SUPABASE_URL = 'https://dumfuajtcinawmxbyqmr.supabase.co';
  const BUCKET_NAME = 'profile-images';

  return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}/${fileName}`;
};
