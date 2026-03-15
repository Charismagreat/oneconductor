import Link from "next/link";
import { Home, ClipboardList, PenTool, MessageSquare, Factory, ShieldCheck, Package, Users } from "lucide-react";

export function BottomNav() {
  const navItems = [
    { label: "홈", icon: Home, href: "/" },
    { label: "생산", icon: Factory, href: "/ops/production" },
    { label: "품질", icon: ShieldCheck, href: "/ops/qa" },
    { label: "연구", icon: PenTool, href: "/ops/rnd" },
    { label: "자재", icon: Package, href: "/ops/scm" },
    { label: "인사", icon: Users, href: "/ops/hr" },
    { label: "AI", icon: MessageSquare, href: "/ai" },
  ];

  return (
    <nav className="fixed bottom-0 w-full bg-background border-t border-border flex justify-around items-center h-16 md:hidden z-50">
      {navItems.map((item) => (
        <Link 
          key={item.href} 
          href={item.href}
          className="flex flex-col items-center justify-center w-full h-full text-muted-foreground hover:text-foreground transition-colors"
        >
          <item.icon className="h-6 w-6 mb-1" />
          <span className="text-[10px] font-medium">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}
