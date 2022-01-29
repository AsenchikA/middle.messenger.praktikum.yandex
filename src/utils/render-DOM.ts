import Block from "./block";

export function render(selector: string, block: Block) {
  const root = document.querySelector(selector);
  const blockContent = block.getContent();

  if (root && blockContent) {
    root.appendChild(blockContent);
    block.dispatchComponentDidMount();
  }

  return root;
} 