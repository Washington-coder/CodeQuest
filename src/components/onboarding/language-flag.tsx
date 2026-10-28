import BR from "country-flag-icons/react/3x2/BR";
import US from "country-flag-icons/react/3x2/US";
import ES from "country-flag-icons/react/3x2/ES";

const flags = { "pt-BR": BR, "en-US": US, "es-ES": ES };

export function LanguageFlag({ id }: { id: keyof typeof flags }) {
  const Flag = flags[id];
  return <Flag className="h-4 w-6 rounded-[3px] shadow-sm" aria-hidden />;
}
