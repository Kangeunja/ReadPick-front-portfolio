import { useBookBuddyChat } from 'hooks/useBookBuddyChat';
import chatbotImage from 'assets/img/chatbot.png';

const BookBuddyChatBot = () => {
  const { isOpen, setIsOpen, input, setInput, messages, isLoading, handleSubmit } = useBookBuddyChat();

  return (
    <div className="fixed bottom-5 right-5 z-[100] flex flex-col items-end">
      <div
        className={`mb-3 w-[320px] overflow-hidden rounded-[24px] border border-[#e2e8f0] bg-white shadow-[0_10px_35px_rgba(15,23,42,0.18)] transition-all duration-300 ${isOpen ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'}`}
        style={{ height: isOpen ? '520px' : '0px' }}
      >
        <div className="flex h-[56px] items-center justify-between border-b border-[#eef2f7] bg-[#f7f9fc] px-4">
          <div>
            <p className="text-sm font-semibold text-[#1f2937]">AI 북버디</p>
            <p className="text-xs text-[#6b7280]">책을 더 깊게 이해해줘요</p>
          </div>
          <button type="button" onClick={() => setIsOpen(false)} className="text-lg text-[#6b7280]">
            ✕
          </button>
        </div>

        <div className="flex h-[calc(520px-56px-76px)] flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto px-3 py-3">
            {messages.map((msg) => (
              <div key={msg.id} className={`mb-2 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-6 ${msg.role === 'user' ? 'bg-pointColor text-white' : 'bg-[#f3f4f6] text-[#374151]'}`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="rounded-2xl bg-[#f3f4f6] px-3 py-2 text-sm text-[#6b7280]">답변을 작성하고 있어요...</div>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-[#eef2f7] bg-white px-3 py-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="질문을 입력해 주세요"
              className="flex-1 rounded-full border border-[#d1d5db] px-3 py-2 text-sm outline-none focus:border-pointColor"
            />
            <button type="submit" className="rounded-full bg-pointColor px-3 py-2 text-sm font-semibold text-white">
              전송
            </button>
          </form>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="group flex flex-col items-center rounded-[22px] border border-[#dfeaff] bg-[#e8f2ff] px-3 py-2 shadow-[0_10px_24px_rgba(47,111,230,0.16)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(47,111,230,0.24)]"
      >
        <img
          src={chatbotImage}
          alt="AI 챗봇"
          className="h-[20px] w-[20px] object-contain transition-transform duration-200 group-hover:-translate-y-1"
        />
        <span className="mt-1 text-[11px] font-semibold tracking-[0.16em] text-[#4b5563]">AI 챗봇</span>
      </button>
    </div>
  );
};

export default BookBuddyChatBot;
