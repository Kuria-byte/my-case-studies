import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

interface ProjectCardProps {
  title: string
  description: string
  image: string
  color: string
  href: string
}

export function ProjectCard({ title, description, image, color, href }: ProjectCardProps) {
  return (
    <Link href={href} className="group block">
      <div className="rounded-lg overflow-hidden border border-[#2A2A2A] bg-[#0F0F0F] transition-all duration-300 hover:border-[#3A3A3A] hover:shadow-lg">
        <div className={`${color} p-6 aspect-video relative`}>
          <Image src={image || "/placeholder.svg"} alt={title} fill className="object-contain p-4" />
          <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm p-2 rounded-full opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <ArrowRight className="h-4 w-4 text-white" />
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="text-sm text-white/70">{description}</p>
        </div>
      </div>
    </Link>
  )
}

