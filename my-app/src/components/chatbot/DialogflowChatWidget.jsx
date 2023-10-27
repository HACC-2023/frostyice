import { useEffect } from 'react';

const DialogflowChatWidget = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <df-messenger
      intent="WELCOME"
      chat-title="DebrisWatchBot"
      agent-id="f6e2032d-4820-4617-93e7-9e1a74d3d6fc"
      language-code="en"
    ></df-messenger>
  );
};

export default DialogflowChatWidget;
