"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { useState } from "react";
import { LoaderButton } from "./loader-button";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { AlertCircle, Upload } from "lucide-react";
import { Progress } from "./ui/progress";
import { MAX_FILE_SIZE } from "@/utils/constants";
import { ContextApiResponse } from "@/types/ApiResponse";
import { GetFileIcon } from "@/utils/get-file-icon";

interface UploadDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onUploadComplete?: (data: {
        fileUrl: string;
        metadata: FileMetadata;
    }) => void;
}

interface FileMetadata {
    name: string;
    type: string;
    size: number;
    buffer?: ArrayBuffer;
}

type UploadState =
    | "idle"
    | "preparing"
    | "ready"
    | "uploading"
    | "uploaded"
    | "error";

export default function UploadDialog({
    open,
    onOpenChange,
    onUploadComplete,
}: UploadDialogProps) {
    const [uploadState, setUploadState] = useState<UploadState>("idle");
    const [uploadProgress, setUploadProgress] = useState(0);
    const [filePreview, setFilePreview] = useState<string | null>(null);
    const [fileMetadata, setFileMetadata] = useState<FileMetadata | null>(null);
    const [error, setError] = useState<string>("");

    const formatFileSize = (bytes: number) => {
        if (bytes < 1024) return bytes + " B";
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
        return (bytes / (1024 * 1024)).toFixed(1) + " MB";
    };

    const handleFileChange = async (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (file.size > MAX_FILE_SIZE) {
            setError(
                `File size exceeds ${formatFileSize(MAX_FILE_SIZE)} limit`,
            );
            setUploadState("error");
            return;
        }

        setUploadState("preparing");

        try {
            // Read file preview
            if (file.type.startsWith("image/")) {
                const previewReader = new FileReader();
                previewReader.onload = (e) =>
                    setFilePreview(e.target?.result as string);
                previewReader.readAsDataURL(file);
            }

            // Read file buffer
            const bufferReader = new FileReader();
            bufferReader.onload = async (e) => {
                const buffer = e.target?.result as ArrayBuffer;
                setFileMetadata({
                    name: file.name,
                    type: file.type,
                    size: file.size,
                    buffer,
                });
                setUploadState("ready");
            };
            bufferReader.readAsArrayBuffer(file);
        } catch (error) {
            setError("Failed to prepare file");
            setUploadState("error");
        }
    };

    const uploadFile = async () => {
        if (!fileMetadata?.buffer) return;

        setUploadState("uploading");
        setUploadProgress(0);

        const fileData = {
            name: fileMetadata.name,
            type: fileMetadata.type,
            size: fileMetadata.size,
            buffer: Array.from(new Uint8Array(fileMetadata.buffer)),
        };

        console.log("fileData: ", fileData);

        try {
            const response = await fetch("/api/context/file", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(fileData),
            });

            if (!response.ok) throw new Error("Upload failed");

            const data = (await response.json()) as ContextApiResponse;
            setUploadState("uploaded");
            onUploadComplete?.({
                fileUrl: data.fileUrl!,
                metadata: fileMetadata,
            });
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Failed to upload file",
            );
            setUploadState("error");
        }
    };

    const resetUpload = () => {
        setUploadState("idle");
        setFilePreview(null);
        setFileMetadata(null);
        setError("");
        setUploadProgress(0);
    };

    const renderUploadContent = () => {
        switch (uploadState) {
            case "preparing":
                return (
                    <div className="flex flex-col items-center justify-center h-64">
                        <div className="flex flex-col items-center gap-4">
                            <Progress value={30} className="w-48" />
                            <p className="text-sm text-muted-foreground">
                                Preparing file...
                            </p>
                        </div>
                    </div>
                );

            case "ready":
            case "uploaded":
                return (
                    <div className="flex flex-col items-center justify-between h-64 rounded-xl gap-4">
                        <div className="flex flex-col items-center gap-2 w-full mt-5 md:mt-10">
                            {filePreview ? (
                                <img
                                    src={filePreview}
                                    alt={fileMetadata?.name || "image"}
                                    className="h-24 object-cover aspect-auto rounded-md"
                                />
                            ) : (
                                <div className="w-20 h-20 flex items-center justify-center bg-accent rounded-2xl">
                                    <GetFileIcon
                                        fileName={fileMetadata?.name!}
                                    />
                                </div>
                            )}
                            <span className="text-center">
                                <p className="font-medium truncate">
                                    {fileMetadata?.name}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {formatFileSize(fileMetadata?.size || 0)}
                                </p>
                            </span>
                        </div>
                        {uploadState === "uploaded" ||
                            (uploadState === "ready" && (
                                <Button
                                    variant="outline"
                                    className="w-full rounded-full"
                                    onClick={resetUpload}
                                >
                                    Upload Another File
                                </Button>
                            ))}
                    </div>
                );

            case "error":
                return (
                    <div className="flex flex-col items-center justify-between h-64 rounded-xl gap-4">
                        <div className="flex flex-col items-center text-center mt-10 md:mt-20">
                            <AlertCircle className="h-8 w-8 text-destructive mb-2" />
                            <p className="font-medium text-destructive">
                                {error}
                            </p>
                        </div>
                        <Button
                            variant="outline"
                            className="w-full rounded-full"
                            onClick={resetUpload}
                        >
                            Try Again
                        </Button>
                    </div>
                );

            case "uploading":
                return (
                    <div className="flex flex-col items-center justify-between h-64 rounded-xl gap-4">
                        <div className="flex flex-col items-center gap-2 w-full mt-10">
                            {filePreview ? (
                                <img
                                    src={filePreview}
                                    alt={fileMetadata?.name}
                                    className="h-16 object-cover rounded-md"
                                />
                            ) : (
                                <div className="w-16 h-16 flex items-center justify-center bg-accent rounded-2xl">
                                    <GetFileIcon
                                        fileName={fileMetadata?.name!}
                                    />
                                </div>
                            )}
                            <span className="text-center">
                                <p className="font-medium truncate">
                                    {fileMetadata?.name}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {formatFileSize(fileMetadata?.size || 0)}
                                </p>
                            </span>
                        </div>
                        <div className="w-full space-y-2">
                            <Progress value={uploadProgress} />
                            <p className="text-sm text-center text-muted-foreground">
                                Uploading... {uploadProgress}%
                            </p>
                        </div>
                    </div>
                );

            default:
                return (
                    <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-primary/20 rounded-xl cursor-pointer bg-accent/90 hover:bg-muted">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="h-8 w-8 mb-4" />
                            <p className="mb-2 text-base">
                                <span className="font-semibold">
                                    Click to upload
                                </span>{" "}
                                or drag and drop
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Images, PDF, DOC, DOCX, TXT (Max.{" "}
                                {formatFileSize(MAX_FILE_SIZE)})
                            </p>
                        </div>
                        <Input
                            type="file"
                            className="hidden"
                            accept="image/*,.pdf,.doc,.docx,.txt"
                            onChange={handleFileChange}
                        />
                    </label>
                );
        }
    };

    return (
        <Dialog open={open}>
            <DialogContent hideCloseButton className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Upload File</DialogTitle>
                    <DialogDescription>
                        Upload any document or image file.
                    </DialogDescription>
                </DialogHeader>
                {renderUploadContent()}
                <DialogFooter className="flex flex-row items-center gap-2">
                    <Button
                        onClick={() => {
                            onOpenChange(false);
                            resetUpload();
                        }}
                        variant="secondary"
                        className="w-1/2 rounded-full"
                    >
                        Close
                    </Button>
                    <LoaderButton
                        isLoading={uploadState === "preparing"}
                        onClick={uploadFile}
                        disabled={uploadState !== "ready"}
                        className="w-1/2 rounded-full"
                    >
                        Upload
                    </LoaderButton>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
