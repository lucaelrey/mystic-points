import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="top-right"
      duration={2000}
      closeButton
      richColors
      toastOptions={{
        style: {
          background: "rgba(26, 31, 44, 0.9)",
          color: "#D6BCFA",
          border: "2px solid rgba(155, 135, 245, 0.2)",
          backdropFilter: "blur(8px)",
          zIndex: 40,
        },
      }}
      {...props}
    />
  )
}

export { Toaster }