import { useRef } from 'react';
import { UserProfile } from 'types/user';

type ProfileImageUploaderProps = {
  isDefaultImage: boolean;
  uploadedImage: string | null;
  userInfo: UserProfile;
  handleFileChange: (e: any) => void;
  onClose: () => void;
};

const ProfileImageUploader = ({ isDefaultImage, uploadedImage, userInfo, handleFileChange, onClose }: ProfileImageUploaderProps) => {
  const editImgRef = useRef<HTMLInputElement | null>(null);

  return (
    <>
      <div className="flex w-[100px] justify-center">
        <div
          className={`mb-[23px] flex h-[80px] w-[80px] items-center justify-center rounded-[50px] ${isDefaultImage ? 'border border-[#1b1b1b]' : ''}`}
        >
          {isDefaultImage ? (
            <div className="h-[30px] w-[30px] bg-icon-default bg-cover" />
          ) : (
            <img src={uploadedImage || userInfo.fileName} alt="프로필 이미지" className="h-[80px] w-[80px] rounded-[50px]" />
          )}
        </div>
      </div>

      <div className="mb-[60px] flex w-[100px] justify-between">
        <div onClick={() => editImgRef.current?.click()}>
          <button className="h-[30px] w-[61px] cursor-pointer rounded-[5px] bg-[#a0a0a0] text-[12px] text-white hover:bg-btnhoverColor">
            {isDefaultImage ? '사진추가' : '사진수정'}
          </button>
          <input type="file" ref={editImgRef} accept="image/*" className="hidden" onChange={handleFileChange} />
        </div>

        <button
          className={`h-[30px] w-[30px] rounded-[5px] bg-[#a0a0a0] bg-icon-trash bg-[length:15px_15px] bg-center bg-no-repeat text-[12px] text-white ${isDefaultImage ? 'cursor-not-allowed opacity-[0.3]' : 'hover:bg-btnhoverColor'}`}
          disabled={isDefaultImage}
          onClick={() => onClose()}
        ></button>
      </div>
    </>
  );
};

export default ProfileImageUploader;
