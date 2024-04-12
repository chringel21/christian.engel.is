export type Status = {
  content: string;
  emoji: string;
  relativeTime: string;
  contentAndEmoji: string;
};

export const defaultStatus: Status = {
  content: "working on the status message API.",
  emoji: "🔧",
  relativeTime: "Just now",
  contentAndEmoji: "working on the status message API. 🔧",
};
