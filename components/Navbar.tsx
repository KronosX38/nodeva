"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { LuPalette, LuGlobe, LuLaptop, LuArmchair, LuUsers, LuCloud } from "react-icons/lu";

// ---- Configuración de rutas de servicios ----
const SERVICES: Array<{
  title: string;
  icon: React.ReactNode;
  items: { label: string; href: string; desc?: string }[];
}> = [
    {
      title: "Diseño & Branding",
      icon: <LuPalette className="h-4 w-4 text-[#D4AF37]" />,
      items: [
        { label: "Logotipo e Identidad", href: "/servicios/branding" },
        { label: "Manual de Marca", href: "/servicios/branding#manual" },
        { label: "Piezas Gráficas", href: "/servicios/branding#piezas" },
      ],
    },
    {
      title: "Web & Digital",
      icon: <LuGlobe className="h-4 w-4 text-[#D4AF37]" />,
      items: [
        { label: "Sitios Web", href: "/servicios/web" },
        { label: "E-commerce", href: "/servicios/web#ecommerce" },
        { label: "Optimización & SEO", href: "/servicios/web#seo" },
      ],
    },
    {
      title: "Desarrollo de Software",
      icon: <LuLaptop className="h-4 w-4 text-[#D4AF37]" />,
      items: [
        { label: "Web Apps / SaaS", href: "/servicios/software#saas" },
        { label: "Apps Móviles", href: "/servicios/software#apps" },
        { label: "Integraciones & APIs", href: "/servicios/software#apis" },
      ],
    },
    {
      title: "Consultoría Empresarial",
      icon: <LuArmchair className="h-4 w-4 text-[#D4AF37]" />,
      items: [
        { label: "Procesos & Estrategia", href: "/servicios/consultoria#procesos" },
        { label: "Finanzas & Auditoría", href: "/servicios/consultoria#finanzas" },
        { label: "Emprendedores", href: "/servicios/consultoria#emprendedores" },
      ],
    },
    {
      title: "Recursos Humanos",
      icon: <LuUsers className="h-4 w-4 text-[#D4AF37]" />,
      items: [
        { label: "Reclutamiento", href: "/servicios/rh#reclutamiento" },
        { label: "Capacitación", href: "/servicios/rh#capacitacion" },
        { label: "Nómina", href: "/servicios/rh#nomina" },
      ],
    },
    {
      title: "Soporte & Nube",
      icon: <LuCloud className="h-4 w-4 text-[#D4AF37]" />,
      items: [
        { label: "Hosting & SSL", href: "/servicios/nube#hosting" },
        { label: "Backups & Seguridad", href: "/servicios/nube#backups" },
        { label: "Mantenimiento", href: "/servicios/nube#mantenimiento" },
      ],
    },
  ];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const mobileRef = useRef<HTMLDivElement>(null);
  const megaRef = useRef<HTMLDivElement>(null);
  const hoverTimer = useRef<NodeJS.Timeout | null>(null);

  const openServices = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    setServicesOpen(true);
  };
  const closeServicesDelayed = (ms = 220) => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setServicesOpen(false), ms);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setServicesOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        megaRef.current &&
        !megaRef.current.contains(e.target as Node) &&
        (e.target as Element)?.closest("#services-trigger") === null
      ) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors ${scrolled ? "bg-[#242424]/85 backdrop-blur border-b border-white/10" : "bg-transparent"
        }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/nodeva_bco.svg"
              alt="Nodeva"
              width={120}   // ajusta al tamaño real de tu logo
              height={68}
              className="hidden h-17 w-auto sm:block"
              priority
            />
            <Image
              src="/nodeva_mov.svg"
              alt="Nodeva"
              width={80}   // ajusta al tamaño real de tu logo móvil
              height={32}
              className="h-8 w-auto sm:hidden"
              priority
            />
          </Link>
          <nav className="hidden items-center gap-7 md:flex">
            <Link href="/" className="text-sm text-neutral-200 hover:text-[#D4AF37]">Inicio</Link>

            <div
              className="relative"
              onMouseEnter={openServices}
              onMouseLeave={() => closeServicesDelayed()}
            >
              <button
                id="services-trigger"
                className="text-sm text-neutral-200 hover:text-[#D4AF37]"
                onFocus={openServices}
                aria-haspopup="true"
                aria-expanded={servicesOpen}
              >
                Servicios
              </button>

              {servicesOpen && (
                <div
                  ref={megaRef}
                  className="absolute left-1/2 z-50 mt-2 -translate-x-1/2 w-[94vw] max-w-[1000px]"
                  onMouseEnter={openServices}
                  onMouseLeave={() => closeServicesDelayed()}
                >
                  <div className="absolute -top-2 left-0 right-0 h-3" />
                  <div className="grid grid-cols-1 gap-6 rounded-2xl border border-white/10 bg-[#242424] p-6 shadow-2xl sm:grid-cols-2 lg:grid-cols-3">
                    {SERVICES.map((col) => (
                      <div key={col.title}>
                        {/* Título de columna */}
                        <div className="text-[13px] sm:text-sm font-semibold leading-5 text-neutral-100">
                          {col.icon}
                          {col.title}
                        </div>
                        {/* Ítems */}
                        <ul className="mt-2 space-y-1.5">
                          {col.items.map((it) => (
                            <li key={it.label}>
                              <a
                                href={it.href}
                                className="block rounded-lg px-2 py-1.5 text-[13px] sm:text-sm leading-5 text-neutral-300 hover:bg-white/5 hover:text-[#D4AF37]"
                                onClick={() => setServicesOpen(false)}
                              >
                                {it.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link href="/nosotros" className="text-sm text-neutral-200 hover:text-[#D4AF37]">Nosotros</Link>
            <Link href="/blog" className="text-sm text-neutral-200 hover:text-[#D4AF37]">Blog</Link>
            <Link href="/contacto" className="text-sm text-neutral-200 hover:text-[#D4AF37]">Contáctanos</Link>
          </nav>

          <div className="hidden md:block">
            <a
              href="https://wa.me/529994532800"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-[#D4AF37] px-4 py-2 text-sm font-medium text-[#D4AF37] transition hover:bg-[#D4AF37] hover:text-[#242424]"
            >
              WhatsApp
            </a>
          </div>

          <button
            className="inline-flex items-center justify-center rounded-lg p-2 text-neutral-200 md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Abrir menú"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div ref={mobileRef} className="md:hidden">
          <div className="mx-3 mb-3 rounded-2xl border border-white/10 bg-[#242424] p-3">
            <Link href="/" className="block rounded-lg px-3 py-2 text-sm text-neutral-200 hover:bg-white/5">Inicio</Link>
            <details className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between rounded-lg px-3 py-2 text-sm text-neutral-200 hover:bg-white/5">
                <span>Servicios</span>
                <svg className="transition group-open:rotate-180" width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
              </summary>
              <div className="mt-1 space-y-2 rounded-lg bg-white/5 p-2">
                {SERVICES.map((col) => (
                  <div key={col.title}>
                    <div className="px-2 text-md font-semibold text-neutral-300">  {/* icono de la categoría */}
                      <span className="shrink-0 text-[#D4AF37]">{col.icon}</span>
                      <span>{col.title}</span></div>
                    {col.items.map((it) => (
                      <a
                        key={it.label}
                        href={it.href}
                        className="block rounded-md px-3 py-1.5 text-sm text-neutral-200 hover:bg-white/10"
                        onClick={() => setMobileOpen(false)}
                      >
                        {it.label}
                      </a>
                    ))}
                  </div>
                ))}
              </div>
            </details>

            <Link href="/nosotros" className="mt-1 block rounded-lg px-3 py-2 text-sm text-neutral-200 hover:bg-white/5">Nosotros</Link>
            <Link href="/blog" className="block rounded-lg px-3 py-2 text-sm text-neutral-200 hover:bg-white/5">Blog</Link>
            <Link href="/contacto" className="block rounded-lg px-3 py-2 text-sm text-neutral-200 hover:bg-white/5">Contáctanos</Link>

            <a
              href="https://wa.me/529994532800"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 block rounded-xl border border-[#D4AF37] px-4 py-2 text-center text-sm font-medium text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#242424]"
            >
              WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
