import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"

const quests = [
  {
    id: "rename",
    label: "리팩터링",
    time: "약 10분",
    title: "변수 이름 하나를 더 명확하게 바꾸기",
    description:
      "최근 작성한 코드에서 의미가 모호한 변수 하나를 찾아, 역할이 바로 보이는 이름으로 바꿔보세요.",
  },
  {
    id: "empty-state",
    label: "UX",
    time: "약 15분",
    title: "빈 상태 화면에 친절한 문장 더하기",
    description:
      "데이터가 없을 때 사용자가 다음 행동을 알 수 있도록 짧고 분명한 안내 문장을 작성해보세요.",
  },
  {
    id: "test-case",
    label: "테스트",
    time: "약 20분",
    title: "놓치기 쉬운 경우를 테스트 하나로 남기기",
    description:
      "경계값이나 실패 상황 하나를 골라, 다음의 나를 지켜줄 작은 테스트를 추가해보세요.",
  },
  {
    id: "delete-code",
    label: "정리",
    time: "약 10분",
    title: "더는 쓰지 않는 코드 한 조각 지우기",
    description:
      "주석 처리된 코드나 사용하지 않는 함수 하나를 찾아 안전하게 정리해보세요.",
  },
  {
    id: "read-docs",
    label: "학습",
    time: "약 15분",
    title: "익숙한 API의 공식 문서 다시 읽기",
    description:
      "자주 쓰는 API 하나의 공식 문서를 열어 몰랐던 옵션이나 주의점 하나를 메모해보세요.",
  },
]

function pickAnotherQuest(currentId) {
  const candidates = quests.filter((quest) => quest.id !== currentId)
  return candidates[Math.floor(Math.random() * candidates.length)]
}

export default function App() {
  const [quest, setQuest] = useState(quests[0])
  const [isComplete, setIsComplete] = useState(false)

  function drawQuest() {
    setQuest((current) => pickAnotherQuest(current.id))
    setIsComplete(false)
  }

  return (
    <main className="app-shell">
      <header className="site-header">
        <a className="brand" href="/" aria-label="오늘의 코딩 퀘스트 홈">
          <span className="brand-mark" aria-hidden="true">
            CQ
          </span>
          CODING QUEST
        </a>
        <span>작지만 확실한 오늘의 성장</span>
      </header>

      <section className="intro" aria-labelledby="page-title">
        <p className="eyebrow">DAILY CHALLENGE</p>
        <h1 id="page-title">
          오늘의 코딩 <em>퀘스트</em>
        </h1>
        <p>거창한 계획 대신, 지금 끝낼 수 있는 한 가지를 뽑아보세요.</p>
      </section>

      <section className="quest-stage" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.article
            className={`quest-card${isComplete ? " complete" : ""}`}
            key={`${quest.id}-${isComplete ? "complete" : "active"}`}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="card-meta">
              <span>{quest.label}</span>
              <span>{quest.time}</span>
            </div>

            {isComplete ? (
              <div className="card-content completed-content">
                <span className="check" aria-hidden="true">
                  ✓
                </span>
                <p className="card-kicker">QUEST COMPLETE</p>
                <h2>오늘의 퀘스트 완료!</h2>
                <p>작은 한 걸음이 쌓여 실력이 됩니다. 수고했어요.</p>
              </div>
            ) : (
              <div className="card-content">
                <p className="card-kicker">TODAY&apos;S QUEST</p>
                <h2>{quest.title}</h2>
                <p>{quest.description}</p>
              </div>
            )}

            <p className="card-footer">START SMALL · KEEP GOING</p>
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
          {isComplete ? "완료한 퀘스트예요" : "완료했어요"}
          <span aria-hidden="true">{isComplete ? "✓" : "→"}</span>
        </motion.button>

        <motion.button
          className="secondary-button"
          type="button"
          onClick={drawQuest}
          whileTap={{ scale: 0.97 }}
        >
          <span aria-hidden="true">↻</span>
          다른 퀘스트 뽑기
        </motion.button>
      </div>

      <footer className="site-footer">ONE QUEST A DAY · BUILD YOUR MOMENTUM</footer>
    </main>
  )
}
