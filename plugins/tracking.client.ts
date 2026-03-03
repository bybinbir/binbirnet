import type { TrackingScript } from '~/types'

export default defineNuxtPlugin(async () => {
  try {
    const scripts = await $fetch<TrackingScript[]>('/api/tracking')
    if (!scripts?.length) return

    for (const script of scripts) {
      switch (script.type) {
        case 'ga4':
          if (script.trackingId) {
            injectGA4(script.trackingId)
          }
          break
        case 'gtm':
          if (script.trackingId) {
            injectGTM(script.trackingId)
          }
          break
        case 'facebook_pixel':
          if (script.trackingId) {
            injectFBPixel(script.trackingId)
          }
          break
        case 'custom':
          if (script.headCode) injectCustomHead(script.headCode)
          if (script.bodyCode) injectCustomBody(script.bodyCode)
          break
      }
    }
  } catch {
    // Tracking should not break the app
  }
})

function injectGA4(id: string) {
  const s = document.createElement('script')
  s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`
  s.async = true
  document.head.appendChild(s)

  const s2 = document.createElement('script')
  s2.textContent = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${id}');`
  document.head.appendChild(s2)
}

function injectGTM(id: string) {
  const s = document.createElement('script')
  s.textContent = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${id}');`
  document.head.appendChild(s)

  const noscript = document.createElement('noscript')
  const iframe = document.createElement('iframe')
  iframe.src = `https://www.googletagmanager.com/ns.html?id=${id}`
  iframe.height = '0'
  iframe.width = '0'
  iframe.style.display = 'none'
  iframe.style.visibility = 'hidden'
  noscript.appendChild(iframe)
  document.body.insertBefore(noscript, document.body.firstChild)
}

function injectFBPixel(id: string) {
  const s = document.createElement('script')
  s.textContent = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${id}');fbq('track','PageView');`
  document.head.appendChild(s)
}

function injectCustomHead(code: string) {
  const container = document.createElement('div')
  container.innerHTML = code
  while (container.firstChild) {
    document.head.appendChild(container.firstChild)
  }
}

function injectCustomBody(code: string) {
  const container = document.createElement('div')
  container.innerHTML = code
  while (container.firstChild) {
    document.body.appendChild(container.firstChild)
  }
}
