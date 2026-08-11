import type { PlatformId } from "@/lib/platforms";

const SIZE = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
} as const;

export function PlatformIcon({
  platform,
  size = "md",
  className = "",
}: {
  platform: PlatformId;
  size?: keyof typeof SIZE;
  className?: string;
}) {
  const cls = `${SIZE[size]} shrink-0 ${className}`;

  switch (platform) {
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" className={cls} aria-hidden>
          <defs>
            <linearGradient id="ig" x1="0" y1="24" x2="24" y2="0">
              <stop stopColor="#f58529" />
              <stop offset="0.5" stopColor="#dd2a7b" />
              <stop offset="1" stopColor="#515bd4" />
            </linearGradient>
          </defs>
          <rect x="2" y="2" width="20" height="20" rx="5" fill="url(#ig)" />
          <circle cx="12" cy="12" r="4.2" fill="none" stroke="#fff" strokeWidth="1.8" />
          <circle cx="17.2" cy="6.8" r="1.2" fill="#fff" />
        </svg>
      );
    case "tiktok":
      return (
        <svg viewBox="0 0 24 24" className={cls} aria-hidden>
          <path
            fill="#25F4EE"
            d="M14.5 3c.4 2.4 1.9 4 4.2 4.4v2.4c-1.5-.1-2.9-.6-4.1-1.5v6.8c0 3.4-2.7 6.1-6.1 6.1S2.4 18.5 2.4 15.1 5.1 9 8.5 9c.4 0 .8 0 1.2.1v2.6c-.4-.2-.8-.3-1.2-.3-1.9 0-3.4 1.5-3.4 3.4s1.5 3.4 3.4 3.4 3.4-1.5 3.4-3.4V3h2.6z"
          />
          <path
            fill="#FE2C55"
            d="M15.1 3c.4 2.4 1.9 4 4.2 4.4v2.4c-1.5-.1-2.9-.6-4.1-1.5v6.8c0 3.4-2.7 6.1-6.1 6.1S3 18.5 3 15.1 5.7 9 9.1 9c.4 0 .8 0 1.2.1v2.6c-.4-.2-.8-.3-1.2-.3-1.9 0-3.4 1.5-3.4 3.4s1.5 3.4 3.4 3.4 3.4-1.5 3.4-3.4V3h2.6z"
            opacity="0.85"
          />
        </svg>
      );
    case "youtube":
      return (
        <svg viewBox="0 0 24 24" className={cls} aria-hidden>
          <path
            fill="#FF0033"
            d="M23 12.2s0-3.4-.4-5c-.3-1.4-1.4-2.4-2.7-2.7C17.5 4 12 4 12 4s-5.5 0-7.9.5C2.8 4.8 1.7 5.8 1.4 7.2.9 8.8.9 12.2.9 12.2s0 3.4.5 5c.3 1.4 1.4 2.4 2.7 2.7 2.4.5 7.9.5 7.9.5s5.5 0 7.9-.5c1.3-.3 2.4-1.3 2.7-2.7.4-1.6.4-5 .4-5z"
          />
          <path fill="#fff" d="M10 15.5V8.9l5.8 3.3L10 15.5z" />
        </svg>
      );
    case "telegram":
      return (
        <svg viewBox="0 0 24 24" className={cls} aria-hidden>
          <circle cx="12" cy="12" r="10" fill="#2AABEE" />
          <path
            fill="#fff"
            d="M17.6 7.6c.2-.1.4 0 .4.3l-1.5 8.2c-.1.4-.4.5-.8.3l-2.4-1.8-1.2 1.2c-.1.1-.3.2-.4.2l.2-2.5 4.5-4.1c.2-.2 0-.3-.2-.1l-5.6 3.5-2.4-.7c-.5-.2-.5-.5.1-.7l9.3-3.8z"
          />
        </svg>
      );
    case "facebook":
      return (
        <svg viewBox="0 0 24 24" className={cls} aria-hidden>
          <circle cx="12" cy="12" r="10" fill="#1877F2" />
          <path
            fill="#fff"
            d="M13.3 18.5v-5.7h1.9l.3-2.2h-2.2V9.2c0-.6.2-1.1 1.1-1.1h1.2V6.1c-.2 0-.9-.1-1.8-.1-1.8 0-3 1.1-3 3.1v1.7H8.7v2.2h2.1v5.7h2.5z"
          />
        </svg>
      );
    case "twitter":
      return (
        <svg viewBox="0 0 24 24" className={cls} aria-hidden>
          <circle cx="12" cy="12" r="10" fill="#000" />
          <path
            fill="#fff"
            d="M13.4 11.2 17.8 6h-1l-3.9 4.5L9.8 6H6.2l4.6 6.7L6.2 18h1l4.1-4.7L14.2 18h3.6l-4.4-6.8zm-1.5 1.7-.5-.7-3.8-5.4h1.6l3.1 4.4.5.7 4 5.7h-1.6l-3.3-4.7z"
          />
        </svg>
      );
    case "spotify":
      return (
        <svg viewBox="0 0 24 24" className={cls} aria-hidden>
          <circle cx="12" cy="12" r="10" fill="#1DB954" />
          <path
            fill="#000"
            d="M16.8 16.2c-.2.3-.6.4-.9.2-2.4-1.5-5.5-1.8-9.1-1-.3 0-.6-.2-.7-.5 0-.3.2-.6.5-.7 3.9-.9 7.3-.5 10 1.1.3.2.4.6.2.9zm1.2-2.7c-.2.4-.7.5-1.1.3-2.8-1.7-7-2.2-10.3-1.2-.4.1-.8-.1-.9-.5-.1-.4.1-.8.5-.9 3.7-1.1 8.3-.6 11.5 1.4.3.2.5.7.3 1zm.1-2.8C15 9 9.3 8.8 6.2 9.8c-.5.1-1-.1-1.2-.6-.1-.5.1-1 .6-1.2 3.6-1.1 9.7-.9 13.5 1.4.4.3.6.8.3 1.2-.3.4-.8.6-1.2.3z"
          />
        </svg>
      );
    case "twitch":
      return (
        <svg viewBox="0 0 24 24" className={cls} aria-hidden>
          <path fill="#9146FF" d="M5 3 3 6.2V20h4.5v3h3l3-3H17l5-5.2V3H5zm14.2 10.2L16.5 16H13l-3 3v-3H7.2V5h11.9l.1 8.2z" />
          <path fill="#fff" d="M14.5 7.5h1.8v5.2H14.5V7.5zm-4.2 0H12v5.2h-1.7V7.5z" />
        </svg>
      );
    case "discord":
      return (
        <svg viewBox="0 0 24 24" className={cls} aria-hidden>
          <path
            fill="#5865F2"
            d="M19.3 5.2A17 17 0 0 0 15 3.6l-.3.6a15.7 15.7 0 0 1 4 1.9 13.6 13.6 0 0 0-13.4 0 15.7 15.7 0 0 1 4-1.9l-.3-.6a17 17 0 0 0-4.3 1.6A18.5 18.5 0 0 0 2 17.6a17.5 17.5 0 0 0 5.3 2.7l.7-1.1a11.3 11.3 0 0 1-1.8-.9l.4-.3a12.5 12.5 0 0 0 10.8 0l.4.3c-.6.4-1.2.7-1.8.9l.7 1.1a17.5 17.5 0 0 0 5.3-2.7 18.5 18.5 0 0 0-2.7-12.4zM9 14.6c-.9 0-1.6-.8-1.6-1.8S8.1 11 9 11s1.6.8 1.6 1.8-.7 1.8-1.6 1.8zm6 0c-.9 0-1.6-.8-1.6-1.8S14.1 11 15 11s1.6.8 1.6 1.8-.7 1.8-1.6 1.8z"
          />
        </svg>
      );
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" className={cls} aria-hidden>
          <rect x="2" y="2" width="20" height="20" rx="3" fill="#0A66C2" />
          <path
            fill="#fff"
            d="M7.2 9.5H5V19h2.2V9.5zM6.1 5C5.3 5 4.7 5.6 4.7 6.4S5.3 7.8 6.1 7.8 7.5 7.2 7.5 6.4 6.9 5 6.1 5zM19 19h-2.2v-4.6c0-1.1 0-2.5-1.5-2.5s-1.8 1.2-1.8 2.4V19H11V9.5h2.1v1.3h.1c.3-.6 1.1-1.5 2.6-1.5 2.8 0 3.3 1.8 3.3 4.2V19z"
          />
        </svg>
      );
    case "threads":
      return (
        <svg viewBox="0 0 24 24" className={cls} aria-hidden>
          <circle cx="12" cy="12" r="10" fill="#000" />
          <path
            fill="#fff"
            d="M15.8 11.3c0-2.1-1.2-3.5-3.4-3.5-2.5 0-4.1 1.9-4.1 4.8 0 2.4 1.2 4 3.3 4 1.1 0 2-.4 2.7-1.2l-.9-1c-.4.5-1 .8-1.7.8-1.1 0-1.8-.9-1.8-2.4.1.3.6.5 1.3.5 2.1 0 3.5-1.4 3.5-3.5 0-1.3-.7-2.2-1.9-2.2-.9 0-1.6.5-1.9 1.3l-1.2-.5c.5-1.4 1.8-2.3 3.3-2.3 2 0 3.4 1.3 3.4 3.4 0 1.4-.5 2.5-1.4 3.3.8.5 1.3 1.2 1.3 2.2 0 1.7-1.4 2.9-3.4 2.9-1.5 0-2.7-.6-3.5-1.7l1-1c.6.8 1.4 1.2 2.4 1.2.9 0 1.5-.5 1.5-1.2 0-.9-.7-1.4-2.2-1.9 1.5-.3 2.6-1.2 2.6-2.9z"
          />
        </svg>
      );
    case "snapchat":
      return (
        <svg viewBox="0 0 24 24" className={cls} aria-hidden>
          <circle cx="12" cy="12" r="10" fill="#FFFC00" />
          <path
            fill="#000"
            d="M12 6.2c1.9 0 3.3 1.4 3.3 3.5v.4c.6.2 1 .8 1 1.5 0 .4-.1.7-.3 1 .5.3 1.2.6 1.8.7.2 0 .3.2.3.4 0 .5-.7.8-1.3.9-.1 1.2-.9 2.1-2.1 2.6-.3.5-.7.9-1.2 1.1.1.3.3.7.6 1 .2.2 0 .5-.3.4-.7-.2-1.3-.6-1.8-1.1-.5.5-1.1.9-1.8 1.1-.3.1-.5-.2-.3-.4.3-.3.5-.7.6-1-.5-.2-.9-.6-1.2-1.1-1.2-.5-2-1.4-2.1-2.6-.6-.1-1.3-.4-1.3-.9 0-.2.1-.4.3-.4.6-.1 1.3-.4 1.8-.7-.2-.3-.3-.6-.3-1 0-.7.4-1.3 1-1.5v-.4c0-2.1 1.4-3.5 3.3-3.5z"
          />
        </svg>
      );
    case "reddit":
      return (
        <svg viewBox="0 0 24 24" className={cls} aria-hidden>
          <circle cx="12" cy="12" r="10" fill="#FF4500" />
          <circle cx="12" cy="13.2" r="5.2" fill="#fff" />
          <circle cx="9.8" cy="12.6" r="1" fill="#FF4500" />
          <circle cx="14.2" cy="12.6" r="1" fill="#FF4500" />
          <path fill="#FF4500" d="M9.5 15c.7.6 1.6.9 2.5.9s1.8-.3 2.5-.9" stroke="#FF4500" strokeWidth="1" fillOpacity="0" />
          <circle cx="16.8" cy="9.2" r="1.2" fill="#fff" />
          <path stroke="#fff" strokeWidth="1.4" d="M13.5 8.2 15.8 9" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" className={cls} aria-hidden>
          <circle cx="12" cy="12" r="10" fill="#334155" />
          <path
            fill="none"
            stroke="#94a3b8"
            strokeWidth="1.6"
            d="M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm0 0c2.2 2.4 3.5 5.1 3.5 8S14.2 17.6 12 20M12 4C9.8 6.4 8.5 9.1 8.5 12s1.3 5.6 3.5 8M4.5 12h15"
          />
        </svg>
      );
  }
}
