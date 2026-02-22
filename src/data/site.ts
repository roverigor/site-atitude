export const siteConfig = {
  name: "Atitude Ensino",
  description: "Ha 15 anos transformando vidas em Ibaiti-PR",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://atitudeensino.com.br",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5543999999999",
  phone: "(43) 3546-1234",
  email: "contato@atitudeensino.com.br",
  address: {
    street: "Rua XV de Novembro, 123",
    city: "Ibaiti",
    state: "PR",
    zip: "84900-000",
  },
  hours: {
    weekdays: "Seg-Sex: 8h as 21h",
    saturday: "Sabado: 8h as 12h",
  },
  social: {
    instagram: "https://instagram.com/atitudeensino",
    facebook: "https://facebook.com/atitudeensino",
    tiktok: "https://tiktok.com/@atitudeensino",
  },
  stats: {
    years: 15,
    students: 1500,
    courses: 40,
    partners: 10,
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "Cursos", href: "/cursos" },
    { label: "Ingles", href: "/ingles" },
    { label: "Sobre", href: "/sobre" },
    { label: "Blog", href: "/blog" },
    { label: "Contato", href: "/contato" },
  ],
} as const;
