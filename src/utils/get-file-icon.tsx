import {
    FileDoc,
    FilePdf,
    FileTxt,
    FileCode,
    FileText,
} from "@phosphor-icons/react";

export const GetFileIcon = ({ fileName }: { fileName: string }) => {
    const extension = fileName.split(".").pop()?.toLowerCase();

    switch (extension) {
        case "doc":
        case "docx":
            return (
                <FileDoc size={44} className="text-teal-400" weight="fill" />
            );
        case "pdf":
            return (
                <FilePdf size={44} className="text-rose-400" weight="fill" />
            );
        case "txt":
            return <FileTxt size={44} className="text-sky-400" weight="fill" />;
        case "py":
        case "cpp":
        case "ts":
        case "js":
        case "tsx":
        case "jsx":
        case "html":
        case "css":
            return (
                <FileCode size={44} className="text-green-400" weight="fill" />
            );
        default:
            return (
                <FileText size={44} className="text-sky-400" weight="fill" />
            );
    }
};
