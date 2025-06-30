type MessageProps = {
  type: "user" | "bot" | "error";
  content: string;
};

export function Message({ type, content }: MessageProps) {
  const isResponse = type === "bot";
  return (
    <div
      className={`flex ${!isResponse ? "justify-end" : "justify-start"} mt-2 `}
    >
      <pre
        className={`${
          !isResponse ? "bg-blue-500 text-white " : "bg-white text-black "
        } p-2 rounded-sm text-md max-w-[1000px] text-wrap shadow-lg`}
      >
        {content}
      </pre>
    </div>
  );
}
