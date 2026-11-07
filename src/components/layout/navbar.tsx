"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  LogOutIcon,
  MenuIcon,
  XIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { authClient } from "@/lib/auth-client"

const navLinks = [
  { label: "Browse Jobs", href: "/browse-jobs" },
  { label: "Company", href: "/company" },
  { label: "Pricing", href: "/pricing" },
] as const

function getLinkClassName(active: boolean) {
  return `text-sm transition-colors ${active
      ? "font-medium text-white"
      : "text-zinc-300 hover:text-white"
    }`
}

function getSheetLinkClassName(active: boolean) {
  return `block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${active
      ? "bg-white/10 text-indigo-400"
      : "text-zinc-300 hover:bg-white/10 hover:text-white"
    }`
}

export function Navbar() {
  const { data: session, isPending } = authClient.useSession()
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const user = session?.user ?? null
  const userInitial = user?.name?.charAt(0).toUpperCase() ?? "U"

  async function handleSignOut() {
    await authClient.signOut()
    router.push("/")
    router.refresh()
  }

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-[#212121]">
      <nav className="relative flex h-16 w-full items-center justify-between px-4 sm:px-6 md:h-20 md:px-8">
        {/* Logo — flush to the left edge */}
        <Link
          href="/"
          className="shrink-0 md:-ml-2 lg:-ml-3"
          aria-label="Hire Loop home"
        >
          <Image
            src="/images/logo.png"
            alt="Hire Loop logo"
            width={154}
            height={44}
            priority
            className="h-9 w-auto md:h-10 lg:h-11"
          />
        </Link>

        {/* Mobile hamburger */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="text-zinc-300 hover:bg-white/10 hover:text-white md:hidden"
              />
            }
          >
            <MenuIcon />
            <span className="sr-only">Open menu</span>
          </SheetTrigger>

          <SheetContent
            side="right"
            showCloseButton={false}
            className="gap-0 border-l border-white/10 bg-[#212121] text-white shadow-none"
          >
            <SheetHeader className="pr-16">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <Image
                src="/images/logo.png"
                alt="Hire Loop logo"
                width={154}
                height={44}
                className="h-9 w-80 sm:h-8"
              />
              <SheetClose
                render={
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-3 right-3 text-zinc-300 hover:bg-white/10 hover:text-white"
                  />
                }
              >
                <XIcon />
                <span className="sr-only">Close</span>
              </SheetClose>
            </SheetHeader>

            <div className="flex flex-col gap-1 p-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={getSheetLinkClassName(
                    pathname === link.href
                  )}
                >
                  {link.label}
                </Link>
              ))}

              <Separator className="my-2 bg-white/10" />

              {user ? (
                <>
                  <div className="flex items-center gap-3 rounded-lg bg-white/5 px-3 py-2">
                    <Avatar size="lg">
                      {user.image && (
                        <AvatarImage src={user.image} alt={user.name ?? "Profile picture"} />
                      )}
                      <AvatarFallback className="bg-indigo-500/20 text-indigo-300">
                        {userInitial}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 leading-tight">
                      <p className="text-sm font-medium text-white">Welcome back,</p>
                      <p className="truncate text-sm text-zinc-300">{user.name}</p>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    onClick={handleSignOut}
                    className="mt-2 h-10 justify-start text-zinc-300 hover:bg-white/10 hover:text-white"
                  >
                    <LogOutIcon className="size-4" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/sign-in" onClick={() => setOpen(false)}>
                    <span
                      className={getSheetLinkClassName(
                        pathname === "/sign-in"
                      )}
                    >
                      Sign In
                    </span>
                  </Link>

                  <div className="mt-2 flex flex-col gap-2">
                    <Button
                      render={<Link href="/sign-up" />}
                      onClick={() => setOpen(false)}
                      className="h-10 bg-indigo-500 text-white hover:bg-indigo-600"
                    >
                      Get Started
                    </Button>
                  </div>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>

        {/* Desktop links + auth actions */}
        <div className="hidden items-center gap-6 pl-6 md:flex md:gap-7 lg:gap-10">
          <div className="flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={getLinkClassName(pathname === link.href)}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <Separator
            orientation="vertical"
            className="h-6 bg-white/20 lg:h-7"
          />

          {isPending ? null : user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-zinc-300">
                Welcome back,{" "}
                <span className="font-medium text-white">{user.name}</span>
              </span>

              <Avatar className="size-9 md:size-10">
                {user.image && (
                  <AvatarImage src={user.image} alt={user.name ?? "Profile picture"} />
                )}
                <AvatarFallback className="bg-indigo-500/20 text-sm text-indigo-300">
                  {userInitial}
                </AvatarFallback>
              </Avatar>

              <Button
                variant="ghost"
                size="icon"
                onClick={handleSignOut}
                aria-label="Sign out"
                title="Sign out"
                className="text-zinc-300 hover:bg-white/10 hover:text-white"
              >
                <LogOutIcon />
              </Button>
            </div>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="text-sm font-medium text-indigo-400 transition-colors hover:text-indigo-300"
              >
                Sign In
              </Link>

              <Button
                render={<Link href="/sign-up" />}
                className="h-10 rounded-lg bg-indigo-500 px-5 text-white hover:bg-indigo-600 md:px-6 md:text-base"
              >
                Get Started
              </Button>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}
