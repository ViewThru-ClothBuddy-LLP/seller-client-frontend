import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Settings } from "lucide-react";

const categories = [
  {
    title: "Getting Started",
    description: "Start off on the right foot! Not the left one!",
    icon: <span>🧩</span>,
  },
  {
    title: "Account Settings",
    description: "Customize your account preferences and security",
    icon: <Settings className="w-6 h-6 text-blue-600" />,
  },
  {
    title: "Billing",
    description: "Manage payments, subscriptions, and invoices",
    icon: <span>💳</span>,
  },
  {
    title: "Interface",
    description: "Adjust UI settings for a personalized experience",
    icon: <span>🎛️</span>,
  },
  {
    title: "Trust & Safety",
    description: "Keep your account safe and secure",
    icon: <span>🛡️</span>,
  },
  {
    title: "F.A.Q",
    description: "Common questions and self-service support",
    icon: <span>❓</span>,
  },
  {
    title: "Community",
    description: "Connect with users and experts worldwide",
    icon: <span>🌍</span>,
  },
  {
    title: "Store Setup",
    description: "Guide to setting up your store quickly",
    icon: <span>🖥️</span>,
  },
];

export default function SupportPage() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-12 px-6 mt-9">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Welcome to <span className="text-blue-600">ClothBuddy Support</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          How can we assist you today? Search or browse topics below.
        </p>

        {/* Search Bar */}
        <div className=" mt-6 flex items-center justify-center">
          <Input
            className="w-full max-w-lg p-3 rounded-lg bg-white shadow-md dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
            placeholder="Search for help topics..."
          />
          <Button className="ml-3 px-5 py-2 text-white bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
            <Search className="w-5 h-5" />
            Search
          </Button>
        </div>
      </div>

      {/* Support Categories */}
      <div className="max-w-6xl mx-auto mt-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
          Browse Help Topics
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-center">
          Find solutions to common issues quickly.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {categories.map((item, index) => (
            <Card
              key={index}
              className="p-5 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all cursor-pointer border border-gray-200 dark:border-gray-700"
            >
              <CardContent className="flex flex-col items-center text-center">
                <div className="text-5xl">{item.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-4">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
