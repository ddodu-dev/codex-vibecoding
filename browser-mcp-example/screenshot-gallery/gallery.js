const captures = [
  {
    siteName: "ChatGPT Work Mode",
    url: "https://learn.chatgpt.com/docs/get-started-with-work",
    capturedAt: "2026-07-20",
    image: "./public/site-shots/chatgpt-work-mode-2026-07-20-1365x768.png",
    note: "ChatGPT Work mode를 시작하는 방법을 안내하는 문서 화면입니다.",
  },
  {
    siteName: "ChatGPT Models",
    url: "https://learn.chatgpt.com/docs/models?surface=app",
    capturedAt: "2026-07-20",
    image: "./public/site-shots/chatgpt-models-2026-07-20-1365x768.png",
    note: "ChatGPT 앱에서 사용할 수 있는 모델을 소개하는 문서 화면입니다.",
  },
  {
    siteName: "ChatGPT Quickstart",
    url: "https://learn.chatgpt.com/docs/quickstart",
    capturedAt: "2026-07-20",
    image: "./public/site-shots/chatgpt-quickstart-2026-07-20-1365x768.png",
    note: "ChatGPT의 주요 기능을 빠르게 시작할 수 있도록 안내하는 문서 화면입니다.",
  },
];

const gallery = document.querySelector("[data-gallery]");

gallery.innerHTML = captures
  .map(
    (capture) => `
      <article class="site-card">
        <a class="site-card__image-frame" href="${capture.url}" target="_blank" rel="noreferrer">
          <img class="site-card__image" src="${capture.image}" alt="${capture.siteName} 페이지 스크린샷" />
        </a>
        <div class="site-card__body">
          <h2 class="site-card__title">${capture.siteName}</h2>
          <a class="site-card__url" href="${capture.url}" target="_blank" rel="noreferrer">${capture.url}</a>
          <p class="site-card__meta">
            <span>캡처 날짜 ${capture.capturedAt}</span>
            <span>1365x768</span>
          </p>
          <p class="site-card__note">${capture.note}</p>
        </div>
      </article>
    `,
  )
  .join("");
