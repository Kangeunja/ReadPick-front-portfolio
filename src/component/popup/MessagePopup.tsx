import { useEffect } from "react";

interface Props {
  message: string;
  onFinish: () => void;
}

const MessagePopup = ({ message, onFinish }: Props) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="fixed w-full h-full z-[99] top-0 bottom-0 left-0 right-0 overflow-hidden">
      <div
        className="w-[250px] h-[50px] box-border p-5 bg-[rgb(56,56,56)] text-white
      flex justify-center items-center text-[15px] rounded-[5px] fixed
      top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 animate-popup 
      whitespace-pre-line text-center
      "
      >
        <p>{message}</p>
      </div>
    </div>
  );
};

export default MessagePopup;
