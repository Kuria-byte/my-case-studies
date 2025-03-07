export function ProjectTimeline() {
  const timelineItems = [
    {
      date: "Jan 15, 2023",
      title: "Project Kickoff",
      description: "Initial stakeholder meetings and project planning",
      status: "completed",
    },
    {
      date: "Feb 10, 2023",
      title: "User Research",
      description: "Conducted 24 interviews with financial agents, merchants, and end-users",
      status: "completed",
    },
    {
      date: "Mar 5, 2023",
      title: "Wireframing",
      description: "Created low-fidelity wireframes based on research insights",
      status: "completed",
    },
    {
      date: "Apr 12, 2023",
      title: "Usability Testing",
      description: "Conducted first round of usability testing with 12 participants",
      status: "completed",
    },
    {
      date: "May 20, 2023",
      title: "High-Fidelity Design",
      description: "Finalized UI design and created interactive prototype",
      status: "completed",
    },
    {
      date: "Jun 15, 2023",
      title: "Development Handoff",
      description: "Delivered design specifications and assets to development team",
      status: "completed",
    },
    {
      date: "Jul 30, 2023",
      title: "Beta Launch",
      description: "Released beta version to select users for feedback",
      status: "completed",
    },
    {
      date: "Aug 25, 2023",
      title: "Full Launch",
      description: "Official product launch across all target markets",
      status: "in-progress",
    },
  ]

  return (
    <div className="relative">
      <div className="absolute left-4 top-0 bottom-0 w-px bg-[#2A2A2A]" />
      <div className="space-y-8">
        {timelineItems.map((item, index) => (
          <div key={index} className="relative pl-10">
            <div
              className={`absolute left-0 top-1 h-8 w-8 rounded-full flex items-center justify-center ${
                item.status === "completed" ? "bg-[#06D6A0]/20 text-[#06D6A0]" : "bg-[#FFD166]/20 text-[#FFD166]"
              }`}
            >
              {item.status === "completed" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              )}
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <div className="text-sm text-white/50">{item.date}</div>
              <div className="hidden sm:block text-white/50 mx-2">•</div>
              <div className="font-medium">{item.title}</div>
            </div>
            <div className="text-sm text-white/70 mt-1">{item.description}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

