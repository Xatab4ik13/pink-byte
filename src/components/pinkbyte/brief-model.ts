export const BRIEF_PRICE = 0;
export const BRIEF_QUESTIONS = [
  { title: "Идея", question: "Привет! Я робот Pink Byte. Что вы хотите создать и какую задачу должен решить проект?", placeholder: "Например, сайт для мебельной мастерской…" },
  { title: "Аудитория", question: "Для кого мы создаём продукт? Расскажите о ваших клиентах и о том, что для них важно.", placeholder: "Кто будет пользоваться сайтом или сервисом?" },
  { title: "Возможности", question: "Что человек должен уметь делать на сайте? Какие функции нужны в первую очередь?", placeholder: "Каталог, заявки, оплата, личный кабинет…" },
  { title: "Стиль и материалы", question: "Каким вы представляете проект? Есть примеры, тексты, логотип или другие материалы?", placeholder: "Опишите настроение или приложите примеры…" },
  { title: "Сроки и пожелания", question: "Есть желаемая дата запуска, ориентир по бюджету или важные ограничения? Если пока нет — так и напишите.", placeholder: "Можно написать: пока не определились…" },
] as const;

export type BriefAnswer = { text: string; files: string[] };
export function canSubmitAnswer(answer: BriefAnswer) {
  return answer.text.trim().length > 0 || answer.files.length > 0;
}
export function createBrief(answers: BriefAnswer[]) {
  return ["# Черновик технического задания", "Pink Byte · бесплатный бриф", ...BRIEF_QUESTIONS.map((q, index) => {
    const answer = answers[index];
    return `## ${q.title}\n${answer?.text.trim() || "Требует уточнения"}${answer?.files.length ? `\nМатериалы: ${answer.files.join(", ")}` : ""}`;
  }), "## Следующий шаг\nУточнить состав страниц, сценарии, интеграции и критерии приёмки со студией. Это черновик по вашим ответам, не окончательное ТЗ."].join("\n\n");
}