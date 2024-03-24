import { LandingContent } from "@/components/Landing-content"
import { LandingHero } from "@/components/Landing-hero"
import { LandingNavbar } from "@/components/Landing-navbar"
import { Button } from "@/components/ui/button"
import Link from "next/link"


function Landingpage() {
  return (
    <div className="h-full">
       <LandingNavbar/>
       <LandingHero/>
       <LandingContent/>
    </div>
  )
}

export default Landingpage
