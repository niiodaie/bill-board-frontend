import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTranslation } from "react-i18next";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe } from "lucide-react";
const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
    { code: "pt", name: "Português", flag: "🇧🇷" },
    { code: "zh", name: "中文", flag: "🇨🇳" },
    { code: "ja", name: "日本語", flag: "🇯🇵" },
    { code: "ru", name: "Русский", flag: "🇷🇺" },
    { code: "ar", name: "العربية", flag: "🇸🇦" },
    { code: "hi", name: "हिन्दी", flag: "🇮🇳" }
];
export function LanguageSwitcher() {
    const { i18n, t } = useTranslation();
    const handleLanguageChange = (value) => {
        i18n.changeLanguage(value);
    };
    const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];
    return (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Globe, { className: "w-4 h-4 text-muted-foreground" }), _jsxs(Select, { value: i18n.language, onValueChange: handleLanguageChange, children: [_jsx(SelectTrigger, { className: "w-[150px] border-none bg-transparent", children: _jsx(SelectValue, { children: _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { children: currentLanguage.flag }), _jsx("span", { className: "text-sm", children: currentLanguage.name })] }) }) }), _jsx(SelectContent, { children: languages.map((language) => (_jsx(SelectItem, { value: language.code, children: _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { children: language.flag }), _jsx("span", { children: language.name })] }) }, language.code))) })] })] }));
}
