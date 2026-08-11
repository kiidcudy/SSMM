import type { Locale } from "@/lib/site";

export type LegalSection = { id: string; title: string; body: string[] };

export type PageChrome = {
  lastUpdated: string; // "Last updated: {date}" with {date} placeholder
  aboutH1: string;
  aboutLead: string;
  aboutUsefulLinks: string;
  aboutImgAlt: string;
  privacyLead: string;
  termsLead: string;
  privacyMetaTitle: string;
  privacyMetaDesc: string;
  termsMetaTitle: string;
  termsMetaDesc: string;
  aboutMetaTitle: string;
  aboutMetaDesc: string;
  linkServices: string;
  linkFree: string;
  linkPayments: string;
  linkBlog: string;
  linkApi: string;
  linkContact: string;
  paymentMetaTitle: string; // "{method} — Add Funds" style with {method}
  paymentMetaDesc: string; // use {method}
  paymentIntro: string; // use {method}
  paymentHowToTitle: string; // use {method}
  paymentSteps: { name: string; text: string }[]; // text may include {method} and {whatsapp}
  apiEndpoint: string;
  apiAuthNote: string;
  apiActions: { action: string; body: string }[];
  apiExample: string;
  servicesNote: string;
  servicesColId: string;
  servicesColService: string;
  servicesColRate: string;
  servicesColMin: string;
  servicesColMax: string;
  freeRules: string[]; // 5 hub rules
  freePackRules: string[]; // 4 pack rules, may include {hours}
  blogUpdated: string; // "Updated {date}"
  blogReadMeta: string; // "{date} · Updated {updated} · {author} · {min} min · {words} words"
  blogCtaTitle: string;
  blogCtaBody: string;
  loginNoAccount: string;
  loginCreate: string;
  signupHaveAccount: string;
  signupLogin: string;
  formUsername: string;
  formPassword: string;
  formEmail: string;
  formLoginBtn: string;
  formSignupBtn: string;
  formError: string;
};

export type LegalBundle = {
  privacy: LegalSection[];
  terms: LegalSection[];
  about: LegalSection[];
};
