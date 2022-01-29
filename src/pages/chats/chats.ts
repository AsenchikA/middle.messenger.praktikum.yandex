import ChatCard from "~src/components/chat-card/chat-card";
import Block from "~src/utils/block";
import chatsTemplate from "./chats.template";

export default class Chats extends Block {
  constructor() {
    super('div');
  }

  protected getChildren(): Record<string, Block> {
    const chatCard = new ChatCard({
      name: 'Андрей',
      message: 'Изображение',
    });

    return {
      chatCard,
    }
  }

  protected getAttributes(): Record<string, string> {
    return {
      class: 'chats-container'
    };
  }

  public render(): DocumentFragment {
    return this.compile(chatsTemplate);
  }
}