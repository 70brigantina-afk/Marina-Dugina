import { useEffect, useState } from 'react';
import { FadeImage, Reveal } from '../components/FadeImage';
import { Lightbox } from '../components/Lightbox';
import styles from './MarinaStormPage.module.css';

export const TELEGRAM_URL = 'https://t.me/MarinaDugina';

const TELEGRAM_HINT =
  'Перейдите в Telegram-канал и напишите под постом «УЧАСТВУЮ». Марина пришлёт ссылку на встречу в личные сообщения.';

const REGISTRATION_CTA_TRUST = [
  'Бесплатно',
  'Без долгой регистрации',
  'Ссылка приходит лично',
];

const TELEGRAM_FLOW_STEPS = [
  'Перейдите в Telegram',
  { text: 'Под последним постом напишите', badge: 'УЧАСТВУЮ' },
  'Марина пришлёт ссылку в личные сообщения',
];

const BASE = import.meta.env.BASE_URL;
const IMG = (name: string) => `${BASE}marina/${name}`;
const REVIEW_IMG = (name: string) => `${BASE}marina/reviews/${name}`;

const MEETING_DETAILS = [
  { label: 'Дата', value: '9 июля 2026' },
  { label: 'Время', value: '19:00 МСК' },
  { label: 'Формат', value: 'Онлайн' },
  { label: 'Площадка', value: 'Яндекс Телемост' },
  { label: 'Участие', value: 'Бесплатно' },
  { label: 'Ведущие', value: '2 психолога в эфире' },
];

const FOR_YOU_ITEMS = [
  'вы устали держаться и «быть сильной»',
  'тревога мешает спокойно жить',
  'внутри ощущение хаоса и неопределённости',
  'сложно принимать решения',
  'хочется поддержки без осуждения',
  'вы переживаете кризис, развод, конфликт или выгорание',
  'хочется вернуть контакт с собой',
  'вы хотите понять, что делать дальше',
];

const MEETING_TOPICS = [
  'почему тревога усиливается в нестабильное время',
  'как тело реагирует на стресс',
  'как снизить внутреннее напряжение',
  'как создавать внутренние опоры',
  'как вернуть себе спокойствие и ясность',
  'практические техники самопомощи',
  'ответы на вопросы участников',
];

const BENEFIT_ITEMS = [
  { icon: '💡', text: 'понимание, что с вами происходит' },
  { icon: '🌿', text: 'первые техники для снижения тревоги' },
  { icon: '🤝', text: 'ощущение поддержки' },
  { icon: '✨', text: 'больше ясности и спокойствия' },
  { icon: '🎁', text: 'чек-лист в подарок' },
  { icon: '📖', text: 'дополнительный подарок для тех, кто останется до конца встречи' },
];

const REVIEWS = [
  {
    name: 'Мария С.',
    avatar: 'maria-s.jpg',
    text: 'Замечательно, каждая встреча с вами не проходит даром и хочется всё запомнить и внедрить в свою жизнь. До сих пор просматриваю эфиры с вами.',
  },
  {
    name: 'Наталья',
    avatar: 'natalya.jpg',
    text: 'Мариночка, огромная благодарность за проведённый эфир. Столько было подсвечено неочевидных моментов, на которые мы часто не обращаем внимания. Благодарю за ценный эфир.',
  },
  {
    name: 'Анна, участница встречи',
    avatar: 'participant-1.jpg',
    text: 'Спасибо вам. Мне очень понравилась практика отпускания. Я адаптирую её под разные ситуации, и она очень помогает. После неё становится спокойно и легче.',
  },
  {
    name: 'Елена, участница встречи',
    avatar: 'participant-2.jpg',
    text: 'Очень полезная информация в нужное время. Спасибо, что устраиваете такие встречи. Практики обязательно буду использовать.',
  },
  {
    name: 'Александр П.',
    avatar: 'alexander-p.jpg',
    text: 'Очень понятно и доступно, на простом человеческом языке. Спасибо за полезную и важную информацию.',
  },
  {
    name: 'Анастасия С.',
    avatar: 'anastasia-s.jpg',
    text: 'Спасибо огромное, Марина. Я, как всегда, слушала и впитывала ваши слова как губка. Очень понятно и доступно.',
  },
];

