import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M13.5 21v-7.5h2.5l.5-3h-3V8.75c0-.87.24-1.46 1.5-1.46h1.6V4.62A22 22 0 0 0 14.43 4.5c-2.35 0-3.93 1.43-3.93 4.07V10.5H8v3h2.5V21h3z" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" />
    </svg>
  );
}

function YoutubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4a2.5 2.5 0 0 0-1.8 1.8C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8zM10 15V9l5.2 3-5.2 3z" />
    </svg>
  );
}

const Facebook = FacebookIcon;
const Instagram = InstagramIcon;
const Youtube = YoutubeIcon;

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid gap-10 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent to-[color:var(--gold)]" />
            <div className="leading-none">
              <div className="font-serif text-lg font-semibold">Atomy Bangladesh</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Korean wellness, delivered
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
            Authentic Atomy products, curated for Bangladesh. Premium quality, honest pricing, and
            AI-guided recommendations to help you choose what truly works for you.
          </p>
          <div className="flex items-center gap-3 pt-2">
            {[
              { icon: Facebook, href: "#" },
              { icon: Instagram, href: "#" },
              { icon: Youtube, href: "#" },
            ].map((s, i) => (
              <a
                key={i}
                href={s.href}
                className="w-9 h-9 rounded-full border border-border bg-white flex items-center justify-center hover:bg-accent hover:text-white hover:border-accent transition-colors"
              >
                <s.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <FooterCol title="Shop">
          <FooterLink href="/products">All products</FooterLink>
          <FooterLink href="/products?category=skincare">Skincare</FooterLink>
          <FooterLink href="/products?category=haircare">Haircare</FooterLink>
          <FooterLink href="/products?category=health">Health</FooterLink>
          <FooterLink href="/products?category=personal-care">Personal care</FooterLink>
        </FooterCol>

        <FooterCol title="Discover">
          <FooterLink href="/consultation">AI Consultation</FooterLink>
          <FooterLink href="#">Bestsellers</FooterLink>
          <FooterLink href="#">New arrivals</FooterLink>
          <FooterLink href="#">Our story</FooterLink>
        </FooterCol>

        <FooterCol title="Contact">
          <li className="flex items-start gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
            <span>Gulshan 2, Dhaka 1212, Bangladesh</span>
          </li>
          <li className="flex items-center gap-2 text-sm text-muted-foreground">
            <Phone className="w-4 h-4 shrink-0" /> +880 1700 000000
          </li>
          <li className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="w-4 h-4 shrink-0" /> hello@atomy.com.bd
          </li>
        </FooterCol>
      </div>

      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} Atomy Bangladesh. All rights reserved.</div>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-accent">Privacy</a>
            <a href="#" className="hover:text-accent">Terms</a>
            <a href="#" className="hover:text-accent">Refund policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-foreground mb-4">
        {title}
      </h3>
      <ul className="space-y-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-sm text-muted-foreground hover:text-accent transition-colors">
        {children}
      </Link>
    </li>
  );
}
