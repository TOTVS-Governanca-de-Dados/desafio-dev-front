export function LoadingBubble() {
  return (
    <div className="self-start px-4 py-3 rounded-lg bg-muted text-muted-foreground max-w-[60%] flex gap-1 items-center">
      <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:0s]" />
      <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:0.1s]" />
      <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:0.2s]" />
    </div>
  );
}