const FAQ_ITEMS = [
  {
    q: 'Сколько стоит участие?',
    a: 'Участие бесплатное.',
  },
  {
    q: 'Где пройдёт встреча?',
    a: 'Онлайн, в Яндекс Телемосте. Ссылку Марина отправит участникам после записи.',
  },
  {
    q: 'Как записаться?',
    a: 'Перейдите в Telegram-канал и напишите под постом «УЧАСТВУЮ».',
  },
  {
    q: 'Будет ли запись?',
    a: 'Запись не гарантируется. Лучше быть онлайн, чтобы получить максимум пользы, задать вопросы и забрать подарочные материалы.',
  },
  {
    q: 'Подойдёт ли встреча, если я никогда не была у психолога?',
    a: 'Да. Встреча проходит мягко, понятно и без давления. Можно просто прийти, послушать и взять для себя полезные практики.',
  },
  {
    q: 'Что делать после встречи?',
    a: 'Можно остаться в Telegram-канале, забрать материалы и при желании обратиться к Марине за индивидуальной консультацией.',
  },
];

const EDU_TAGS = [
  'диплом психолога-консультанта',
  '1200 часов профессиональной переподготовки',
  'консультативная психология',
  'кризисная помощь',
  'психология семьи',
  'психодиагностика',
  'клиническая психология',
  'практический опыт сопровождения людей',
];

const DIPLOMA_CAPTION =
  'Диплом о профессиональной переподготовке по программе «Психологическое консультирование», 1200 академических часов.';

const DIPLOMA_IMAGES = [
  { src: IMG('diploma.jpg'), alt: 'Диплом психолога-консультанта' },
  { src: IMG('diploma-details.jpg'), alt: 'Программа обучения — перечень дисциплин' },
];

const PORTRAIT_POSITION = 'center 12%';

function useEventSchema() {
  useEffect(() => {
    const scriptId = 'event-jsonld';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Event',
      name: 'Навигация в шторм. Психология стресса и кризиса',
      startDate: '2026-07-09T19:00:00+03:00',
      eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
      eventStatus: 'https://schema.org/EventScheduled',
      location: { '@type': 'VirtualLocation', url: TELEGRAM_URL },
      organizer: { '@type': 'Person', name: 'Марина Дугина' },
      performer: [
        { '@type': 'Person', name: 'Марина Дугина' },
        { '@type': 'Person', name: 'Маргарита Ипполитова' },
      ],
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'RUB',
        url: TELEGRAM_URL,
      },
    });
    return () => {
      script?.remove();
    };
  }, []);
}

type CtaProps = {
  label: string;
  hint?: string;
  micro?: string;
  className?: string;
};

function CtaBlock({ label, hint, micro, className }: CtaProps) {
  return (
    <div className={`${styles.ctaWrap} ${className ?? ''}`}>
      <div className={styles.ctaInner}>
        <a
          href={TELEGRAM_URL}
          className={styles.ctaBtn}
          target="_blank"
          rel="noopener noreferrer"
        >
          {label}
        </a>
        {hint && <p className={styles.ctaHint}>{hint}</p>}
        {micro && <p className={styles.ctaMicro}>{micro}</p>}
      </div>
    </div>
  );
}

