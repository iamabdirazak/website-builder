"use client";
import React from "react";
import { SectionData, CanvasSection } from "/Users/abdirazak/Developer/website-builder/app/page";

interface SectionRendererProps {
  section: SectionData | CanvasSection;
}

export default function SectionRenderer({ section }: SectionRendererProps) {
  const { type, props } = section;

  switch (type) {
    case 'header':
      return (
        <header style={{ background: "#1a1a1c", color: "#fff", padding: "16px 32px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <img src={props.logo} alt="Logo" style={{ height: 32 }} />
            <nav style={{ display: "flex", gap: 24 }}>
              {props.navigation.map((item: string, i: number) => (
                <a key={i} href="#" style={{ color: "#fff", textDecoration: "none", fontSize: 14 }}>
                  {item}
                </a>
              ))}
            </nav>
          </div>
        </header>
      );

    case 'hero':
      return (
        <section
          style={{
            position: "relative",
            padding: "120px 32px",
            textAlign: "center",
            color: "#fff",
            backgroundImage: `url(${props.backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)" }} />
          <div style={{ position: "relative", zIndex: 1, maxWidth: 800, margin: "0 auto" }}>
            <h1 style={{ fontSize: 48, fontWeight: 700, marginBottom: 16 }}>{props.title}</h1>
            <p style={{ fontSize: 20, marginBottom: 32, opacity: 0.9 }}>{props.subtitle}</p>
            <a
              href={props.ctaLink}
              style={{
                display: "inline-block",
                background: "#007aff",
                color: "#fff",
                padding: "12px 32px",
                borderRadius: 8,
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              {props.ctaText}
            </a>
          </div>
        </section>
      );

    case 'features':
      return (
        <section style={{ padding: "64px 32px", background: "#f5f5f7" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <h2 style={{ fontSize: 36, fontWeight: 700, textAlign: "center", marginBottom: 48 }}>
              {props.title}
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 32 }}>
              {props.items.map((item: any, i: number) => (
                <div key={i} style={{ textAlign: "center", padding: 24, background: "#fff", borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
                  <div style={{ fontSize: 40, marginBottom: 16 }}>{item.icon}</div>
                  <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>{item.title}</h3>
                  <p style={{ fontSize: 14, color: "#666", lineHeight: 1.6 }}>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 'content':
      return (
        <section style={{ padding: "64px 32px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 48,
                alignItems: "center",
                flexDirection: props.imagePosition === 'left' ? 'row-reverse' : 'row',
              }}
            >
              <div>
                <h2 style={{ fontSize: 36, fontWeight: 700, marginBottom: 16 }}>{props.title}</h2>
                <p style={{ fontSize: 16, color: "#666", lineHeight: 1.8 }}>{props.content}</p>
              </div>
              <div>
                <img src={props.image} alt={props.title} style={{ width: "100%", borderRadius: 12, boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }} />
              </div>
            </div>
          </div>
        </section>
      );

    case 'gallery':
      return (
        <section style={{ padding: "64px 32px", background: "#f5f5f7" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <h2 style={{ fontSize: 36, fontWeight: 700, textAlign: "center", marginBottom: 48 }}>
              {props.title}
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 16 }}>
              {props.images.map((img: string, i: number) => (
                <img
                  key={i}
                  src={img}
                  alt={`Gallery ${i + 1}`}
                  style={{ width: "100%", borderRadius: 8, transition: "transform 0.2s" }}
                />
              ))}
            </div>
          </div>
        </section>
      );

    case 'testimonials':
      return (
        <section style={{ padding: "64px 32px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <h2 style={{ fontSize: 36, fontWeight: 700, textAlign: "center", marginBottom: 48 }}>
              {props.title}
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 32 }}>
              {props.testimonials.map((testimonial: any, i: number) => (
                <div key={i} style={{ background: "#fff", padding: 24, borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
                    <img src={testimonial.avatar} alt={testimonial.name} style={{ width: 48, height: 48, borderRadius: "50%" }} />
                    <span style={{ fontWeight: 600 }}>{testimonial.name}</span>
                  </div>
                  <p style={{ fontSize: 14, color: "#666", fontStyle: "italic", lineHeight: 1.6 }}>
                    "{testimonial.text}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 'footer':
      return (
        <footer style={{ background: "#1a1a1c", color: "#fff", padding: "32px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div style={{ display: "flex", gap: 24 }}>
                {props.links.map((link: string, i: number) => (
                  <a key={i} href="#" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: 14 }}>
                    {link}
                  </a>
                ))}
              </div>
              <div style={{ display: "flex", gap: 16 }}>
                {props.socialLinks.map((social: string, i: number) => (
                  <a key={i} href="#" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: 14 }}>
                    {social}
                  </a>
                ))}
              </div>
            </div>
            <div style={{ textAlign: "center", fontSize: 12, color: "rgba(255,255,255,0.5)" }}>
              {props.copyright}
            </div>
          </div>
        </footer>
      );

    default:
      return (
        <div style={{ padding: 32, background: "#f5f5f7", textAlign: "center", color: "#999" }}>
          Unknown section type: {type}
        </div>
      );
  }
}