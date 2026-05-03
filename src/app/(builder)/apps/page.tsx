'use client'
import axios from 'axios';
import { useEffect, useState } from 'react'
import { LayoutGrid, ArrowRight } from 'lucide-react'
import Link from 'next/link';
import { useAppStore } from '@/store/appStore';

export default function Apps() {
    const [apps, setApps] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const { setAppData } = useAppStore();

    useEffect(() => {
        const fetchApps = async () => {
            try {
                const res = await axios.get("/api/app/get-apps")
                setApps(res.data)
                setAppData(res.data);
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        }
        fetchApps()
    }, [])

    const formatDate = (dateStr: string) => {
        if (!dateStr) return '—'
        return new Date(dateStr).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        })
    }

    return (
        <div className="min-h-screen bg-gray-50/30 md:bg-white text-gray-900" data-lenis-prevent>

            {/* Header */}
            <div className="border-b border-gray-200 bg-white px-5 md:px-10 py-6 flex items-end justify-between sticky top-0 z-10">
                <div>
                    <h1 className="text-2xl md:text-xl font-bold md:font-semibold tracking-tight text-gray-900">My Apps</h1>
                    <p className="text-sm text-gray-500 md:text-gray-400 mt-1 md:mt-0.5">Manage and view your connected applications</p>
                </div>
                {!loading && (
                    <span className="text-xs font-medium text-gray-500 bg-gray-100 border border-gray-200 rounded-md px-2.5 py-1">
                        {apps.length} {apps.length === 1 ? 'app' : 'apps'}
                    </span>
                )}
            </div>

            {/* Body */}
            <div className="px-4 md:px-10 py-6 md:py-8">

                {/* Loading State */}
                {loading && (
                    <div className="space-y-3">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="h-20 md:h-14 bg-gray-100 rounded-xl md:rounded-lg animate-pulse" />
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {!loading && apps.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-24 text-center px-4">
                        <div className="w-12 h-12 md:w-10 md:h-10 rounded-2xl md:rounded-xl bg-gray-100 flex items-center justify-center mb-4">
                            <LayoutGrid className="w-6 h-6 md:w-5 md:h-5 text-gray-400" />
                        </div>
                        <p className="text-base md:text-sm font-medium text-gray-800 md:text-gray-700">No apps found</p>
                        <p className="text-sm md:text-xs text-gray-500 md:text-gray-400 mt-1">Your connected apps will appear here</p>
                    </div>
                )}

                {/* Table */}
                {!loading && apps.length > 0 && (
                    <div className="max-w-6xl mx-auto">
                        {/* Column Headers (Desktop Only) */}
                        <div className="hidden md:grid grid-cols-[2fr_1.5fr_2fr_auto] px-4 pb-2.5 border-b border-gray-100">
                            <span className="text-[11px] font-medium uppercase tracking-widest text-gray-400">Name</span>
                            <span className="text-[11px] font-medium uppercase tracking-widest text-gray-400">Created</span>
                            <span className="text-[11px] font-medium uppercase tracking-widest text-gray-400">Config</span>
                            <span className="w-5" />
                        </div>

                        {/* Rows */}
                        <div className="flex flex-col gap-3 md:gap-0 md:divide-y md:divide-gray-100">
                            {apps.map((app) => (
                                <Link
                                    href={`/apps/${app.id}`}
                                    key={app.id}
                                    className="block outline-none"
                                >
                                    <div className="flex flex-col md:grid md:grid-cols-[2fr_1.5fr_2fr_auto] md:items-center px-5 py-4 md:px-4 md:py-4 bg-white md:bg-transparent border border-gray-200 md:border-transparent rounded-2xl md:rounded-lg shadow-sm md:shadow-none hover:border-gray-300 md:hover:bg-gray-100 transition-all duration-200 group cursor-pointer relative gap-1.5 md:gap-0">

                                        {/* Name */}
                                        <div className="flex items-center gap-3 pr-8 md:pr-0">
                                            <span className="text-base md:text-sm font-semibold md:font-medium text-gray-900 md:text-gray-800 truncate">
                                                {app.name}
                                            </span>
                                        </div>

                                        {/* Created At */}
                                        <span className="text-sm text-gray-500 md:text-gray-400 font-medium md:font-normal">
                                            {formatDate(app.createdAt)}
                                        </span>

                                        {/* Config (Desktop Only) */}
                                        <div className="max-w-xs hidden md:block">
                                            {app.config_json ? (
                                                <code className="text-xs font-mono text-gray-500 bg-gray-100 border border-gray-200 rounded px-2 py-0.5 truncate block max-w-[240px]">
                                                    {typeof app.config_json === 'object'
                                                        ? JSON.stringify(app.config_json)
                                                        : app.config_json}
                                                </code>
                                            ) : (
                                                <span className="text-sm text-gray-300">—</span>
                                            )}
                                        </div>

                                        {/* Arrow */}
                                        <div className="absolute top-1/2 -translate-y-1/2 right-4 md:static md:translate-y-0 w-8 h-8 md:w-auto md:h-auto rounded-full bg-gray-50 md:bg-transparent flex items-center justify-center md:block group-hover:bg-gray-100 md:group-hover:bg-transparent transition-colors">
                                          <ArrowRight className="w-4 h-4 text-gray-400 md:text-gray-300 group-hover:text-gray-600 md:group-hover:text-gray-500 transition-colors duration-150" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                    </div>
                )}
            </div>
        </div>
    )
}