function TelegramFlowGuide({ className }: { className?: string }) {
  return (
    <div className={`${styles.flowGuide} ${className ?? ''}`}>
      {TELEGRAM_FLOW_STEPS.map((step, index) => (
        <div key={index} className={styles.flowGuideItem}>
          {index > 0 && (
            <div className={styles.flowGuideArrow} aria-hidden="true">
              ↓
            </div>
          )}
          <div className={styles.flowGuideStep}>
            <span className={styles.flowGuideNum} aria-hidden="true">
              {index + 1}
            </span>
            {typeof step === 'string' ? (
              <p className={styles.flowGuideText}>{step}</p>
            ) : (
              <div className={styles.flowGuideBody}>
                <p className={styles.flowGuideText}>{step.text}</p>
                <span className={styles.regWordBadge}>{step.badge}</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
    </svg>
  );
}

function RegistrationBlock() {
  return (
    <div className={styles.regColumn}>
      <h3 className={styles.regHeadline}>Получите приглашение всего за 30 секунд</h3>
      <p className={styles.regIntro}>
        Чтобы принять участие, достаточно перейти в Telegram и оставить комментарий под
        последним постом.
      </p>

      <div className={styles.regCtaStack}>
        <a
          href={TELEGRAM_URL}
          className={styles.regPrimaryBtn}
          target="_blank"
          rel="noopener noreferrer"
        >
          <TelegramIcon className={styles.regPrimaryBtnIcon} />
          <span className={styles.regPrimaryBtnLabel}>Получить приглашение в Telegram</span>
        </a>

        <div className={styles.regGuideCard}>
          <h4 className={styles.regGuideTitle}>Как попасть на встречу</h4>
          <TelegramFlowGuide />
          <p className={styles.regGuideTrust}>
            {REGISTRATION_CTA_TRUST.map((item, index) => (
              <span key={item}>
                {index > 0 && (
                  <span className={styles.regGuideTrustDot} aria-hidden="true">
                    {' '}
                    ·{' '}
                  </span>
                )}
                <span>✓ {item}</span>
              </span>
            ))}
          </p>
        </div>
      </div>

      <aside className={styles.regWhyCard}>
        <h4 className={styles.regWhyTitle}>Почему ссылка приходит лично?</h4>
        <p className={styles.regWhyText}>
          Потому что встреча проходит в небольшом формате живого общения. Каждый участник
          сможет задать вопросы. Запись встречи публиковаться не будет.
        </p>
      </aside>
    </div>
  );
}

function ReviewAvatar({ avatar, name }: { avatar: string; name: string }) {
  return (
    <img
      src={REVIEW_IMG(avatar)}
      alt={`Участник ${name}`}
      className={styles.reviewAvatarImg}
      loading="lazy"
      width={44}
      height={44}
    />
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.faqItem}>
      <button
        type="button"
        className={styles.faqQuestion}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        {question}
        <span className={`${styles.faqIcon} ${open ? styles.faqIconOpen : ''}`} aria-hidden="true">
          +
        </span>
      </button>
      {open && <div className={styles.faqAnswer}>{answer}</div>}
    </div>
  );
}

export function MarinaStormPage() {
  useEventSchema();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <div className={styles.page}>
      {lightboxIndex !== null && (
        <Lightbox
          images={DIPLOMA_IMAGES}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onIndexChange={setLightboxIndex}
        />
      )}

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={`${styles.heroGrid}`}>
          <div className={styles.heroContent}>
            <Reveal>
              <span className={styles.heroBadge}>Бесплатная онлайн-встреча</span>
              <h1 className={styles.heroTitle}>
                Навигация в шторм: как справляться со стрессом и кризисом, когда внутри всё
                нестабильно
              </h1>
              <p className={styles.heroSubtitle}>
                Бесплатная онлайн-встреча с Мариной Дугиной и Маргаритой Ипполитовой о тревоге,
                стрессе, внутренней опоре и способах вернуть себе спокойствие в непростое время.
              </p>
              <p className={styles.heroWarm}>
                Здесь вас примут, поймут и помогут найти опору — без давления, стыда и
                навязывания.
              </p>
            </Reveal>
          </div>
          <div className={styles.heroVisual}>
            <Reveal delay={120}>
              <div className={styles.heroImageFrame}>
                <div className={styles.heroImageWrap}>
                  <FadeImage
                    src={IMG('marina-hero.jpg')}
                    alt="Марина Дугина — психолог"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    objectPosition="center 28%"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal delay={160}>
          <div className={styles.meetingDetailsCard} aria-label="Детали встречи">
            <h2 className={styles.meetingDetailsTitle}>Детали встречи</h2>
            <dl className={styles.meetingDetailsGrid}>
              {MEETING_DETAILS.map((item) => (
                <div key={item.label} className={styles.meetingDetailItem}>
                  <dt className={styles.meetingDetailLabel}>{item.label}</dt>
                  <dd className={styles.meetingDetailValue}>{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>

    {/* Registration guide */}
      <section className={styles.registrationSection}>
        <div className={styles.container}>
          <Reveal>
            <RegistrationBlock />
          </Reveal>
        </div>
      </section>

      {/* For you */}
      <section className={styles.section}>
        <div className={styles.container}>
          <Reveal>
            <h2 className={styles.sectionTitle}>Эта встреча для вас, если…</h2>
          </Reveal>
          <div className={styles.cardGrid}>
            {FOR_YOU_ITEMS.map((item, i) => (
              <Reveal key={item} delay={i * 50}>
                <div className={styles.card}>
                  <div className={styles.cardIcon} aria-hidden="true">
                    ○
                  </div>
                  <p className={styles.cardText}>{item}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <CtaBlock
            label="Записаться через Telegram"
            hint={TELEGRAM_HINT}
            micro="Можно прийти, даже если вы раньше не были у психолога"
          />
        </div>
      </section>

      {/* Meeting */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.container}>
          <Reveal>
            <h2 className={styles.sectionTitle}>Что будет на встрече</h2>
          </Reveal>
          <div className={styles.listGrid}>
            {MEETING_TOPICS.map((topic, i) => (
              <Reveal key={topic} delay={i * 40}>
                <div className={styles.listItem}>
                  <span className={styles.listBullet}>{i + 1}</span>
                  <span>{topic}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className={styles.section}>
        <div className={styles.container}>
          <Reveal>
            <h2 className={styles.sectionTitle}>Что вы получите</h2>
          </Reveal>
          <div className={styles.benefitGrid}>
            {BENEFIT_ITEMS.map((item, i) => (
              <Reveal key={item.text} delay={i * 50}>
                <div className={styles.benefitCard}>
                  <span className={styles.benefitIcon} aria-hidden="true">
                    {item.icon}
                  </span>
                  <p className={styles.benefitText}>{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gift */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.container}>
          <Reveal>
            <h2 className={styles.sectionTitle}>Подарок за регистрацию</h2>
            <div className={styles.giftBox}>
              <p className={styles.giftMain}>
                Каждый участник получит чек-лист «10 практических техник, которые помогут вернуть
                контроль над эмоциями и снизить уровень стресса».
              </p>
              <p className={styles.giftAccent}>
                А те, кто останется до конца встречи, получат дополнительный подарок.
              </p>
            </div>
          </Reveal>
          <CtaBlock label="Получить доступ к встрече" hint={TELEGRAM_HINT} />
        </div>
      </section>

      {/* Speakers */}
      <section className={styles.section}>
        <div className={styles.container}>
          <Reveal>
            <h2 className={styles.sectionTitle}>Ведущие встречи</h2>
          </Reveal>
          <div className={styles.speakerGrid}>
            <Reveal delay={0} className={styles.revealSpeaker}>
              <article className={styles.speakerCard}>
                <div className={styles.speakerPhoto}>
                  <FadeImage
                    src={IMG('marina-about.jpg')}
                    alt="Марина Дугина"
                    objectPosition={PORTRAIT_POSITION}
                  />
                </div>
                <div className={styles.speakerBody}>
                  <h3 className={styles.speakerName}>Марина Дугина</h3>
                  <p className={styles.speakerRole}>Психолог-консультант</p>
                  <p className={styles.speakerText}>
                    Помогает людям справляться с тревогой, стрессом, кризисами, отношениями,
                    самооценкой и сложными жизненными ситуациями. В работе соединяет
                    психологическое образование, практический опыт и умение видеть
                    причинно-следственные связи.
                  </p>
                  <ul className={styles.speakerFacts}>
                    <li>17 лет службы в МВД</li>
                    <li>
                      С 2021 года — куратор по мышлению в Академии личных финансов, работа с
                      группами
                    </li>
                    <li>С конца 2025 года — личная психологическая практика</li>
                    <li>В январе 2026 года получила диплом психолога-консультанта</li>
                  </ul>
                </div>
              </article>
            </Reveal>

            <Reveal delay={80} className={styles.revealSpeaker}>
              <article className={styles.speakerCard}>
                <div className={styles.speakerPhoto}>
                  <FadeImage
                    src={IMG('margarita.jpg')}
                    alt="Маргарита Ипполитова"
                    objectPosition={PORTRAIT_POSITION}
                  />
                </div>
                <div className={styles.speakerBody}>
                  <h3 className={styles.speakerName}>Маргарита Ипполитова</h3>
                  <p className={styles.speakerRole}>
                    Психолог, художник и проводник в мир сакральных знаний
                  </p>
                  <p className={styles.speakerText}>
                    Соединяет психологию, древние шаманские практики, творчество и искусство как
                    арт-терапию. Помогает возвращать контакт с собой, ресурс, целостность,
                    внутреннюю силу и смыслы.
                  </p>
                  <ul className={styles.speakerFacts}>
                    <li>Сертифицированный специалист символдрамы</li>
                    <li>
                      Обучалась в Академии репарационной психологии и терапии Анны Черниговой
                      IARPT
                    </li>
                  </ul>
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Education */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.container}>
          <Reveal>
            <div className={styles.eduSection}>
              <h2 className={styles.sectionTitle}>Профессиональное образование</h2>
              <div className={styles.eduTags}>
                {EDU_TAGS.map((tag) => (
                  <span key={tag} className={styles.eduTag}>
                    {tag}
                  </span>
                ))}
              </div>
              <p className={styles.diplomaCaption}>{DIPLOMA_CAPTION}</p>
              <div className={styles.eduAction}>
                <button
                  type="button"
                  className={styles.diplomaViewBtn}
                  onClick={() => setLightboxIndex(0)}
                >
                  Посмотреть диплом
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Reviews */}
      <section className={styles.section}>
        <div className={styles.container}>
          <Reveal>
            <h2 className={styles.sectionTitle}>Что говорят участники</h2>
            <p className={styles.sectionIntro}>
              Живые отклики людей, которые уже были на встречах
            </p>
          </Reveal>
          <div className={styles.reviewsGrid}>
            {REVIEWS.map((review, i) => (
              <Reveal key={review.name + review.text.slice(0, 24)} delay={i * 60}>
                <blockquote className={styles.reviewCard}>
                  <header className={styles.reviewHeader}>
                    <ReviewAvatar avatar={review.avatar} name={review.name} />
                    <cite className={styles.reviewName}>{review.name}</cite>
                  </header>
                  <p className={styles.reviewMessage}>{review.text}</p>
                </blockquote>
              </Reveal>
            ))}
          </div>
          <CtaBlock label="Перейти в Telegram-канал" hint={TELEGRAM_HINT} />
        </div>
      </section>

      {/* FAQ */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.container}>
          <Reveal>
            <h2 className={styles.sectionTitle}>Частые вопросы</h2>
          </Reveal>
          <div className={styles.faqList}>
            {FAQ_ITEMS.map((item, i) => (
              <Reveal key={item.q} delay={i * 40}>
                <FaqItem question={item.q} answer={item.a} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className={styles.finalCta}>
        <div className={styles.container}>
          <Reveal>
            <h2 className={styles.finalCtaTitle}>
              Если внутри сейчас шторм — не обязательно проходить через него в одиночку
            </h2>
            <p className={styles.finalCtaText}>
              Приходите на бесплатную встречу. Это безопасное пространство, где можно получить
              поддержку, ясность и первые практические инструменты для себя.
            </p>
            <CtaBlock label="Записаться через Telegram" hint={TELEGRAM_HINT} />
          </Reveal>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <p>Навигация в шторм · 9 июля 2026 · Бесплатная онлайн-встреча</p>
        </div>
      </footer>
    </div>
  );
}
