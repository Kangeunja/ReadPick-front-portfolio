import { useEffect } from "react";
import "../../assets/css/ReviewSubmitSuccessPopup.css";

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
    <div className="review-success__popup">
      <div className="review-success__popup-box">
        <p>{message}</p>
      </div>
    </div>
  );
};

export default MessagePopup;
