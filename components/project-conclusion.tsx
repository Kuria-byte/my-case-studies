"use client"

import { motion } from "framer-motion"
import { CheckCircle2, ArrowRight, Flag, Sparkles, Mail } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export function ProjectConclusion() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Flag className="mr-2 h-5 w-5 text-[#EF476F]" />
          Project Conclusion
        </CardTitle>
        <CardDescription>Summary and next steps</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-medium mb-3">Project Summary</h3>
          <p className="text-sm text-muted-foreground">
            The Market Force Digital Wallet & Reconciliation platform successfully addressed the critical challenges
            faced by financial agents in emerging markets. By focusing on offline functionality, automated
            reconciliation, and intuitive user experience, we delivered a solution that significantly reduced manual
            work and error rates while improving overall efficiency.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="font-medium">Key Achievements</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-3 rounded-lg border border-border p-3"
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#06D6A0]" />
              <div>
                <h4 className="text-sm font-medium">85% Reduction in Manual Work</h4>
                <p className="text-xs text-muted-foreground">Automated reconciliation saved hours of daily work</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-start gap-3 rounded-lg border border-border p-3"
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#06D6A0]" />
              <div>
                <h4 className="text-sm font-medium">94% Task Completion Rate</h4>
                <p className="text-xs text-muted-foreground">Significant improvement from initial 68% rate</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-start gap-3 rounded-lg border border-border p-3"
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#06D6A0]" />
              <div>
                <h4 className="text-sm font-medium">Offline Functionality</h4>
                <p className="text-xs text-muted-foreground">Reliable operation in areas with poor connectivity</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-start gap-3 rounded-lg border border-border p-3"
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#06D6A0]" />
              <div>
                <h4 className="text-sm font-medium">Cross-Platform Support</h4>
                <p className="text-xs text-muted-foreground">Consistent experience across devices</p>
              </div>
            </motion.div>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="font-medium mb-3">Future Enhancements</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FFD166]/20">
                <Sparkles className="h-3 w-3 text-[#FFD166]" />
              </div>
              <div>
                <h4 className="text-sm font-medium">AI-Powered Anomaly Detection</h4>
                <p className="text-xs text-muted-foreground">
                  Automatically identify suspicious transactions and potential fraud
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FFD166]/20">
                <Sparkles className="h-3 w-3 text-[#FFD166]" />
              </div>
              <div>
                <h4 className="text-sm font-medium">Enhanced Reporting Dashboard</h4>
                <p className="text-xs text-muted-foreground">More comprehensive analytics and customizable reports</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FFD166]/20">
                <Sparkles className="h-3 w-3 text-[#FFD166]" />
              </div>
              <div>
                <h4 className="text-sm font-medium">Multi-Currency Support</h4>
                <p className="text-xs text-muted-foreground">
                  Expand functionality to handle transactions in multiple currencies
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="rounded-lg bg-muted/50 p-4 w-full">
          <div className="flex items-start gap-3">
            <Mail className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#118AB2]" />
            <div>
              <h4 className="text-sm font-medium">Get in Touch</h4>
              <p className="text-xs text-muted-foreground mb-3">
                Interested in learning more about this project or discussing similar challenges?
              </p>
              <Button
                className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
                size="sm"
              >
                Contact Us <ArrowRight className="ml-2 h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

