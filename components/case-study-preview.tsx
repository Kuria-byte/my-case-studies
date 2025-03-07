import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface CaseStudyPreviewProps {
  title: string
  description: string
  image: string
  color: string
  href: string
}

export default function CaseStudyPreview({ title, description, image, color, href }: CaseStudyPreviewProps) {
  return (
    <Link href={href} className="group block">
      <Card className="overflow-hidden border-0 shadow-md transition-all duration-300 hover:shadow-lg">
        <div className={`${color} p-6 aspect-[4/3] relative`}>
          <Image src={image || "/placeholder.svg"} alt={title} fill className="object-contain p-4" />
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </Link>
  )
}

