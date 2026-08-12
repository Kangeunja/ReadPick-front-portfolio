import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useBookBuddyMutation } from './mutations/useBookBuddyMutation';

type ChatMessage = {
  id: number;
  role: 'user' | 'bot';
  text: string;
};

type BookBuddyContext = {
  title?: string;
  author?: string;
};

const DEFAULT_GREETING: ChatMessage = {
  id: 1,
  role: 'bot',
  text: '안녕하세요! 어떤 책을 찾으시나요? 취향에 맞는 책을 추천해드릴게요.',
};

export const useBookBuddyChat = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [generalMessages, setGeneralMessages] = useState<ChatMessage[]>([DEFAULT_GREETING]); // 일반 페이지용 대화 기록 (백업본)
  const [context, setContext] = useState<BookBuddyContext | null>(null);

  const { mutate: chatMutate, isPending } = useBookBuddyMutation();

  const category = useMemo(() => (location.pathname.includes('/detail') ? '책 상세 페이지' : '일반 페이지'), [location.pathname]);

  useEffect(() => {
    if (category === '일반 페이지') {
      setContext(null);
      setMessages(generalMessages);
    } else {
      setContext(null);
    }
  }, [location.pathname, category]);

  // 상세페이지 이벤트 수신
  useEffect(() => {
    const handleContext = (event: Event) => {
      const customEvent = event as CustomEvent<BookBuddyContext | null>;
      const newContext = customEvent.detail ?? null;

      setContext(newContext);

      if (newContext?.title) {
        setMessages([
          {
            id: Date.now(),
            role: 'bot',
            text: `현재 <${newContext.title}> 도서를 보고 계시네요. 궁금한 점이 있으신가요?`,
          },
        ]);
      }
    };

    window.addEventListener('book-buddy-context', handleContext as EventListener);
    return () => {
      window.removeEventListener('book-buddy-context', handleContext as EventListener);
    };
  }, []);

  // useEffect(() => {
  //   console.log(context?.title);
  //   if (context?.title) {
  //     setMessages([
  //       {
  //         id: Date.now(),
  //         role: 'bot',
  //         text: `현재 <${context.title}> 도서를 보고 계시네요. 궁금한 점이 있으신가요?`,
  //       },
  //     ]);
  //   }

  //   // setMessages((prev) => {
  //   //   if (prev.length === 0) {
  //   //     return [{ id: 1, role: 'bot', text: greeting }];
  //   //   }
  //   //   if (prev.length === 1 && prev[0]?.role === 'bot') {
  //   //     return [{ id: 1, role: 'bot', text: greeting }];
  //   //   }
  //   //   return prev;
  //   // });
  // }, [context]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    const history = messages.map((msg) => ({ user: msg.role === 'user' ? msg.text : '', ai: msg.role === 'bot' ? msg.text : '' }));

    const newUserMsg: ChatMessage = { id: Date.now(), role: 'user', text: userMessage };

    setMessages((prev) => [...prev, newUserMsg]);

    if (category === '일반 페이지') {
      setGeneralMessages((prev) => [...prev, newUserMsg]);
    }

    setInput('');

    chatMutate(
      {
        title: context?.title,
        author: context?.author,
        category,
        history,
        message: userMessage,
      },
      {
        onSuccess: (data) => {
          const newBotMsg: ChatMessage = {
            id: Date.now() + 1,
            role: 'bot',
            text: data.reply || '답변을 생성하지 못했습니다.',
          };
          setMessages((prev) => [...prev, newBotMsg]);

          if (category === '일반 페이지') {
            setGeneralMessages((prev) => [...prev, newBotMsg]);
          }
        },
        onError: () => {
          setMessages((prev) => [...prev, { id: Date.now() + 2, role: 'bot', text: '죄송해요. 잠시 후 다시 시도해 주세요.' }]);
        },
      },
    );
  };

  return {
    isOpen,
    setIsOpen,
    input,
    setInput,
    messages,
    isLoading: isPending,
    handleSubmit,
    context,
  };
};
