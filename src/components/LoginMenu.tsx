import { Button } from "flowbite-react"
import { useState } from "react"
import useAuth from "@/hooks/useAuth"
import dynamic from "next/dynamic"

// to prevent hydration errors (we cannot know is user logged in from server)
const LoginForm = dynamic(() => import("@/components/LoginForm"), {
  ssr: false,
})

export const LoginMenu = ({ component }: { component: JSX.Element }) => {
  const [open, setOpen] = useState(false)
  const { userName, isLoggedIn, logOut } = useAuth()

  const clickHandler = () => {
    setOpen(!open)
  }

  return (
    <div className="relative">
      <button onClick={clickHandler}>{component}</button>
      <div
        className="absolute bg-white dark:bg-gray-800 w-52 p-4 mt-2 rounded-lg"
        style={{ display: open ? "block" : "none" }}
      >
        {isLoggedIn ? (
          <div>
            <p className="text-center pb-4">
              Logged in as:{" "}
              <span className="font-semibold text-gray-900 underline dark:text-white decoration-blue-500">
                {userName}
              </span>
            </p>
            <Button type="submit" gradientDuoTone="purpleToBlue" onClick={logOut}>
              Log out
            </Button>
          </div>
        ) : (
          <LoginForm />
        )}
      </div>
    </div>
  )
}
