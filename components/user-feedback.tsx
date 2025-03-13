import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function UserFeedback() {
  const feedback = [
    {
      id: 1,
      name: "Lillian Wanjiru",
      role: "Rejareja Agent",
      comment:
        "The new reconciliation feature has saved me hours of work every day. I can now focus on serving more customers.",
      
      rating: 5,
    },
    {
      id: 2,
      name: "Duncan Kibet",
      role: "Merchant",
      comment:
        "The offline mode works perfectly in my area where connectivity is spotty. Transactions sync seamlessly when I'm back online.",
      
      rating: 5,
    },
    {
      id: 3,
      name: "Andrea Kimathi",
      role: "Merchant",
      comment: "I can now access credit and order stock seemlessly. Thank you team!",
      
      rating: 4,
    },
  ]

  return (
    <div className="space-y-4">
      {feedback.map((item) => (
        <div key={item.id} className="bg-[#0F0F0F] rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Avatar>
              <AvatarFallback className="bg-[#2A2A2A] text-white">
                {item.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <div className="font-medium">{item.name}</div>
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill={i < item.rating ? "#FFD166" : "none"}
                      stroke={i < item.rating ? "#FFD166" : "#ffffff50"}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-0.5"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
              </div>
              <div className="text-xs text-white/50 flex items-center gap-2">
                <span>{item.role}</span>
                <span>•</span>
               
              </div>
              <p className="mt-2 text-sm text-white/70">{item.comment}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

