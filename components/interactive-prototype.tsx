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
  desktopImage?: string
}

export function InteractivePrototype() {
  const [currentScreen, setCurrentScreen] = useState(0)
  const [currentDevice, setCurrentDevice] = useState<"mobile" | "tablet" | "desktop">("mobile")

  const screens: PrototypeScreen[] = [
    {
      id: "screen-1",
      title: "Dashboard Overview",
      description: "The main dashboard provides a quick overview of key metrics and recent transactions.",
      image: "/images/reja4.png",
      desktopImage: "/images/admin1.png",
    },
    {
      id: "screen-2",
      title: "Transaction Details",
      description: "Detailed view of transaction information with verification status and action buttons.",
      image: "/images/transactions.png",
      desktopImage: "/images/admin2.png",
    },
    {
      id: "screen-3",
      title: "Top Up Wallet",
      description: "Inbuilt wallet top up feature, with biometrics security.",
      image: "/images/Send.png",
      desktopImage: "/images/admin1.png",
    },
    {
      id: "screen-4",
      title: "Settings & Preferences",
      description: "User settings page with options for notifications, display preferences, and account management.",
      image: "/images/Profile.png",
      desktopImage: "/images/admin2.png",
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
        return "w-[320px] h-[640px]"
      case "tablet":
        return "w-[600px] h-[800px]"
      case "desktop":
        return "w-[1000px] h-[600px]"
    }
  }

  const getDeviceFrame = () => {
    switch (currentDevice) {
      case "mobile":
        return "rounded-[36px] border-[12px] border-black relative"
      case "tablet":
        return "rounded-[20px] border-[10px] border-black relative"
      case "desktop":
        return "rounded-[6px] border-[6px] border-gray-800 relative"
    }
  }

  const getImageStyle = () => {
    return {
      objectFit: "cover",
      objectPosition: "top",
      width: "100%",
      height: "100%"
    } as const
  }

  const getImageSrc = (screen: PrototypeScreen) => {
    if (currentDevice === "desktop" && screen.desktopImage) {
      return screen.desktopImage;
    }
    return screen.image;
  };

  return (
    <Card className="w-full">
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
              <div className="relative w-[320px] h-[640px] bg-white rounded-[36px] shadow-xl overflow-hidden mb-8 border-[12px] border-black">
                <motion.div
                  key={screens[currentScreen].id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={getImageSrc(screens[currentScreen])}
                      alt={screens[currentScreen].title}
                      fill
                      style={getImageStyle()}
                      priority
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/images/ian.jpg";
                      }}
                    />
                  </div>
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

              <div className="w-full overflow-auto flex justify-center">
                <div
                  className={`${getDeviceClassName()} ${getDeviceFrame()} bg-white overflow-hidden mb-8 shadow-xl`}
                >
                  <motion.div
                    key={`${screens[currentScreen].id}-${currentDevice}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={getImageSrc(screens[currentScreen])}
                        alt={screens[currentScreen].title}
                        fill
                        style={getImageStyle()}
                        priority
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/images/ian.jpg";
                        }}
                      />
                    </div>
                  </motion.div>
                </div>
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
