import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import process from "@/assets/studio-process-seamless.webp.asset.json";
import cost from "@/assets/studio-cost.webp.asset.json";
import questions from "@/assets/studio-questions.webp.asset.json";
import { useOpenBrief } from "./brief-context";
import { btn } from "./primitives";

const STEPS = [
  { title: "Задача", text: "Определяем цели и сценарии" },
  { title: "Интерфейс", text: "Согласовываем структуру и дизайн" },
  { title: "Разработка", text: "Собираем и проверяем функции" },
  { title: "Запуск", text: "Готовим проект к работе" },
];

const FAQ = [
  { question: "Можно начать без готового ТЗ?", answer: "Да. Сначала обсудим задачу и определим требования к проекту. Начать можно с брифа, даже если пока есть только идея." },
  { question: "От чего зависят сроки?", answer: "От объёма функций, сложности интерфейса и интеграций. Обсудим этапы и сроки после того, как разберём вашу задачу." },
  { question: "Можно доработать существующий проект?", answer: "Сначала посмотрим, как устроен проект и что нужно изменить. Затем предложим подход к доработке интерфейса и функций." },
  { question: "Что происходит после запуска?", answer: "Обсудим поддержку и дальнейшее развитие: исправления, новые функции и изменения под задачи бизнеса." },
  { question: "Как передаются исходники и доступы?", answer: "Порядок передачи исходников и доступов согласуем до начала работы и зафиксируем в условиях проекта." },
];

export function StudioSections() {
  const openBrief = useOpenBrief();
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <>
      <section id="studio" aria-labelledby="studio-title" className="container-pb pb-studio-process scroll-mt-6">
        <div className="pb-studio-heading">
          <h2 id="studio-title" className="pb-studio-title">Внимание к деталям.<br />На каждом этапе.</h2>
          <p>От первой задачи<br />до работающего проекта.</p>
        </div>
        <img src={process.url} alt="Хромированный робот Pink Byte работает с панелями интерфейса" width={1600} height={720} loading="lazy" decoding="async" className="pb-process-image" />
        <ol className="pb-process-steps">
          {STEPS.map((step) => (
            <li key={step.title}>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
        <Button variant="link" onClick={openBrief} className="pb-process-link">Как мы работаем</Button>
      </section>

      <section aria-labelledby="cost-title" className="container-pb pb-studio-cost">
        <div className="pb-cost-layout">
          <img src={cost.url} alt="Объёмные слои проекта: интерфейс, функции и интеграции" width={1600} height={616} loading="lazy" decoding="async" className="pb-cost-image" />
          <div className="pb-cost-copy">
            <p className="pb-cost-label">Стоимость разработки</p>
            <h2 id="cost-title" className="pb-studio-title">Покажем, из чего<br />складывается<br />стоимость.</h2>
            <p className="pb-cost-description">Определяем функции, этапы и интеграции.<br className="hidden lg:block" /> Объясняем расчёт до начала разработки.</p>
            <Button onClick={openBrief} className={`${btn.paper} pb-cost-button h-auto`}>О стоимости</Button>
          </div>
        </div>
      </section>

      <section aria-labelledby="questions-title" className="container-pb pb-studio-faq">
        <div className="pb-faq-art">
          <h2 id="questions-title" className="pb-studio-title">Хороший проект<br />начинается<br />с вопросов.</h2>
          <img src={questions.url} alt="Серебряное облачко с вопросом и лаймовое облачко" width={800} height={600} loading="lazy" decoding="async" />
        </div>
        <div className="pb-faq-list">
          {FAQ.map((item, index) => (
            <div key={item.question} className="pb-faq-item">
              <h3>
                <Button variant="ghost" onClick={() => setExpanded(expanded === index ? null : index)} aria-expanded={expanded === index} aria-controls={`studio-answer-${index}`} className="pb-faq-toggle">
                  <span>{item.question}</span>
                  <span className="pb-faq-icon" aria-hidden="true">{expanded === index ? <Minus /> : <Plus />}</span>
                </Button>
              </h3>
              <div id={`studio-answer-${index}`} hidden={expanded !== index} className="pb-faq-answer">{item.answer}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}