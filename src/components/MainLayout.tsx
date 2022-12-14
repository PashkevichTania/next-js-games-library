import Head from "next/head"
import { CONST } from "@/utils/constants"
import { Header } from "./Header"
import { Footer } from "./Footer"

interface LayoutProps {
  children: React.ReactNode
  title?: string
}

export function MainLayout({ children, title = "Next App" }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{`${CONST.SITE_NAME} | ${title}`}</title>
        <meta name="keywords" content="next,javascript,nextjs,react" />
        <meta name="description" content="this is youtube tutorial for next" />
        <meta charSet="utf-8" />
      </Head>
      <Header />
      <main className="relative h-[100%] min-h-[calc(100vh_-_165px)] flex flex-col grow">
        {children}
      </main>
      <Footer />
    </>
  )
}
