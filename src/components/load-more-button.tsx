import { LucideLoader } from "lucide-react";

export default function LoadMoreButton({
  text,
  onClick,
  loading,
}: {
  text: string;
  onClick?: () => void;
  loading?: boolean;
}) {
  return (
    <button
      className="flex gap-2 bg-background-light hover:bg-secondary text-sm p-2 rounded items-center"
      onClick={onClick}
      disabled={loading}
    >
      {loading && <LucideLoader className="animate-spin w-4 h-4" />}
      <span>{text}</span>
    </button>
  );
}
