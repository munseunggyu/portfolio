export default function ChatbotLoading() {
  return (
    <div className="flex justify-start">
      <div className="max-w-[80%] rounded-2xl rounded-bl-sm bg-muted px-4 py-2">
        <div className="flex gap-1">
          <span className="animate-bounce">●</span>
          <span className="animate-bounce delay-100">●</span>
          <span className="animate-bounce delay-200">●</span>
        </div>
      </div>
    </div>
  );
}
