import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { TextT, FileImage, GlobeSimple } from "@phosphor-icons/react";
import { Paperclip } from "lucide-react";

export type DialogType = "text" | "files" | "weblinks" | null;

const popoverItems = [
    {
        title: "Raw Text",
        icon: TextT,
        color: "text-red-500",
        dialogKey: "text" as DialogType,
    },
    {
        title: "Files",
        icon: FileImage,
        color: "text-green-500",
        dialogKey: "files" as DialogType,
    },
    {
        title: "WebLinks",
        icon: GlobeSimple,
        color: "text-blue-500",
        dialogKey: "weblinks" as DialogType,
    },
] as const;

interface PopoverItemsProps {
    setActiveDialog: (dialog: DialogType) => void;
}

export default function PopoverItems({ setActiveDialog }: PopoverItemsProps) {
    return (
        <Popover>
            <TooltipProvider>
                <Tooltip>
                    <PopoverTrigger asChild>
                        <TooltipTrigger className="flex items-center gap-1 rounded-full h-8 px-2 text-primary bg-muted-foreground/20 hover:bg-accent-foreground/20 transition-colors">
                            <Paperclip size={18} />
                            <span className="text-sm">Context</span>
                        </TooltipTrigger>
                    </PopoverTrigger>
                    <TooltipContent>
                        Attach file or images with text for context
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <PopoverContent className="rounded-2xl w-fit p-2 bg-popover/60 backdrop-blur-lg">
                {popoverItems.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between gap-2 rounded-full p-2 hover:bg-accent-foreground/5 transition-colors cursor-pointer"
                        onClick={() => setActiveDialog(item.dialogKey)}
                    >
                        <div className="flex items-center gap-2">
                            <item.icon size={18} className={item.color} />
                            <span className="text-sm text-muted-foreground">
                                {item.title}
                            </span>
                        </div>
                    </div>
                ))}
            </PopoverContent>
        </Popover>
    );
}
