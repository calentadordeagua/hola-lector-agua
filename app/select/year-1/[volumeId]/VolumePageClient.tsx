"use client"

import { volumes, shortStories } from "@/data/year1";
import { getSpineIndex } from "@/lib/chapter-mappings";
import { ArrowLeft, BookOpen, Calendar, Users, Search, ArrowUpDown } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";



export function VolumePageClient({ volumeId }: { volumeId: string }) {

    const volume = volumes.find((v) => v.id === volumeId) || shortStories.find((v) => v.id === volumeId);

    if (!volume) {
        notFound();
    }

    const [searchQuery, setSearchQuery] = useState("");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");



    const isSideStory = volume.volumeNumber === 'SS' || volume.id.startsWith('ss-');

    const getChapterDisplay = (chapter: string, index: number) => {
        let cleanTitle = chapter;
        let typeLabel = '';

        const match = chapter.match(/^(?:Chapter\s+(\d+)|(Prologue)|(Epilogue))/i);

        if (match) {
            if (match[1]) {
                cleanTitle = chapter.replace(/^Chapter\s+\d+[:\s]*/i, '');
            } else if (match[2]) {
                cleanTitle = chapter.replace(/^Prologue[:\s]*/i, '');
                typeLabel = 'Prologue';
            } else if (match[3]) {
                cleanTitle = chapter.replace(/^Epilogue[:\s]*/i, '');
                typeLabel = 'Epilogue';
            }
        }

        const displayNum = (index + 1).toString();

        let fullTitle = `Chapter ${displayNum} : ${cleanTitle}`;
        let type = 'CH';

        if (isSideStory) {
            fullTitle = `${cleanTitle}`;
            type = 'SS';
        } else if (typeLabel) {
            fullTitle = `Chapter ${displayNum} - ${typeLabel} : ${cleanTitle}`;
        }

        return {
            type,
            number: displayNum,
            full: fullTitle
        };
    };


    const filteredChapters = volume.chapters.filter((chapter, index) => {
        const { number, full } = getChapterDisplay(chapter, index);
        const query = searchQuery.toLowerCase();


        if (/^\d+$/.test(query)) {
            return number === query || (number && number.includes(query)) || full.toLowerCase().startsWith(`chapter ${query}`);
        }

        return (
            chapter.toLowerCase().includes(query) ||
            full.toLowerCase().includes(query) ||
            (number && number.includes(query))
        );
    });

    const sortedChapters = [...filteredChapters].sort((a, b) => {
        const indexA = volume.chapters.indexOf(a);
        const indexB = volume.chapters.indexOf(b);

        if (sortOrder === "asc") {
            return indexA - indexB;
        } else {
            return indexB - indexA;
        }
    });

    return (
        <div className="min-h-screen w-full bg-[#0a0a0a] text-white selection:bg-red-900/50">
            <div className="fixed inset-0 z-0 bg-gradient-to-br from-red-950/20 via-black to-black pointer-events-none" />


            <nav className="relative z-50 p-6 flex items-center justify-between">
                <Link href={isSideStory ? "/select/year-1?contentType=shortStories" : "/select/year-1"}>
                    <Button variant="ghost" className="text-gray-400 hover:text-white hover:bg-white/5 gap-2">
                        <ArrowLeft className="w-5 h-5" />
                        Back to Year 1
                    </Button>
                </Link>
            </nav>

            <main className="relative z-10 container mx-auto px-4 lg:px-8 pb-20 pt-4">
                <div className="lg:hidden mb-6 space-y-2">
                    <h1 className="text-3xl font-bold font-serif tracking-tight text-white/90">
                        Classroom of the Elite: {volume.title}
                    </h1>
                    <h2 className="text-xl text-gray-400 font-light">{volume.title}</h2>
                    <div className="flex flex-wrap gap-2 pt-2">
                        {volume.characters.map((char) => (
                            <div key={char} className="px-3 py-1 rounded-full bg-red-950/30 border border-red-900/30 text-red-200 text-xs flex items-center gap-2">
                                <Users className="w-3 h-3" />
                                {char}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-8 lg:gap-12 items-start">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex flex-col gap-6 lg:sticky lg:top-8"
                    >
                        <div className="relative aspect-[2/3] w-full max-w-[300px] lg:max-w-none mx-auto lg:mx-0 rounded-lg overflow-hidden shadow-[0_0_50px_rgba(220,38,38,0.15)] border border-white/10 group">
                            <img
                                src={volume.coverImage}
                                alt={volume.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                style={{ transform: "translateZ(0)" }}
                                width={600}
                                height={900}
                                sizes="(max-width: 1024px) 100vw, 400px"
                                fetchPriority="high"
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                            
                        </div>

                        <div className="flex flex-col gap-3">
                            <Link href={`/read/${volume.id}/${getSpineIndex(volume.id, 0)}`} className="w-full">
                                <Button className="w-full h-14 text-lg bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-900/20 transition-all duration-300 hover:scale-[1.02]">
                                    <BookOpen className="mr-2 w-5 h-5" />
                                    {"Start Reading"}
                                </Button>
                            </Link>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-white/5 rounded-lg p-3 border border-white/5">
                                <div className="text-xs text-gray-500 mb-1 flex items-center gap-1.5">
                                    <Calendar className="w-3.5 h-3.5" /> JP Release
                                </div>
                                <div className="text-sm font-medium">{volume.releaseDateJP}</div>
                            </div>
                            <div className="bg-white/5 rounded-lg p-3 border border-white/5">
                                <div className="text-xs text-gray-500 mb-1 flex items-center gap-1.5">
                                    <Calendar className="w-3.5 h-3.5" /> EN Release
                                </div>
                                <div className="text-sm font-medium">{volume.releaseDateEN}</div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={false}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="flex flex-col gap-8"
                    >
                        <div className="hidden lg:block space-y-4 border-b border-white/10 pb-8">
                            <h1 className="text-4xl md:text-5xl font-bold font-serif tracking-tight text-white/90">
                                Classroom of the Elite: {volume.title}
                            </h1>
                            <h2 className="text-2xl text-gray-400 font-light">{volume.title}</h2>

                            <div className="flex flex-wrap gap-3 pt-2">
                                {volume.characters.map((char) => (
                                    <div key={char} className="px-3 py-1 rounded-full bg-red-950/30 border border-red-900/30 text-red-200 text-sm flex items-center gap-2">
                                        <Users className="w-3 h-3" />
                                        {char}
                                    </div>
                                ))}
                            </div>
                        </div>


                        <div>
                            {isSideStory && (
                                <h3 className="text-xl font-medium text-white/80 mb-4 px-1">
                                    List of side stories
                                </h3>
                            )}
                            <div className="mb-6 flex gap-4">
                                <div className="relative flex-1">
                                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                        <Search className="w-4 h-4 text-gray-500" />
                                    </div>
                                    <Input
                                        type="text"
                                        placeholder={isSideStory ? "Search side stories..." : "Search chapters..."}
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500 hover:bg-white/10 focus:bg-white/10 transition-colors h-11"
                                    />
                                </div>
                                <Button
                                    variant="outline"
                                    onClick={() => setSortOrder(prev => prev === "asc" ? "desc" : "asc")}
                                    className="h-11 px-4 bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:text-white"
                                >
                                    <ArrowUpDown className="w-4 h-4 mr-2" />
                                    {sortOrder === "asc" ? "Ascending" : "Descending"}
                                </Button>
                            </div>

                            <div className="grid gap-2">
                                {sortedChapters.length > 0 ? (
                                    sortedChapters.map((chapter) => {
                                        const originalIndex = volume.chapters.indexOf(chapter);
                                        const { type, number, full } = getChapterDisplay(chapter, originalIndex);

                                        return (
                                            <motion.div
                                                key={chapter}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.1 + (originalIndex * 0.03) }}
                                            >
                                                <Link href={`/read/${volume.id}/${getSpineIndex(volume.id, originalIndex)}`}>
                                                    <div className={`group flex items-start justify-between p-3 md:p-4 rounded-xl border transition-all duration-200 cursor-pointer gap-3 bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20`}>
                                                        <div className="flex items-start gap-3 flex-1">
                                                            <span className={`shrink-0 text-[10px] md:text-xs font-mono px-1.5 py-0.5 md:px-2 md:py-1 rounded mt-0.5 ${type === 'CH' ? 'text-gray-600 bg-black/40' : 'text-amber-500 bg-amber-950/30'}`}>
                                                                {type === 'SS' ? `SS ${number}` : `${type} ${number}`}
                                                            </span>
                                                            <span className={`text-sm md:text-base transition-colors font-medium leading-tight md:leading-normal text-gray-300 group-hover:text-white`}>
                                                                {isSideStory && full.includes(" : ") ? (() => {
                                                                    const [narrator, title] = full.split(" : ");
                                                                    return (
                                                                        <span className="flex flex-col md:block">
                                                                            <span className="font-bold text-red-400">{narrator} <span className="text-gray-500 font-normal">:</span> </span>
                                                                            <span className="text-gray-300">{title}</span>
                                                                        </span>
                                                                    );
                                                                })() : full}
                                                            </span>
                                                        </div>
                                                        <ArrowLeft className="shrink-0 w-4 h-4 text-gray-600 group-hover:text-white rotate-180 transition-colors mt-0.5" />
                                                    </div>
                                                </Link>
                                            </motion.div>
                                        )
                                    })
                                ) : (
                                    <div className="text-center text-gray-500 py-10">
                                        No {isSideStory ? "side stories" : "chapters"} found matching "{searchQuery}"
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </main>

        </div>
    );
}
