"use client";

import Script from "next/script";

/** Property / widget from Tawk.to dashboard embed code */
const TAWK_PROPERTY_ID = "6a7ee6015981892f72ddcabc";
const TAWK_WIDGET_ID = "1jvvr4u6e";

/**
 * Loads Tawk.to live chat (default bottom-right launcher).
 */
export function TawkTo() {
  return (
    <Script
      id="tawk-to"
      strategy="lazyOnload"
      dangerouslySetInnerHTML={{
        __html: `
var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/${TAWK_PROPERTY_ID}/${TAWK_WIDGET_ID}';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();
        `.trim(),
      }}
    />
  );
}
