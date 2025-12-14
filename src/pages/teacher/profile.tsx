import React from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "./service/query/useProfile";
import { Spinner } from "@/components/ui/spinner";
import { ArrowLeft, Camera, Upload, Shield, Calendar } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export const Profile = () => {
    const navigate = useNavigate();

    const { data, isLoading, isFetching } = useProfile();
    const profile = data?.data;

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-black">
                <Spinner />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-black px-4 sm:px-6 py-8">
            <div className="max-w-4xl mx-auto">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 hover:text-white transition-all duration-300 mb-8 border border-slate-700/50 hover:border-slate-600/50"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                </button>

                <div className="bg-linear-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-linear-to-br from-blue-500/10 to-purple-500/10 rounded-full -mr-48 -mt-48 pointer-events-none"></div>

                    <div className="relative p-6 sm:p-8 space-y-8">
                        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                            <div className="shrink-0">
                                <div className="relative group">
                                    <div className="absolute inset-0 bg-linear-to-br from-blue-500 to-purple-500 rounded-2xl blur-lg group-hover:blur-xl transition duration-300 opacity-40"></div>

                                    <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden border-2 border-slate-600/50 shadow-lg bg-slate-900">
                                        {isFetching ? (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <Spinner />
                                            </div>
                                        ) : (
                                            <img
                                                src={
                                                    profile?.avatarUrl ||
                                                    profile?.url ||
                                                    "/default-avatar.png"
                                                }
                                                alt="Profile"
                                                className="w-full h-full object-cover"
                                            />
                                        )}
                                    </div>

                                    <label
                                        htmlFor="upload_image"
                                        className="absolute right-2 bottom-2 bg-slate-900/80 backdrop-blur-sm p-2 rounded-full opacity-50 cursor-not-allowed border border-slate-700/50 hover:border-slate-600/50 transition group-hover:opacity-60"
                                    >
                                        {profile?.avatarUrl ? (
                                            <Camera
                                                size={18}
                                                className="text-slate-400"
                                            />
                                        ) : (
                                            <Upload
                                                size={18}
                                                className="text-slate-400"
                                            />
                                        )}
                                    </label>

                                    <input
                                        id="upload_image"
                                        type="file"
                                        hidden
                                        accept="image/*"
                                        disabled
                                    />
                                </div>
                            </div>

                            <div className="grow w-full md:w-auto">
                                <div className="mb-6">
                                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                                        {profile?.name}
                                    </h1>
                                    <p className="text-slate-400 text-lg">
                                        @{profile?.username}
                                    </p>
                                </div>

                                <div className="mb-6">
                                    <p className="text-slate-300 text-sm font-semibold mb-3 flex items-center gap-2">
                                        <Shield
                                            size={16}
                                            className="text-blue-400"
                                        />
                                        Skills & Specializations
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {profile?.specifications &&
                                        profile.specifications.length > 0 ? (
                                            profile.specifications.map(
                                                (s: {
                                                    id: any;
                                                    name:
                                                        | string
                                                        | number
                                                        | bigint
                                                        | boolean
                                                        | React.ReactElement<
                                                              unknown,
                                                              | string
                                                              | React.JSXElementConstructor<any>
                                                          >
                                                        | Iterable<React.ReactNode>
                                                        | React.ReactPortal
                                                        | Promise<
                                                              | string
                                                              | number
                                                              | bigint
                                                              | boolean
                                                              | React.ReactPortal
                                                              | React.ReactElement<
                                                                    unknown,
                                                                    | string
                                                                    | React.JSXElementConstructor<any>
                                                                >
                                                              | Iterable<React.ReactNode>
                                                              | null
                                                              | undefined
                                                          >
                                                        | null
                                                        | undefined;
                                                }) => (
                                                    <span
                                                        key={s.id || s.name}
                                                        className="px-3 py-1 rounded-full text-sm bg-linear-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-blue-300 hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-300"
                                                    >
                                                        {s.name}
                                                    </span>
                                                )
                                            )
                                        ) : (
                                            <span className="text-slate-500">
                                                No specifications
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Switch
                                        checked={profile?.isActive}
                                        disabled
                                    />
                                    <span
                                        className={`text-sm font-semibold transition-colors duration-300 ${
                                            profile?.isActive
                                                ? "text-emerald-400"
                                                : "text-red-400"
                                        }`}
                                    >
                                        {profile?.isActive
                                            ? "Active"
                                            : "Blocked"}
                                    </span>
                                    <div
                                        className={`w-2.5 h-2.5 rounded-full ${
                                            profile?.isActive
                                                ? "bg-emerald-500 shadow-lg shadow-emerald-500/50"
                                                : "bg-red-500 shadow-lg shadow-red-500/50"
                                        }`}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        <div className="h-px bg-linear-to-r from-transparent via-slate-700/50 to-transparent"></div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="bg-slate-700/30 hover:bg-slate-700/50 border border-slate-600/50 rounded-xl p-4 transition-all duration-300">
                                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
                                    Role
                                </p>
                                <p className="text-white font-semibold text-lg">
                                    {profile?.role || "N/A"}
                                </p>
                            </div>

                            <div className="bg-slate-700/30 hover:bg-slate-700/50 border border-slate-600/50 rounded-xl p-4 transition-all duration-300">
                                <div className="flex items-center gap-2 mb-2">
                                    <Calendar
                                        size={14}
                                        className="text-blue-400"
                                    />
                                    <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
                                        Created
                                    </p>
                                </div>
                                <p className="text-white font-semibold">
                                    {new Date(
                                        profile?.createdAt || ""
                                    ).toLocaleDateString()}
                                </p>
                            </div>

                            <div className="bg-slate-700/30 hover:bg-slate-700/50 border border-slate-600/50 rounded-xl p-4 transition-all duration-300">
                                <div className="flex items-center gap-2 mb-2">
                                    <Calendar
                                        size={14}
                                        className="text-purple-400"
                                    />
                                    <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
                                        Updated
                                    </p>
                                </div>
                                <p className="text-white font-semibold">
                                    {new Date(
                                        profile?.updatedAt || ""
                                    ).toLocaleDateString()}
                                </p>
                            </div>

                            <div className="bg-slate-700/30 hover:bg-slate-700/50 border border-slate-600/50 rounded-xl p-4 transition-all duration-300">
                                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
                                    Username
                                </p>
                                <p className="text-white font-semibold truncate">
                                    {profile?.username || "N/A"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
