export default function Loading({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="flex w-screen h-screen items-center justify-center">
      {text}
    </div>
  );
}
