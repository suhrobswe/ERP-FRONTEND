"use client";

import type React from "react";

import { useNavigate, useParams } from "react-router-dom";
import { useTeacherDetail } from "../service/query/useTeacherDetail";
import { useUploadImage } from "../service/mutation/useUploadImage";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { TeacherForm } from "../components/teacher-form";
import { Spinner } from "@/components/ui/spinner";
import defaultProfileImage from "../../../assets/profile.jpg";
import { ArrowLeft, Camera, Upload } from "lucide-react";
import { useUpdateActive } from "../service/mutation/useUpdateActive";
import { Switch } from "@/components/ui/switch";
import { useSpecification } from "../service/query/useSpecification";

export const TeacherDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const client = useQueryClient();

    const { data, isLoading, isFetching } = useTeacherDetail(id as string);
    const { mutate, isPending } = useUploadImage(id as string);

    const updateStatus = useUpdateActive(String(id));

    const handleStatusChange = (state: boolean) => {
        toast.info("Updating status...");
        updateStatus.mutate(state, {
            onSuccess: () => {
                toast.success("Status updated");
                client.invalidateQueries({ queryKey: ["teacher", id] });
            },
            onError: () => toast.error("Error updating status"),
        });
    };

    const {} = useSpecification();

    const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            toast("Max file size is 5MB");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        mutate(formData, {
            onSuccess: () => {
                client.invalidateQueries({ queryKey: ["teacher", id] });
                toast("Profile updated");
            },
        });
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black">
                <Spinner />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050505] px-5 py-10">
            <div className="max-w-6xl mx-auto space-y-10">
                <button
                    onClick={() => navigate(-1)}
                    className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#1a1a1a] bg-[#0b0b0b] text-gray-300 hover:text-white hover:bg-[#131313] transition-all duration-300 hover:scale-[1.03] shadow-md"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                </button>

                <div className="border border-[#1e1e1e] rounded-2xl bg-[#0e0e0e] shadow-[0_0_30px_rgba(0,0,0,0.45)] overflow-hidden backdrop-blur-md">
                    <div className="relative px-10 py-14 bg-[#111]">
                        <div className="absolute inset-0 opacity-20">
                            <div className="w-96 h-96 bg-blue-500 blur-[140px] absolute -right-20 top-0"></div>
                            <div className="w-96 h-96 bg-purple-500 blur-[140px] absolute -left-20 bottom-0"></div>
                        </div>

                        <div className="relative z-10 flex flex-col md:flex-row gap-10 items-center md:items-end">
                            <div className="relative group">
                                <div className="w-40 h-40 rounded-full overflow-hidden border-[3px] border-white/20 shadow-xl group-hover:scale-[1.03] transition-all duration-300">
                                    {isPending || isFetching ? (
                                        <Spinner />
                                    ) : (
                                        <img
                                            src={
                                                data?.data.avatarUrl ||
                                                defaultProfileImage
                                            }
                                            className="object-cover w-full h-full"
                                        />
                                    )}
                                </div>

                                <label
                                    htmlFor="upload_image"
                                    className="absolute right-0 bottom-0 bg-[#1f1f1f] hover:bg-[#292929] border border-gray-700 p-3 rounded-full cursor-pointer transition-all duration-300 shadow-lg hover:scale-110"
                                >
                                    {data?.data.avatarUrl ? (
                                        <Camera size={18} />
                                    ) : (
                                        <Upload size={18} />
                                    )}
                                </label>

                                <input
                                    id="upload_image"
                                    type="file"
                                    hidden
                                    accept="image/*"
                                    onChange={uploadImage}
                                />
                            </div>

                            <div className="text-white space-y-2">
                                <h1 className="text-4xl font-bold tracking-tight">
                                    {data?.data.name}
                                </h1>
                                <p className="text-gray-400 text-lg">
                                    {data?.data.specification}
                                </p>

                                <div className="flex items-center gap-3 mt-2">
                                    <Switch
                                        checked={data?.data.isActive}
                                        disabled={updateStatus.isPending}
                                        onCheckedChange={handleStatusChange}
                                        className={`
            cursor-pointer transition-all duration-300 rounded-full
            data-[state=checked]:bg-green-500
            data-[state=unchecked]:bg-red-600
            ${
                data?.data.isActive
                    ? "shadow-lg shadow-green-400/40"
                    : "shadow-lg shadow-red-400/40"
            }
        `}
                                    />

                                    <span
                                        className={`text-sm font-medium transition-all duration-300 ${
                                            data?.data.isActive
                                                ? "text-green-400"
                                                : "text-red-400"
                                        }`}
                                    >
                                        {data?.data.isActive
                                            ? "Active"
                                            : "Blocked"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-10 space-y-8">
                        <div>
                            <h2 className="text-2xl font-semibold text-white">
                                Edit Profile
                            </h2>
                            <p className="text-gray-500 mt-1">
                                Update personal information
                            </p>
                        </div>

                        <div className="p-8 bg-black/40 border border-gray-800 rounded-xl shadow-inner backdrop-blur">
                            <TeacherForm
                                closeModal={() => navigate(-1)}
                                teacherId={id}
                                defaultValueData={data}
                            />
                        </div>
                    </div>

                    <div className="px-10 py-6 border-t border-[#1a1a1a] text-gray-500 text-sm flex justify-between">
                        <span>
                            Last updated: {new Date().toLocaleDateString()}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
