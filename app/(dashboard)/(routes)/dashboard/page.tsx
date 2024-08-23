'use client'
import { ArrowRight, Code2Icon, CodeIcon, ImageIcon, Music, VideoIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";

const tools = [
  {
    label: "Conversation",
    icon: MessageSquare,
    color: 'text-violet-500',
    bgColor: "bg-violet-500/10",
    href: "/conversation"
  },
  {
    label: "Music-generator",
    icon: Music,
    color: 'text-pink-700',
    bgColor: "bg-pink-700/10",
    href: "/music"
  },
  {
    label: "Image-generator",
    icon: ImageIcon,
    color: 'text-emerald-700',
    bgColor: "bg-emerald-700/10",
    href: "/image"
  },
  {
    label: "Video-generator",
    icon: VideoIcon,
    color: 'text-orange-700',
    bgColor: "bg-orange-700/10",
    href: "/video"
  },
  {
    label: "Code-generator",
    icon: CodeIcon,
    color: 'text-green-700',
    bgColor: "bg-green-700/10",
    href: "/code"
  },
  {
    label: "Post-generator",
    icon: ImageIcon,
    color: 'text-blue-700',
    bgColor: "bg-black-700/10",
    href: "/social-share"
  },
  {
    label: "Video-uploader",
    icon: VideoIcon,
    color: 'text-violet-700',
    bgColor: "bg-white-700/10",
    href: "/video-upload"
  },
];

const DashboardPage = () => {
  const router = useRouter();
  
  return (
    <div className="mb-20 space-y-4">
      {/* Sticky Header */}
      <div className="sticky top-0 bg-white shadow-sm z-10 py-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
          Explore the Power of AI
        </h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
          Chat with the Smartest AI - Experience the Power of AI
        </p>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 md:px-20 lg:px-32 space-y-4 h-[60vh] overflow-y-auto">
        {tools.map((tool) => (
          <div
            key={tool.href}
            onClick={() => router.push(tool.href)}
            className="p-4 border-black/5 flex items-center justify-between hover:shadow-lg hover:scale-105 hover:bg-gradient-to-r from-indigo-50 to-white transition cursor-pointer rounded-lg"
          >
            <div className="flex items-center gap-x-4">
              <div className={cn("p-3 w-fit rounded-full shadow-sm", tool.bgColor)}>
                <tool.icon className={cn("w-8 h-8", tool.color)} />
              </div>
              <div className="font-semibold">
                {tool.label}
              </div>
            </div>
            <ArrowRight className="w-5 h-5" />
          </div>
        ))}
      </div>

      {/* Call to Action Button */}
      <div className="text-center mt-8">
      <button className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
  <a 
    href="https://medium.com/@RenderAnalytics/what-is-artificial-intelligence-and-how-does-it-work-for-beginners-5224aa0c472b" 
    target="_blank" 
    rel="noopener noreferrer"
    className="block w-full h-full text-white text-center"
  >
    Learn More About AI
  </a>
</button>

      </div>
    </div>
  );
};

export default DashboardPage;
