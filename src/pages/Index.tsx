import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/c26bbbb4-1e1c-4ff2-807a-af675f33b7f5/files/ddb1822c-0be6-4328-86fb-fde3f95102a7.jpg";

const menuCategories = [
  {
    id: "hookah",
    label: "Кальяны",
    icon: "Wind",
    items: [
      { name: "Sultan's Dream", origin: "Египет", desc: "Двойное яблоко с нотками аниса и лёгкой сладостью — классика Востока", price: "1 200 ₽", tag: "Хит" },
      { name: "Dark Forest", origin: "Германия", desc: "Лесные ягоды, смородина, тёмный виноград — таинственная глубина вкуса", price: "1 400 ₽", tag: null },
      { name: "Amber Rose", origin: "ОАЭ", desc: "Роза, шафран и мёд — сложный аромат дворцов Персидского залива", price: "1 600 ₽", tag: "Премиум" },
      { name: "Ice Citrus", origin: "Индия", desc: "Грейпфрут, лайм, ментол — свежесть горных вершин в каждой затяжке", price: "1 300 ₽", tag: null },
      { name: "Black Orchid", origin: "Япония", desc: "Инжир, сандал, тонка-бобы — редкий флакон в мире кальяна", price: "1 800 ₽", tag: "Редкий" },
      { name: "Caramel Nights", origin: "Турция", desc: "Топлёная карамель, ваниль, сливки — роскошь осеннего вечера", price: "1 400 ₽", tag: null },
    ],
  },
  {
    id: "drinks",
    label: "Напитки",
    icon: "GlassWater",
    items: [
      { name: "Ember Signature", origin: "Авторский", desc: "Чёрный чай пуэр, имбирь, лемонграсс, золотой сироп", price: "650 ₽", tag: "Эксклюзив" },
      { name: "Rose Latte", origin: "Авторский", desc: "Вспенённое молоко, лепестки розы, кардамон, белый шоколад", price: "580 ₽", tag: null },
      { name: "Desert Mule", origin: "Авторский", desc: "Имбирное пиво, лайм, шафран, цветочный мёд", price: "720 ₽", tag: null },
      { name: "Midnight Espresso", origin: "Колумбия", desc: "Двойной ристретто, апельсиновая цедра, горький шоколад", price: "490 ₽", tag: null },
      { name: "Pearl Lemonade", origin: "Авторский", desc: "Личи, мята, базилик, жемчужная содовая", price: "540 ₽", tag: "Хит" },
    ],
  },
  {
    id: "snacks",
    label: "Закуски",
    icon: "UtensilsCrossed",
    items: [
      { name: "Сырная доска", origin: "Франция / Италия", desc: "Бри, пармезан, рокфор, мёд, орехи, виноград", price: "1 800 ₽", tag: null },
      { name: "Мезе", origin: "Ливан", desc: "Хумус, баба-гануш, лаваш, маслины, фаттуш", price: "1 200 ₽", tag: null },
      { name: "Брускетты Sultan", origin: "Авторские", desc: "Тартар из лосося, авокадо, икра тобико, золотой соус", price: "950 ₽", tag: "Шеф" },
    ],
  },
];

const reviews = [
  { name: "Александра М.", text: "Атмосфера на высшем уровне. Кальян Sultan's Dream — просто откровение. Вернусь обязательно.", rating: 5, date: "Март 2026" },
  { name: "Дмитрий К.", text: "Лучшая кальянная в городе. Персонал знает своё дело, интерьер — как в Дубае. Рекомендую Amber Rose.", rating: 5, date: "Февраль 2026" },
  { name: "Мария Л.", text: "Была на дне рождения. Организовали всё идеально: специальный стол, персональный кальянщик, фирменные напитки.", rating: 5, date: "Январь 2026" },
  { name: "Роман В.", text: "Наконец-то место, где понимаешь, что кальян — это искусство. Black Orchid — шедевр.", rating: 5, date: "Декабрь 2025" },
];

