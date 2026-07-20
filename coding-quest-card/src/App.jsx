import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"

const quests = [
  {
    id: "rename",
    number: "01",
    time: "약 10분",
    title: "변수 이름 하나를\n더 명확하게 바꾸기",
    description:
      "최근 작성한 코드에서 의미가 모호한 변수 하나를 찾아, 역할이 바로 보이는 이름으로 바꿔보세요.",
    tag: "리팩터링",
  },
  {
    id: "empty-state",
    number: "02",
    time: "약 15분",
    title: "빈 상태 화면에\n친절한 문장 더하기",
    description:
      "데이터가 없을 때 사용자가 다음 행동을 알 수 있도록 짧고 분명한 안내 문장을 작성해보세요.",
    tag: "UX",
  },
  {
    id: "test-case",
    number: "03",
    time: "약 20분",
    title: "놓치기 쉬운 경우를\n테스트 하나로 남기기",
    description:
      "경계값이나 실패 상황 하나를 골라, 다음의 나를 지켜줄 작은 테스트를 추가해보세요.",
    tag: "테스트",
  },
  {
    id: "delete-code",
    number: "04",
    time: "약 10분",
    title: "더는 쓰지 않는\n코드 한 조각 지우기",
    description:
      "주석 처리된 코드나 사용하지 않는 함수 하나를 찾아 안전하게 정리하고 흐름을 가볍게 만들어보세요.",
    tag: "정리",
  },
  {
    id: "read-docs",
    number: "05",
    time: "약 15분",
    title: "익숙한 API의 문서를\n한 번 더 읽어보기",
    description:
      "자주 쓰는 API 하나의 공식 문서를 열어 몰랐던 옵션이나 주의점 하나를 메모해보세요.",
    tag: "학습",
  },
]

function getNextQuest(currentId) {
  const choices = quests.filter((quest) => quest.id !== currentId)
  return choices[Math.floor(Math.random() * choices.length)]
}

export default function App() {
  const [quest, setQuest] = useState(quests[0])
  const [isComplete, setIsComplete] = useState(false)

  const drawQuest = () => {
    setQuest(getNextQuest(quest.id))
    setIsComplete(false)
  }

  return (
    <main className="app-shell">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />

      <header className="topbar">
        <a className="brand" href="/" aria-label="오늘의 코딩 퀘스트 홈">
          <span className="brand-mark" aria-hidden="true">
            C
          </span>
          <span>CODING QUEST</span>
        </a>
        <p>작지만 확실한 오늘의 성장</p>
      </header>

      <section className="hero" aria-labelledby="page-title">
        <div className="eyebrow">
          <span />
          DAILY CHALLENGE
          <span />
        </div>
        <h1 id="page-title">
          오늘의 코딩
          <br />
          <em>퀘스트</em>
        </h1>
        <p className="intro">
          거창한 계획 대신, 지금 끝낼 수 있는 한 가지.
          <br />
          카드를 뽑고 오늘의 작은 성취를 시작하세요.
        </p>
      </section>

      <section className="quest-stage" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.article
            className={`quest-card${isComplete ? " is-complete" : ""}`}
            key={`${quest.id}-${isComplete}`}
            initial={{ opacity: 0, y: 18, rotate: -0.6 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            exit={{ opacity: 0, y: -14, rotate: 0.6 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="card-topline">
              <span>QUEST / {quest.number}</span>
              <span className="time">{quest.time}</span>
            </div>

            <div className="card-body">
              <span className="quest-tag">{quest.tag}</span>
              {isComplete ? (
                <>
                  <div className="complete-mark" aria-hidden="true">
                    ✓
                  </div>
                  <h2>퀘스트 완료!</h2>
                  <p>
                    오늘도 작은 한 걸음을 끝냈어요.
                    <br />
                    이 감각을 기억해두세요.
                  </p>
                </>
              ) : (
                <>
                  <span className="prompt-label">TODAY&apos;S QUEST</span>
                  <h2>
                    {quest.title.split("\n").map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </h2>
                  <p>{quest.description}</p>
                </>
              )}
            </div>

            <div className="card-footer" aria-hidden="true">
              <span>START SMALL</span>
              <span className="footer-line" />
              <span>KEEP GOING</span>
            </div>
          </motion.article>
        </AnimatePresence>
      </section>

      <div className="actions">
        <motion.button
          className="primary-button"
          type="button"
          onClick={() => setIsComplete(true)}
          disabled={isComplete}
          whileTap={isComplete ? undefined : { scale: 0.97 }}
        >
          <span>{isComplete ? "오늘의 퀘스트 완료" : "완료했어요"}</span>
          <span aria-hidden="true">{isComplete ? "✓" : "→"}</span>
        </motion.button>

        <motion.button
          className="draw-button"
          type="button"
          onClick={drawQuest}
          whileTap={{ scale: 0.97 }}
        >
          <span className="shuffle" aria-hidden="true">
            ↝
          </span>
          다른 퀘스트 뽑기
        </motion.button>
      </div>

      <footer>
        <span>ONE QUEST A DAY</span>
        <span className="footer-dot" />
        <span>BUILD YOUR MOMENTUM</span>
      </footer>
    </main>
  )
}
