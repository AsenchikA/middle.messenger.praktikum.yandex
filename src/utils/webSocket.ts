import { IFullMessageModel } from '../types';

interface IWebSocketConnectionProps {
  userId: number;
  chatId: number;
  tokenValue: string;
  onMessagesGet: (messages: IFullMessageModel[]) => void;
}

export default class WebSocketConnection {
  private _baseUrl = 'wss://ya-praktikum.tech/ws/chats';

  public socket: WebSocket;

  public props: IWebSocketConnectionProps;

  public sendingPing: ReturnType<typeof setInterval>;

  constructor(props: IWebSocketConnectionProps) {
    this.props = props;
    this.registerSocket();
  }

  public registerSocket() {
    const { userId, chatId, tokenValue } = this.props;

    this.socket = new WebSocket(`${this._baseUrl}/${userId}/${chatId}/${tokenValue}`);

    this.socket.addEventListener('open', () => {
      this.getHistory(0);
      this.sendingPing = setInterval(this.ping.bind(this), 30000);
    });

    this.socket.addEventListener('close', () => {
      clearInterval(this.sendingPing);
    });

    this.socket.addEventListener('message', ({ data }) => {
      const receivedData = JSON.parse(data);

      if (receivedData.type !== 'pong') {
        this.props.onMessagesGet(Array.isArray(receivedData) ? receivedData : [receivedData]);
      }
    });
  }

  public sendMessage(message: string) {
    this.socket.send(JSON.stringify({
      content: message,
      type: 'message',
    }));
  }

  public getHistory(startIndex: number) {
    this.socket.send(JSON.stringify({
      content: startIndex,
      type: 'get old',
    }));
  }

  public ping() {
    this.socket.send(JSON.stringify({
      type: 'ping',
    }));
  }
}
