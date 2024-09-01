import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';

type NavbarSmProps = {
  children: React.ReactNode;
};

const Path = (props: any) => (
  <motion.path
    fill="transparent"
    strokeWidth="1"
    stroke="currentColor"
    strokeLinecap="round"
    {...props}
  />
);

const MenuIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg width="23" height="23" viewBox="0 0 23 23">
    <Path
      variants={{
        closed: { d: "M 4 8 L 19 8" },
        open: { d: "M 5 18 L 18 5" }
      }}
      animate={isOpen ? "open" : "closed"}
    />
    <Path
      variants={{
        closed: { d: "M 4 16 L 19 16", opacity: 1 },
        open: { d: "M 5 5 L 18 18", opacity: 1 }
      }}
      animate={isOpen ? "open" : "closed"}
    />
  </svg>
);

export const NavbarSm: React.FC<NavbarSmProps> = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <button
          className="flex h-8 w-8 cursor-pointer items-center justify-center text-current focus:outline-none"
          aria-label="Open menu"
        >
          <MenuIcon isOpen={isOpen} />
        </button>
      </Dialog.Trigger>
      <AnimatePresence>
        {isOpen && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                className="fixed inset-0 bg-black/50 dark:bg-background"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            </Dialog.Overlay>
            <Dialog.Content asChild forceMount>
              <motion.div
                className="fixed inset-0 bg-white dark:bg-background shadow-xl focus:outline-none overflow-hidden flex flex-col"
                initial={{ y: "-100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-100%" }}
                transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
              >
                <Dialog.Title className="sr-only">Navigation Menu</Dialog.Title>
                <Dialog.Description className="sr-only">
                  A list of main navigation items for the website.
                </Dialog.Description>
                <div className="flex justify-end p-4">
                  <Dialog.Close asChild>
                    <button
                      className="text-current focus:outline-none"
                      aria-label="Close menu"
                    >
                      <MenuIcon isOpen={true} />
                    </button>
                  </Dialog.Close>
                </div>
                <motion.nav
                  className="flex-grow p-6"
                  initial="closed"
                  animate="open"
                  exit="closed"
                  variants={{
                    open: {
                      transition: { staggerChildren: 0.07, delayChildren: 0.2 }
                    },
                    closed: {
                      transition: { staggerChildren: 0.05, staggerDirection: -1 }
                    }
                  }}
                >
                  {React.Children.map(children, (child, i) => (
                    <motion.div
                      variants={{
                        open: {
                          y: 0,
                          opacity: 1,
                          transition: {
                            y: { stiffness: 1000, velocity: -100 }
                          }
                        },
                        closed: {
                          y: 50,
                          opacity: 0,
                          transition: {
                            y: { stiffness: 1000 }
                          }
                        }
                      }}
                    >
                      {child}
                    </motion.div>
                  ))}
                </motion.nav>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
};