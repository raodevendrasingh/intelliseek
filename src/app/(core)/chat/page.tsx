"use client";

import { querySchema } from "@/lib/app-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, SpinnerBall, GlobeSimple } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Paperclip } from "lucide-react";

export default function ChatPage() {
	const [isLoading, setLoading] = useState<boolean>(false);
	const router = useRouter();
	const form = useForm<z.infer<typeof querySchema>>({
		resolver: zodResolver(querySchema),
		defaultValues: {
			query: "",
		},
	});

	const isQueryEmpty = form.watch("query") === "";

	const onSubmit = async (queryData: z.infer<typeof querySchema>) => {
		setLoading(true);
		console.log(queryData);
		try {
			const response = await fetch("/api/chat", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(queryData),
			});

			const data = await response.json();
			console.log(data);
		} catch (error) {
			console.log(error);
			alert("Error submitting query");
		}
		setLoading(false);
	};
	return (
		<div className="w-full mx-auto min-h-screen flex justify-center items-center px-5">
			<div className="flex flex-col justify-center items-center w-full mx-auto">
				<div className="text-center pb-10">
					<h1 className="text-3xl font-bold">
						What can I help you with?
					</h1>
				</div>
				<Card className="min-w-max max-w-2xl w-full p-3 space-y-3 bg-accent rounded-3xl">
					<CardContent className="w-full p-0">
						<Form {...form}>
							<form>
								<FormField
									control={form.control}
									name="query"
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Textarea
													placeholder="Add a resource and start chatting..."
													className="resize-none w-full border-0"
													rows={2}
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</form>
						</Form>
					</CardContent>
					<CardFooter className="p-0">
						<div className="flex justify-between items-center w-full">
							<Badge
								variant="outline"
								className="bg-primary-foreground space-x-1 rounded-full text-primary/70 hover:text-emerald-600 hover:border-emerald-600 transition-colors cursor-pointer px-2 py-1"
							>
								<GlobeSimple size={20} />
								<span>Web</span>
							</Badge>

							<div className="flex items-center gap-3">
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger className="flex items-center gap-1 rounded-full h-8 px-2 hover:text-emerald-600 hover:bg-primary/10 bg-transparent transition-colors text-primary/70">
											<Paperclip size={18} />
										</TooltipTrigger>
										<TooltipContent>
											Attach file and images for context
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>

								<Button
									size="icon"
									className="h-8 w-8 rounded-full bg-emerald-500 hover:bg-emerald-700 cursor-pointer"
									onClick={form.handleSubmit(onSubmit)}
									disabled={isQueryEmpty}
								>
									{isLoading ? (
										<SpinnerBall
											size={32}
											className="animate-spin"
										/>
									) : (
										<ArrowRight size={32} />
									)}
								</Button>
							</div>
						</div>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
}
