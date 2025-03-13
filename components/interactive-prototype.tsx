"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, ArrowRight, ExternalLink, Smartphone, Tablet, Monitor } from "lucide-react"
import Image from "next/image"

interface PrototypeScreen {
  id: string
  title: string
  description: string
  image: string
}

export function InteractivePrototype() {
  const [currentScreen, setCurrentScreen] = useState(0)
  const [currentDevice, setCurrentDevice] = useState<"mobile" | "tablet" | "desktop">("mobile")

  const screens: PrototypeScreen[] = [
    {
      id: "screen-1",
      title: "Dashboard Overview",
      description: "The main dashboard provides a quick overview of key metrics and recent transactions.",
      image: "/images/Home.png",
    },
    {
      id: "screen-2",
      title: "Transaction Details",
      description: "Detailed view of transaction information with verification status and action buttons.",
      image: "/images/transactions.png",
    },
    {
      id: "screen-3",
      title: "Top Up Wallet",
      description: "Inbuilt wallet top up feature, with biometrics security.",
      image: "/images/send.png",
    },
    {
      id: "screen-4",
      title: "Settings & Preferences",
      description: "User settings page with options for notifications, display preferences, and account management.",
      image: "/images/profile.png",
    },
  ]

  const handleNextScreen = () => {
    setCurrentScreen((prev) => (prev + 1) % screens.length)
  }

  const handlePrevScreen = () => {
    setCurrentScreen((prev) => (prev - 1 + screens.length) % screens.length)
  }

  const getDeviceClassName = () => {
    switch (currentDevice) {
      case "mobile":
        return "max-w-[320px] aspect-[9/16]"
      case "tablet":
        return "max-w-[500px] aspect-[4/3]"
      case "desktop":
        return "max-w-[800px] aspect-[16/9]"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Smartphone className="h-5 w-5" />
          Interactive Prototype
        </CardTitle>
        <CardDescription>Explore the user interface and interactions</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="prototype" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="prototype">Prototype</TabsTrigger>
            <TabsTrigger value="devices">Device Preview</TabsTrigger>
          </TabsList>

          <TabsContent value="prototype" className="mt-0">
            <div className="flex flex-col items-center">
              <div className="relative w-full max-w-md aspect-[9/16] bg-white rounded-3xl shadow-lg overflow-hidden mb-8 border">
                <motion.div
                  key={screens[currentScreen].id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={screens[currentScreen].image || "/placeholder.svg"}
                    alt={screens[currentScreen].title}
                    fill
                    className="object-contain"
                  />
                </motion.div>

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
                  <h3 className="font-medium">{screens[currentScreen].title}</h3>
                  <p className="text-sm text-white/80">{screens[currentScreen].description}</p>
                </div>
              </div>

              <div className="flex gap-4 mb-6">
                <Button variant="outline" size="sm" onClick={handlePrevScreen}>
                  <ArrowLeft className="h-4 w-4 mr-2" /> Previous Screen
                </Button>
                <Button variant="outline" size="sm" onClick={handleNextScreen}>
                  Next Screen <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>

              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  Screen {currentScreen + 1} of {screens.length}
                </p>
                {/* <Button variant="outline" size="sm" className="gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Open Full Prototype
                </Button> */}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="devices" className="mt-0">
            <div className="flex flex-col items-center">
              <div className="flex justify-center gap-4 mb-6">
                <Button
                  variant={currentDevice === "mobile" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentDevice("mobile")}
                >
                  <Smartphone className="h-4 w-4 mr-2" />
                  Mobile
                </Button>
                <Button
                  variant={currentDevice === "tablet" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentDevice("tablet")}
                >
                  <Tablet className="h-4 w-4 mr-2" />
                  Tablet
                </Button>
                <Button
                  variant={currentDevice === "desktop" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentDevice("desktop")}
                >
                  <Monitor className="h-4 w-4 mr-2" />
                  Desktop
                </Button>
              </div>

              <div
                className={`relative bg-white rounded-lg shadow-lg overflow-hidden mb-8 border ${getDeviceClassName()}`}
              >
                <motion.div
                  key={`${screens[currentScreen].id}-${currentDevice}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={screens[currentScreen].image || "/placeholder.svg"}
                    alt={screens[currentScreen].title}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" size="sm" onClick={handlePrevScreen}>
                  <ArrowLeft className="h-4 w-4 mr-2" /> Previous
                </Button>
                <Button variant="outline" size="sm" onClick={handleNextScreen}>
                  Next <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

