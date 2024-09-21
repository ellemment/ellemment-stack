import { Link, useLocation } from '@remix-run/react';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import React, { useState, useRef, useEffect, useId } from 'react';
import Logo from '#app/components/logo';
import { Container } from '#app/components/ui/container';
import NavbarContents from '#app/ellemment-ui/components/navigation/nabar-contents';
import { ThemeSwitch } from '#app/routes/resources+/theme-switch';
import { type Theme } from '#app/utils/theme.server';


interface GlobalHeaderProps {
  userPreference: Theme | null;
  className?: string;
}

function MenuIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M2 6h20v2H2zM2 16h20v2H2z" />
    </svg>
  );
}

function XIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="m5.636 4.223 14.142 14.142-1.414 1.414L4.222 5.637z" />
      <path d="M4.222 18.363 18.364 4.22l1.414 1.414L5.636 19.777z" />
    </svg>
  );
}


export function GlobalHeader({  userPreference, className = ''}: GlobalHeaderProps) {
  const [expanded, setExpanded] = useState(false);
  const panelId = useId();
  const openRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (
        event.target instanceof HTMLElement &&
        event.target.closest('a')?.href === window.location.href
      ) {
        setExpanded(false);
      }
    }

    window.addEventListener('click', onClick);

    return () => {
      window.removeEventListener('click', onClick);
    };
  }, []);

  useEffect(() => {
    setExpanded(false);
  }, [location]);

  return (
    <MotionConfig transition={{ duration: 0.15 }}>
      <header className={`bg-white shadow-sm ring-1 ring-zinc-950/5 dark:bg-zinc-900 dark:ring-white/10 ${className}`}>
        <div 
          className="absolute left-0 right-0 top-0 z-40 py-6" 
          aria-hidden={expanded ? 'true' : undefined}
        >
          <Container>
            <div className="flex items-center justify-between">
              <Logo />
              <div className="flex items-center gap-x-4">
              <ThemeSwitch userPreference={userPreference} />
                <button
                  ref={openRef}
                  type="button"
                  onClick={() => {
                    setExpanded(true);
                    window.setTimeout(() => closeRef.current?.focus({ preventScroll: true }));
                  }}
                  aria-expanded={expanded ? 'true' : 'false'}
                  aria-controls={panelId}
                  className="group -m-2.5 rounded-full p-2.5 transition hover:bg-muted/10"
                  aria-label="Toggle navigation"
                >
                  <MenuIcon className="h-4 w-4 fill-neutral-950 dark:fill-neutral-200 group-hover:fill-neutral-500" />
                </button>
              </div>
            </div>
          </Container>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              id={panelId}
              className="relative z-50 overflow-hidden bg-white shadow-sm  dark:bg-zinc-900 dark:ring-white/10"
              aria-hidden={expanded ? undefined : 'true'}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, delay: 0.1 }}
              >
                <div ref={navRef} className="py-6">
                  <Container>
                    <div className="flex items-center justify-between">
                      <Logo />
                      <button
                        ref={closeRef}
                        type="button"
                        onClick={() => {
                          setExpanded(false);
                          window.setTimeout(() => openRef.current?.focus({ preventScroll: true }));
                        }}
                        aria-label="Close navigation"
                        className="group -m-2.5 rounded-full p-2.5 transition"
                      >
                        <XIcon className="h-4 w-4 fill-neutral-400 group-hover:fill-neutral-500" />
                      </button>
                    </div>
                  </Container>
                </div>
                <NavbarContents />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </MotionConfig>
  );
}

GlobalHeader.Logo = Logo;