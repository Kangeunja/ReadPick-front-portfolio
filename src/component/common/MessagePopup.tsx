import { useEffect } from 'react';

interface Props {
  message: string;
  onFinish: () => void;
}

const MessagePopup = ({ message, onFinish }: Props) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 1000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-[999] flex h-full w-full items-center justify-center">
      <div className="fixed box-border flex h-[50px] w-[250px] animate-popup items-center justify-center whitespace-pre-line rounded-[5px] bg-[rgb(56,56,56)] p-5 text-center text-[15px] text-white opacity-0">
        <p>{message}</p>
      </div>
    </div>
  );
};

export default MessagePopup;
