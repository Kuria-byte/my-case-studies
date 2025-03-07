// "use client"

// import type React from "react"

// import { useState } from "react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { BookOpen, Download, ExternalLink, Heart, Share2, Sparkles, ThumbsUp } from "lucide-react"
// import Link from "next/link"
// import { Tooltip, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"

// export function WhatsNext() {
//   const [likeCount, setLikeCount] = useState(42)
//   const [hasLiked, setHasLiked] = useState(false)
//   const [showShareSuccess, setShowShareSuccess] = useState(false)
//   const [showContactSuccess, setShowContactSuccess] = useState(false)
  
//   const handleLike = () => {
//     if (!hasLiked) {
//       setLikeCount(prev => prev + 1)
//       setHasLiked(true)
      
//       // Create heart animation
//       const heart = document.createElement('div')
//       heart.innerHTML = '❤️'
//       heart.className = 'fixed text-2xl pointer-events-none'
//       heart.style.left = `${Math.random() * 80 + 10}%`
//       heart.style.top = '80%'
//       heart.style.animation = 'float-up 1.5s ease-out forwards'
//       document.body.appendChild(heart)
      
//       setTimeout(() => {
//         document.body.removeChild(heart)
//       }, 1500)
//     }
//   }
  
//   const handleShare = () => {
//     // Simulate sharing functionality
//     setTimeout(() => {
//       setShowShareSuccess(true)
//       setTimeout(() => setShowShareSuccess(false), 3000)
//     }, 500)
//   }
  
//   const handleContactSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     // Simulate form submission
//     setShowContactSuccess(true)
//     setTimeout(() => setShowContactSuccess(false), 3000)
//   }
  
//   return (
//     <Card className="border-2 border-primary/20 bg-primary/5">
//       <style jsx global>{`
//         @keyframes float-up {
//           0% {
//             transform: translateY(0) scale(1);
//             opacity: 1;
//           }
//           100% {
//             transform: translateY(-100px) scale(1.5);
//             opacity: 0;
//           }
//         }
        
//         @keyframes pulse-border {
//           0%, 100% {
//             border-color: hsl(var(--primary) / 0.2);
//           }
//           50% {
//             border-color: hsl(var(--primary) / 0.6);
//           }
//         }
//       `}</style>
      
//       <CardHeader>
//         <CardTitle className="flex items-center gap-2 text-primary">
//           <Sparkles className="h-5 w-5" />
//           What's Next?
//         </CardTitle>
//         <CardDescription>
//           Continue your journey with more ways to explore and connect
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div className="space-y-4">
//             <h3 className="font-medium text-lg">Explore More</h3>
//             <div className="space-y-2">
//               <Button variant="outline" className="w-full justify-start gap-2" asChild>
//                 <Link href="/dashboard">
//                   <BookOpen className="h-4 w-4" />
//                   View More Case Studies
//                 </Link>
//               </Button>
//               <Button variant="outline" className="w-full justify-start gap-2">
//                 <Download className="h-4 w-4" />
//                 Download Case Study PDF
//               </Button>
//               <Button variant="outline" className="w-full justify-start gap-2" asChild>
//                 <a href="#" target="_blank" rel="noopener noreferrer">
//                   <ExternalLink className="h-4 w-4" />
//                   Visit Live Project
//                 </a>
//               </Button>
//             </div>
//           </div>
          
//           <div className="space-y-4">
//             <h3 className="font-medium text-lg">Show Appreciation</h3>
//             <div className="space-y-2">
//               <Button 
//                 variant={hasLiked ? "default" : "outline"} 
//                 className={`w-full justify-start gap-2 ${hasLiked ? "bg-primary text-primary-foreground" : ""}`}
//                 onClick={handleLike}
//               >
//                 <Heart className={`h-4 w-4 ${hasLiked ? "fill-current" : ""}`} />
//                 {hasLiked ? "Liked" : "Like"} This Case Study ({likeCount})
//               </Button>
              
//               <Dialog>
//                 <DialogTrigger asChild>
//                   <Button variant="outline" className="w-full justify-start gap-2">
//                     <Share2 className="h-4 w-4" />
//                     Share With Others
//                   </Button>
//                 </DialogTrigger>
//                 <DialogContent className="sm:max-w-md">
//                   <DialogHeader>
//                     <DialogTitle>Share this case study</DialogTitle>
//                     <DialogDescription>
//                       Share this case study with your network or copy the link directly.
//                     </DialogDescription>
//                   </DialogHeader>
                  
//                   <div className="flex items-center space-x-2 mt-4">
//                     <div className="grid flex-1 gap-2">
//                       <Label htmlFor="link" className="sr-only">Link</Label>
//                       <Input
//                         id="link"
//                         defaultValue="https://portfolio.example.com/case-studies/market-force"
//                         readOnly
//                       />
//                     </div>
//                     <Button 
//                       type="submit" 
//                       size="sm" 
//                       className="px-3"
//                       onClick={handleShare}
//                     >
//                       <span className="sr-only">Copy</span>
//                       {showShareSuccess ? <ThumbsUp className="h-4 w-4" /> : "Copy"}
//                     </Button>
//                   </div>
                  
//                   <div className="flex justify-center gap-4 mt-4">
//                     <TooltipProvider>
//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <Button variant="outline" size="icon" className="rounded-full">
//                             <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                               <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 \

// \

// \

