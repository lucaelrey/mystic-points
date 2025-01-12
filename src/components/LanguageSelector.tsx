import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const languages = [
  { value: "de", label: "Deutsch", flag: "🇩🇪" },
  { value: "en", label: "English", flag: "🇬🇧" }
];

export function LanguageSelector() {
  const { i18n, t } = useTranslation();

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <Select
        defaultValue={i18n.language}
        onValueChange={(value) => i18n.changeLanguage(value)}
      >
        <SelectTrigger className="w-[180px] bg-black/50 backdrop-blur-sm border-white/10 text-white">
          <SelectValue placeholder={t('game.language')} />
        </SelectTrigger>
        <SelectContent className="bg-black/90 border-white/10">
          {languages.map((lang) => (
            <SelectItem 
              key={lang.value} 
              value={lang.value}
              className="text-white hover:bg-white/10"
            >
              <span className="flex items-center gap-2">
                <span className="text-lg">{lang.flag}</span>
                <span>{lang.label}</span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}