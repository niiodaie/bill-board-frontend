import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth, useLogout } from "@/lib/auth";
import { useLocation as useLocationContext } from "@/context/LocationContext";
import { LanguageSwitcher } from "@/components/language-switcher";
import { MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";

export function Navigation() {
  const [location] = useLocation();
  const { data: auth, isLoading } = useAuth();
  const { location: userLocation } = useLocationContext();
  const { t } = useTranslation();
  const logout = useLogout();

  const handleLogout = () => {
    logout.mutate();
  };

  return (
    <header className="bg-dark-bg border-b border-gray-800 sticky top-0 z-50 glass-effect">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <h1 className="text-3xl font-orbitron font-bold text-neon-pink neon-text cursor-pointer">
                Billboard
              </h1>
            </Link>
            <span className="text-sm bg-neon-gold text-black px-2 py-1 rounded font-medium">
              BETA
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="/#billboard" className="hover:text-neon-cyan transition-colors">{t('nav.billboard')}</a>
            <Link href="/surprises">
              <span className="hover:text-neon-cyan transition-colors cursor-pointer">{t('nav.surprises')}</span>
            </Link>
            <Link href="/deals">
              <span className="hover:text-neon-cyan transition-colors cursor-pointer">{t('nav.deals')}</span>
            </Link>
            <Link href="/today">
              <span className="hover:text-neon-cyan transition-colors cursor-pointer">{t('nav.today')}</span>
            </Link>
            {auth?.user && (
              <>
                <Link href="/booking">
                  <span className="hover:text-neon-cyan transition-colors cursor-pointer">{t('nav.booking')}</span>
                </Link>
                <Link href="/create-ad">
                  <span className="hover:text-neon-cyan transition-colors cursor-pointer">{t('nav.create_ad')}</span>
                </Link>
                <Link href="/dashboard">
                  <span className="hover:text-neon-cyan transition-colors cursor-pointer">{t('nav.dashboard')}</span>
                </Link>
              </>
            )}
            <a href="/#pricing" className="hover:text-neon-cyan transition-colors">
              {t('nav.pricing')}
            </a>
          </div>

          <div className="flex items-center space-x-4">
            {/* Location Display */}
            {userLocation.city && userLocation.country && (
              <div className="flex items-center space-x-1 text-sm text-gray-400">
                <MapPin className="w-3 h-3" />
                <span>{userLocation.city}, {userLocation.country}</span>
              </div>
            )}
            
            {/* Language Switcher */}
            <LanguageSwitcher />
            
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-neon-cyan border-t-transparent rounded-full animate-spin" />
            ) : auth?.user ? (
              <>
                <span className="text-sm text-gray-300">
                  Welcome, {auth.user.username}
                </span>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="border-neon-pink text-neon-pink hover:bg-neon-pink hover:text-white"
                >
                  {t('nav.logout')}
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth">
                  <Button className="bg-neon-pink hover:bg-pink-600 animate-pulse-glow">
                    {t('nav.login')}
                  </Button>
                </Link>
                <Link href="/auth">
                  <Button
                    variant="outline"
                    className="border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-black"
                  >
                    {t('nav.register')}
                  </Button>
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
