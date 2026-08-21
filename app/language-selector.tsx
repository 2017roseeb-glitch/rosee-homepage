"use client";

import { useEffect, useState } from "react";

type GoogleTranslateElement = {
  InlineLayout: {
    SIMPLE: string;
  };
  new (
    options: {
      autoDisplay: boolean;
      includedLanguages: string;
      layout: string;
      pageLanguage: string;
    },
    elementId: string,
  ): void;
};

declare global {
  interface Window {
    google?: {
      translate?: {
        TranslateElement?: GoogleTranslateElement;
      };
    };
    googleTranslateElementInit?: () => void;
  }
}

const storageKey = "rosee-language";

const languages = [
  { code: "ko", label: "한국어" },
  { code: "en", label: "English" },
  { code: "ja", label: "日本語" },
  { code: "zh-CN", label: "中文" },
  { code: "fr", label: "Français" },
  { code: "it", label: "Italiano" },
  { code: "es", label: "Español" },
  { code: "de", label: "Deutsch" },
  { code: "pt", label: "Português" },
  { code: "th", label: "ไทย" },
  { code: "ru", label: "Русский" },
  { code: "uz", label: "O‘zbek" },
];

function isSupportedLanguage(languageCode: string | null): languageCode is string {
  return Boolean(languageCode && languages.some((language) => language.code === languageCode));
}

function getCookieLanguage() {
  const match = document.cookie.match(/(?:^|;\s*)googtrans=\/ko\/([^;]+)/);
  const languageCode = match ? decodeURIComponent(match[1]) : null;

  return isSupportedLanguage(languageCode) ? languageCode : null;
}

function setPageLanguage(languageCode: string) {
  document.documentElement.dataset.roseeLanguage = languageCode;
}

function setTranslateCookie(languageCode: string) {
  const value = languageCode === "ko" ? "" : `/ko/${languageCode}`;
  const maxAge = languageCode === "ko" ? "0" : String(60 * 60 * 24 * 365);
  document.cookie = `googtrans=${value}; path=/; max-age=${maxAge}; SameSite=Lax`;
  document.cookie = `googtrans=${value}; path=/rosee-homepage; max-age=${maxAge}; SameSite=Lax`;
}

export default function LanguageSelector() {
  const [activeLanguage, setActiveLanguage] = useState("ko");

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem(storageKey);
    const initialLanguage = isSupportedLanguage(savedLanguage) ? savedLanguage : (getCookieLanguage() ?? "ko");

    const activeLanguageTimer = window.setTimeout(() => {
      setActiveLanguage(initialLanguage);
    }, 0);
    setPageLanguage(initialLanguage);

    window.googleTranslateElementInit = () => {
      if (!window.google?.translate?.TranslateElement) {
        return;
      }

      new window.google.translate.TranslateElement(
        {
          autoDisplay: false,
          includedLanguages: languages.map((language) => language.code).join(","),
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          pageLanguage: "ko",
        },
        "google_translate_element",
      );
    };

    if (!document.querySelector('script[src*="translate_a/element.js"]')) {
      const script = document.createElement("script");
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    } else {
      window.googleTranslateElementInit();
    }

    return () => {
      window.clearTimeout(activeLanguageTimer);
    };
  }, []);

  function selectLanguage(languageCode: string) {
    setActiveLanguage(languageCode);
    setPageLanguage(languageCode);

    if (languageCode === "ko") {
      window.localStorage.removeItem(storageKey);
    } else {
      window.localStorage.setItem(storageKey, languageCode);
    }

    setTranslateCookie(languageCode);

    const googleSelect = document.querySelector<HTMLSelectElement>(".goog-te-combo");
    if (googleSelect && languageCode !== "ko") {
      googleSelect.value = languageCode;
      googleSelect.dispatchEvent(new Event("change"));
      return;
    }

    window.location.reload();
  }

  const activeLabel = languages.find((language) => language.code === activeLanguage)?.label ?? "Language";

  return (
    <div className="language-selector notranslate" translate="no">
      <div id="google_translate_element" aria-hidden="true" />
      <button className="language-button notranslate" type="button" aria-haspopup="true" translate="no">
        <span aria-hidden="true">🌐</span>
        <span className="notranslate" translate="no">
          {activeLanguage === "ko" ? "Language" : activeLabel}
        </span>
      </button>
      <div className="language-menu notranslate" translate="no">
        {languages.map((language) => (
          <button
            className={language.code === activeLanguage ? "is-active" : undefined}
            key={language.code}
            onClick={() => selectLanguage(language.code)}
            type="button"
            translate="no"
          >
            {language.label}
          </button>
        ))}
      </div>
    </div>
  );
}
