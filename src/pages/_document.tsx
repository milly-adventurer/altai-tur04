import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
				<link rel="preconnect" href="https://images.ctfassets.net" />
				<script dangerouslySetInnerHTML={{ __html: `!function(){var t=document.createElement("script");t.type="text/javascript",t.async=!0,t.src='https://vk.com/js/api/openapi.js?169',t.onload=function(){VK.Retargeting.Init("VK-RTRG-1712921-gi1nv"),VK.Retargeting.Hit()},document.head.appendChild(t)}();` }} />
			</Head>
      <body>
        <Main />
        <NextScript />
      </body>
			<script dangerouslySetInnerHTML={{ __html: `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)}; m[i].l=1*new Date(); for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }} k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym"); ym(92641252, "init", { clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true});` }} />
    </Html>
  )
}