const galleryImages = [
  { src: HERO_IMAGE, label: "Главный зал" },
  { src: HERO_IMAGE, label: "VIP кабинет" },
  { src: HERO_IMAGE, label: "Атмосфера" },
  { src: HERO_IMAGE, label: "Детали" },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true);
    }, { threshold });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, inView };
}

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} ${className}`}
    >
      {children}
    </div>
  );
}

export default function Index() {
  const [activeMenu, setActiveMenu] = useState("hookah");
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingData, setBookingData] = useState({ name: "", phone: "", date: "", guests: "2", comment: "" });
  const [bookingSent, setBookingSent] = useState(false);

  const activeCategory = menuCategories.find(c => c.id === activeMenu)!;

  const navLinks = [
    { id: "about", label: "О нас" },
    { id: "menu", label: "Меню" },
    { id: "prices", label: "Цены" },
    { id: "gallery", label: "Галерея" },
    { id: "reviews", label: "Отзывы" },
    { id: "contacts", label: "Контакты" },
  ];

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSent(true);
    setTimeout(() => {
      setBookingOpen(false);
      setBookingSent(false);
      setBookingData({ name: "", phone: "", date: "", guests: "2", comment: "" });
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-obsidian text-smoke overflow-x-hidden">
      {/* NAVIGATION */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-16 py-5"
        style={{ background: "linear-gradient(to bottom, rgba(10,8,5,0.95), transparent)" }}>
        <a href="#hero" className="font-cormorant text-2xl tracking-[0.3em] text-gold font-light">EMBER</a>

        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map(l => (
            <a key={l.id} href={`#${l.id}`}
              className="font-montserrat text-xs tracking-[0.2em] uppercase text-smoke/70 hover:text-gold transition-colors duration-300">
              {l.label}
            </a>
          ))}
        </div>

        <button onClick={() => setBookingOpen(true)}
          className="hidden lg:block btn-gold px-7 py-2.5 rounded-none">
          Забронировать
        </button>

        <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden text-gold">
          <Icon name={menuOpen ? "X" : "Menu"} size={22} />
        </button>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8"
          style={{ background: "rgba(10,8,5,0.98)" }}>
          {navLinks.map((l) => (
            <a key={l.id} href={`#${l.id}`} onClick={() => setMenuOpen(false)}
              className="font-cormorant text-3xl tracking-widest text-smoke hover:text-gold transition-colors">
              {l.label}
            </a>
          ))}
          <button onClick={() => { setBookingOpen(true); setMenuOpen(false); }}
            className="btn-gold px-10 py-3 mt-4 rounded-none">
            Забронировать
          </button>
        </div>
      )}

      {/* HERO */}
      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMAGE} alt="EMBER" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(10,8,5,0.5) 0%, rgba(10,8,5,0.3) 40%, rgba(10,8,5,0.85) 100%)" }} />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="font-montserrat text-xs tracking-[0.5em] uppercase text-gold mb-6 animate-fade-in-up opacity-0 delay-100">
            Элитная кальянная
          </p>
          <h1 className="font-cormorant text-7xl lg:text-9xl font-light tracking-[0.15em] text-smoke mb-6 animate-fade-in-up opacity-0 delay-200">
            EMBER
          </h1>
          <div className="gold-divider w-32 mx-auto mb-8 animate-fade-in-up opacity-0 delay-300" />
          <p className="font-cormorant text-xl lg:text-2xl italic font-light text-smoke/80 mb-10 animate-fade-in-up opacity-0 delay-400">
            Где дым становится искусством
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up opacity-0 delay-500">
            <button onClick={() => setBookingOpen(true)} className="btn-gold px-10 py-4 rounded-none">
              Забронировать стол
            </button>
            <a href="#menu" className="btn-outline-gold px-10 py-4 rounded-none inline-flex items-center justify-center gap-2">
              Смотреть меню
            </a>
          </div>
        </div>

        <a href="#about" className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce text-gold/60">
          <Icon name="ChevronDown" size={28} />
        </a>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-28 px-6 lg:px-16 max-w-7xl mx-auto">
        <Section>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="font-montserrat text-xs tracking-[0.4em] uppercase text-gold mb-4">О кальянной</p>
              <h2 className="font-cormorant text-5xl lg:text-6xl font-light text-smoke mb-8 leading-tight">
                Пространство,<br />
                <span className="italic text-gold">рождённое</span> для тех,<br />
                кто ценит лучшее
              </h2>
              <div className="gold-divider w-16 mb-8" />
              <p className="font-montserrat text-sm text-smoke/70 leading-relaxed mb-6">
                EMBER — это не просто кальянная. Это особый мир, где каждая деталь продумана до совершенства: от редких сортов табака, отобранных со всего Востока, до интерьера, вдохновлённого дворцами арабских эмиратов.
              </p>
              <p className="font-montserrat text-sm text-smoke/70 leading-relaxed mb-10">
                Наши мастера кальяна прошли обучение в лучших заведениях Дубая и Стамбула. Каждый гость получает персональный сервис и неповторимый опыт.
              </p>
              <div className="grid grid-cols-3 gap-6">
                {[
                  { num: "47+", label: "Сортов табака" },
                  { num: "5 лет", label: "На рынке" },
                  { num: "12+", label: "Авторских напитков" },
                ].map(stat => (
                  <div key={stat.label} className="text-center">
                    <div className="font-cormorant text-3xl text-gold mb-1">{stat.num}</div>
                    <div className="font-montserrat text-xs text-smoke/50 tracking-widest uppercase">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img src={HERO_IMAGE} alt="Интерьер EMBER" className="w-full aspect-[3/4] object-cover" style={{ filter: "brightness(0.85)" }} />
              <div className="absolute inset-0 border border-gold/20" style={{ transform: "translate(16px, 16px)" }} />
              <div className="absolute bottom-6 left-6 card-luxury p-5">
                <div className="font-cormorant text-xl text-gold italic">Открыто ежедневно</div>
                <div className="font-montserrat text-xs text-smoke/70 mt-1 tracking-wider">14:00 — 03:00</div>
              </div>
            </div>
          </div>
        </Section>
      </section>

      {/* DIVIDER */}
      <div className="gold-divider mx-16 opacity-30" />

      {/* MENU */}
      <section id="menu" className="py-28 px-6 lg:px-16 max-w-7xl mx-auto">
        <Section>
          <div className="text-center mb-16">
            <p className="font-montserrat text-xs tracking-[0.4em] uppercase text-gold mb-4">Наше предложение</p>
            <h2 className="font-cormorant text-5xl lg:text-6xl font-light text-smoke mb-4">Меню</h2>
            <div className="gold-divider w-24 mx-auto" />
          </div>

          <div className="flex justify-center gap-2 mb-12 flex-wrap">
            {menuCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveMenu(cat.id)}
                className={`flex items-center gap-2 px-6 py-3 font-montserrat text-xs tracking-[0.2em] uppercase transition-all duration-300 rounded-none ${
                  activeMenu === cat.id
                    ? "bg-gold text-obsidian"
                    : "border border-gold/30 text-smoke/60 hover:border-gold/60 hover:text-smoke"
                }`}
              >
                <Icon name={cat.icon} size={14} />
                {cat.label}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {activeCategory.items.map((item, i) => (
              <div key={i} className="card-luxury p-6 group hover:border-gold/50 transition-all duration-300 relative overflow-hidden">
                {item.tag && (
                  <span className="absolute top-4 right-4 bg-gold text-obsidian font-montserrat text-[10px] tracking-wider uppercase px-2.5 py-1">
                    {item.tag}
                  </span>
                )}
                <div className="font-cormorant text-xl text-smoke group-hover:text-gold transition-colors duration-300 mb-1">
                  {item.name}
                </div>
                <div className="font-montserrat text-[10px] tracking-widest uppercase text-gold/60 mb-3">{item.origin}</div>
                <div className="gold-divider mb-4 opacity-30" />
                <p className="font-montserrat text-xs text-smoke/60 leading-relaxed mb-5">{item.desc}</p>
                <div className="font-cormorant text-2xl text-gold">{item.price}</div>
              </div>
            ))}
          </div>
        </Section>
      </section>

      {/* PRICES */}
      <section id="prices" className="py-28 px-6 lg:px-16" style={{ background: "linear-gradient(to bottom, transparent, rgba(201,168,76,0.04), transparent)" }}>
        <div className="max-w-5xl mx-auto">
          <Section>
            <div className="text-center mb-16">
              <p className="font-montserrat text-xs tracking-[0.4em] uppercase text-gold mb-4">Форматы визита</p>
              <h2 className="font-cormorant text-5xl lg:text-6xl font-light text-smoke mb-4">Цены</h2>
              <div className="gold-divider w-24 mx-auto" />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: "Стандарт",
                  price: "от 1 200 ₽",
                  period: "за кальян",
                  features: ["Один кальян на выбор", "Время — без ограничений", "Безалкогольные напитки", "Индивидуальный мастер"],
                  highlight: false,
                },
                {
                  name: "VIP",
                  price: "от 4 500 ₽",
                  period: "за стол",
                  features: ["До 4 кальянов", "Отдельный кабинет", "Авторские напитки в подарок", "Персональный кальянщик", "Закуски на выбор"],
                  highlight: true,
                },
                {
                  name: "Банкет",
                  price: "от 15 000 ₽",
                  period: "за мероприятие",
                  features: ["Весь зал или кабинет", "Эксклюзивное меню", "Неограниченно кальянов", "Менеджер мероприятия", "Фото/видео-зона"],
                  highlight: false,
                },
              ].map((plan, i) => (
                <div key={i} className={`relative p-8 ${plan.highlight ? "bg-gold text-obsidian" : "card-luxury"}`}>
                  {plan.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-obsidian text-gold font-montserrat text-[10px] tracking-widest uppercase px-4 py-1.5 border border-gold whitespace-nowrap">
                      Популярный
                    </div>
                  )}
                  <div className={`font-montserrat text-xs tracking-[0.3em] uppercase mb-4 ${plan.highlight ? "text-obsidian/70" : "text-gold/70"}`}>
                    {plan.name}
                  </div>
                  <div className={`font-cormorant text-4xl font-light mb-1 ${plan.highlight ? "text-obsidian" : "text-smoke"}`}>
                    {plan.price}
                  </div>
                  <div className={`font-montserrat text-xs mb-6 ${plan.highlight ? "text-obsidian/60" : "text-smoke/40"}`}>
                    {plan.period}
                  </div>
                  <div className={`h-px mb-6 ${plan.highlight ? "bg-obsidian/20" : "bg-gold/20"}`} />
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <Icon name="Check" size={14} className={`mt-0.5 flex-shrink-0 ${plan.highlight ? "text-obsidian" : "text-gold"}`} />
                        <span className={`font-montserrat text-xs leading-relaxed ${plan.highlight ? "text-obsidian/80" : "text-smoke/70"}`}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => setBookingOpen(true)}
                    className={`w-full py-3 font-montserrat text-xs tracking-widest uppercase transition-all duration-300 ${
                      plan.highlight
                        ? "bg-obsidian text-gold hover:bg-obsidian/80"
                        : "btn-outline-gold"
                    }`}
                  >
                    Забронировать
                  </button>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-28 px-6 lg:px-16 max-w-7xl mx-auto">
        <Section>
          <div className="text-center mb-16">
            <p className="font-montserrat text-xs tracking-[0.4em] uppercase text-gold mb-4">Пространство</p>
            <h2 className="font-cormorant text-5xl lg:text-6xl font-light text-smoke mb-4">Галерея</h2>
            <div className="gold-divider w-24 mx-auto" />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {galleryImages.map((img, i) => (
              <div key={i} className={`relative overflow-hidden group cursor-pointer ${i === 0 ? "col-span-2 row-span-2" : ""}`}>
                <div style={{ aspectRatio: "1" }}>
                  <img src={img.src} alt={img.label}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ filter: "brightness(0.7)" }} />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="font-montserrat text-xs tracking-widest uppercase text-gold">{img.label}</span>
                </div>
                <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/30 transition-all duration-300" />
              </div>
            ))}
          </div>
        </Section>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-28 px-6 lg:px-16" style={{ background: "rgba(201,168,76,0.03)" }}>
        <div className="max-w-6xl mx-auto">
          <Section>
            <div className="text-center mb-16">
              <p className="font-montserrat text-xs tracking-[0.4em] uppercase text-gold mb-4">Мнения гостей</p>
              <h2 className="font-cormorant text-5xl lg:text-6xl font-light text-smoke mb-4">Отзывы</h2>
              <div className="gold-divider w-24 mx-auto" />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {reviews.map((r, i) => (
                <div key={i} className="card-luxury p-8">
                  <div className="flex gap-1 mb-5">
                    {[...Array(r.rating)].map((_, j) => (
                      <span key={j} className="text-gold text-sm">★</span>
                    ))}
                  </div>
                  <p className="font-cormorant text-xl italic text-smoke/80 leading-relaxed mb-6">
                    «{r.text}»
                  </p>
                  <div className="gold-divider opacity-20 mb-5" />
                  <div className="flex justify-between items-center">
                    <span className="font-montserrat text-sm text-gold">{r.name}</span>
                    <span className="font-montserrat text-xs text-smoke/40">{r.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-28 px-6 lg:px-16 max-w-7xl mx-auto">
        <Section>
          <div className="text-center mb-16">
            <p className="font-montserrat text-xs tracking-[0.4em] uppercase text-gold mb-4">Найти нас</p>
            <h2 className="font-cormorant text-5xl lg:text-6xl font-light text-smoke mb-4">Контакты</h2>
            <div className="gold-divider w-24 mx-auto" />
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              {[
                { icon: "MapPin", label: "Адрес", value: "ул. Золотая, 12, Москва", sub: "Метро: Охотный ряд, 3 мин пешком" },
                { icon: "Phone", label: "Телефон", value: "+7 (495) 000-00-00", sub: "Звонки и WhatsApp" },
                { icon: "Clock", label: "Режим работы", value: "Ежедневно: 14:00 — 03:00", sub: "Пятница и суббота: до 05:00" },
                { icon: "Instagram", label: "Instagram", value: "@ember_lounge", sub: "Следите за новинками" },
              ].map((c, i) => (
                <div key={i} className="flex gap-5 items-start">
                  <div className="w-10 h-10 border border-gold/40 flex items-center justify-center flex-shrink-0">
                    <Icon name={c.icon} size={16} className="text-gold" />
                  </div>
                  <div>
                    <div className="font-montserrat text-[10px] tracking-[0.3em] uppercase text-gold/60 mb-1">{c.label}</div>
                    <div className="font-cormorant text-xl text-smoke">{c.value}</div>
                    <div className="font-montserrat text-xs text-smoke/50 mt-1">{c.sub}</div>
                  </div>
                </div>
              ))}

              <div className="pt-4">
                <button onClick={() => setBookingOpen(true)} className="btn-gold px-10 py-4 rounded-none">
                  Забронировать стол
                </button>
              </div>
            </div>

            <div className="card-luxury overflow-hidden">
              <div className="aspect-video bg-charcoal flex items-center justify-center relative">
                <div className="text-center">
                  <Icon name="MapPin" size={32} className="text-gold mx-auto mb-3" />
                  <div className="font-cormorant text-2xl text-smoke mb-1">EMBER Lounge</div>
                  <div className="font-montserrat text-xs text-smoke/50 tracking-wider">ул. Золотая, 12, Москва</div>
                </div>
                <div className="absolute inset-0 border border-gold/10" />
              </div>
            </div>
          </div>
        </Section>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gold/10 py-10 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="font-cormorant text-2xl tracking-[0.3em] text-gold">EMBER</div>
          <div className="font-montserrat text-xs text-smoke/30 tracking-wider text-center">
            © 2026 EMBER Lounge. Все права защищены.<br />
            <span className="text-smoke/20">Продажа алкоголя лицам до 18 лет запрещена.</span>
          </div>
          <div className="flex gap-4">
            {["Instagram", "Send", "Phone"].map(icon => (
              <button key={icon} className="w-9 h-9 border border-gold/30 flex items-center justify-center hover:border-gold transition-colors duration-300">
                <Icon name={icon} size={14} className="text-gold/60" />
              </button>
            ))}
          </div>
        </div>
      </footer>

      {/* BOOKING MODAL */}
      {bookingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(10,8,5,0.92)", backdropFilter: "blur(10px)" }}>
          <div className="card-luxury w-full max-w-lg p-8 relative" style={{ animation: "fadeInUp 0.4s ease forwards" }}>
            <button onClick={() => setBookingOpen(false)}
              className="absolute top-5 right-5 text-smoke/40 hover:text-gold transition-colors">
              <Icon name="X" size={20} />
            </button>

            {bookingSent ? (
              <div className="text-center py-8">
                <div className="font-cormorant text-5xl text-gold mb-4">✦</div>
                <h3 className="font-cormorant text-3xl text-smoke mb-3">Заявка принята</h3>
                <p className="font-montserrat text-sm text-smoke/60">Мы свяжемся с вами в ближайшее время для подтверждения.</p>
              </div>
            ) : (
              <>
                <p className="font-montserrat text-[10px] tracking-[0.4em] uppercase text-gold mb-2">Резервирование</p>
                <h3 className="font-cormorant text-3xl text-smoke mb-6">Забронировать стол</h3>
                <div className="gold-divider mb-8 opacity-30" />

                <form onSubmit={handleBooking} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="font-montserrat text-[10px] tracking-widest uppercase text-smoke/50 mb-2 block">Имя</label>
                      <input
                        required
                        value={bookingData.name}
                        onChange={e => setBookingData(p => ({ ...p, name: e.target.value }))}
                        className="w-full bg-transparent border border-gold/20 px-4 py-3 font-montserrat text-sm text-smoke placeholder-smoke/20 focus:border-gold focus:outline-none transition-colors"
                        placeholder="Ваше имя"
                      />
                    </div>
                    <div>
                      <label className="font-montserrat text-[10px] tracking-widest uppercase text-smoke/50 mb-2 block">Телефон</label>
                      <input
                        required
                        value={bookingData.phone}
                        onChange={e => setBookingData(p => ({ ...p, phone: e.target.value }))}
                        className="w-full bg-transparent border border-gold/20 px-4 py-3 font-montserrat text-sm text-smoke placeholder-smoke/20 focus:border-gold focus:outline-none transition-colors"
                        placeholder="+7 (___) ___-__-__"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="font-montserrat text-[10px] tracking-widest uppercase text-smoke/50 mb-2 block">Дата</label>
                      <input
                        required
                        type="date"
                        value={bookingData.date}
                        onChange={e => setBookingData(p => ({ ...p, date: e.target.value }))}
                        className="w-full bg-transparent border border-gold/20 px-4 py-3 font-montserrat text-sm text-smoke/80 focus:border-gold focus:outline-none transition-colors"
                        style={{ colorScheme: "dark" }}
                      />
                    </div>
                    <div>
                      <label className="font-montserrat text-[10px] tracking-widest uppercase text-smoke/50 mb-2 block">Гостей</label>
                      <select
                        value={bookingData.guests}
                        onChange={e => setBookingData(p => ({ ...p, guests: e.target.value }))}
                        className="w-full bg-charcoal border border-gold/20 px-4 py-3 font-montserrat text-sm text-smoke focus:border-gold focus:outline-none transition-colors"
                      >
                        {[1,2,3,4,5,6,7,8].map(n => (
                          <option key={n} value={n}>{n} {n === 1 ? "гость" : "гостя"}</option>
                        ))}
                        <option value="8+">8+ гостей</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="font-montserrat text-[10px] tracking-widest uppercase text-smoke/50 mb-2 block">Пожелания</label>
                    <textarea
                      value={bookingData.comment}
                      onChange={e => setBookingData(p => ({ ...p, comment: e.target.value }))}
                      rows={3}
                      className="w-full bg-transparent border border-gold/20 px-4 py-3 font-montserrat text-sm text-smoke placeholder-smoke/20 focus:border-gold focus:outline-none transition-colors resize-none"
                      placeholder="VIP кабинет, особые пожелания..."
                    />
                  </div>
                  <button type="submit" className="btn-gold w-full py-4 rounded-none mt-2">
                    Подтвердить бронирование
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
