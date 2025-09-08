import { Award, BookOpen, Globe, Users } from "lucide-react";
import type React from "react";

const Statistics: React.FC = () => {
    const statistics = [
        { icon: BookOpen, label: "Inscriptions", value: "12,456", color: "text-blue-400" },
        { icon: Users, label: "Contributors", value: "3,892", color: "text-green-400" },
        { icon: Globe, label: "Locations", value: "1,234", color: "text-purple-400" },
        { icon: Award, label: "Translations", value: "8,765", color: "text-yellow-400" }
    ];
    return (
         <section className="py-16 bg-secondary-background/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {statistics.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                    <div key={index} className="text-center p-6 bg-primary-background/50 rounded-xl backdrop-blur-sm border border-slate-700/50 text-primary-text">
                    <IconComponent className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
                    <div className="text-3xl font-bold mb-1">{stat.value}</div>
                    <div className="text-slate-400">{stat.label}</div>
                    </div>
                );
                })}
            </div>
            </div>
        </section>
    );
}

export default Statistics;