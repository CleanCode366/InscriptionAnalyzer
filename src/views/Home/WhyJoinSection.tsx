import { Award, Globe, Users } from "lucide-react";
import type React from "react";

const WhyJoinSection: React.FC = () => {
    return (
        <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h3 className="text-3xl font-bold mb-4 text-primary-text">Why Join Our Community?</h3>
                <p className="text-slate-400 text-lg">Be part of preserving and understanding our shared heritage</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700/50 hover:border-blue-500/50 transition-colors backdrop-blur-sm">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                    <Globe className="w-6 h-6 text-blue-400" />
                </div>
                <h4 className="text-xl font-semibold mb-3 text-primary-text">Global Impact</h4>
                <p className="text-slate-400">
                    Contribute to a worldwide effort to digitally preserve archaeological treasures for future generations.
                </p>
                </div>

                <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700/50 hover:border-purple-500/50 transition-colors backdrop-blur-sm">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-purple-400" />
                </div>
                <h4 className="text-xl font-semibold mb-3 text-primary-text">Expert Community</h4>
                <p className="text-slate-400">
                    Connect with archaeologists, linguists, historians, and passionate enthusiasts from around the world.
                </p>
                </div>

                <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700/50 hover:border-green-500/50 transition-colors backdrop-blur-sm">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                    <Award className="w-6 h-6 text-green-400" />
                </div>
                <h4 className="text-xl font-semibold mb-3 text-primary-text">Recognition</h4>
                <p className="text-slate-400">
                    Gain recognition for your contributions and build a reputation in the archaeological community.
                </p>
                </div>
            </div>
            </div>
        </section>
    );
}

export default WhyJoinSection;