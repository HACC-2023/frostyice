import { useEffect } from 'react';

const DialogflowChatWidget = () => {
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.dialogflowMessengerLoaded) {
      window.dialogflowMessengerLoaded = true;

      const script = document.createElement('script');
      script.src =
        'https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/df-messenger.js';
      script.async = true;

      script.onload = () => {
        // for the messeger to appear
        const dfMessenger = document.createElement('df-messenger');
        dfMessenger.setAttribute('project-id', 'white-sunspot-403307');
        dfMessenger.setAttribute('agent-id', '48d6d88b-9934-406d-8523-e3ec7f4f7381');
        dfMessenger.setAttribute('language-code', 'en');

        // for the chat bubble to appear
        const chatBubble = document.createElement('df-messenger-chat-bubble');
        chatBubble.setAttribute('chat-title', 'testagent');

        dfMessenger.appendChild(chatBubble);

        document.body.appendChild(dfMessenger);
      };

      document.body.appendChild(script);
    }
  }, []);

  const dfMessengerStyle = {
    zIndex: 999,
    position: 'fixed',
    bottom: '16px',
    right: '16px',
  };

  return (
    <style>
      {`
        df-messenger {
          z-index: ${dfMessengerStyle.zIndex};
          position: ${dfMessengerStyle.position};
          bottom: ${dfMessengerStyle.bottom};
          right: ${dfMessengerStyle.right};
        }
      `}
    </style>
  );
};

export default DialogflowChatWidget;
