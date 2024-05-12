"use client";

import { useChat } from "ai/react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CornerDownLeft, Mic, Paperclip } from "lucide-react";

function formatCurrentTime(): string {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

export default function Page() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  return (
    <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2 bg-gray-50">
      <TooltipProvider>
        <div className="space-y-6 max-h-[72vh] overflow-auto flex-1 pb-6 flex flex-col">
          {messages.map((m: any) => (
            // <div key={m.id} className="whitespace-pre-wrap">
            //   {m.role === "user" ? "User: " : "AI: "}

            // </div>
            <div
              key={m.id}
              className={
                "flex flex-col w-full max-w-[320px] rounded-xl leading-1.5 p-4 border-gray-200 bg-gray-200 dark:bg-gray-700 " +
                (m.role === "user"
                  ? "ml-auto rounded-br-none"
                  : "rounded-bl-none")
              }
            >
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {m.role === "user" ? "User" : "InsightIQ"}
                </span>
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  {formatCurrentTime()}
                </span>
              </div>
              <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
                {m.content}
              </p>
            </div>
          ))}
        </div>
        <form
          className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
          x-chunk="dashboard-03-chunk-1"
          onSubmit={handleSubmit}
        >
          <Label htmlFor="message" className="sr-only">
            Message
          </Label>
          <Textarea
            id="message"
            placeholder="Type your message here..."
            className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
            value={input}
            onChange={handleInputChange}
          />
          <div className="flex items-center p-3 pt-0">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Paperclip className="size-4" />
                  <span className="sr-only">Attach file</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">Attach File</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Mic className="size-4" />
                  <span className="sr-only">Use Microphone</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">Use Microphone</TooltipContent>
            </Tooltip>
            <Button type="submit" size="sm" className="ml-auto gap-1.5">
              Send Message
              <CornerDownLeft className="size-3.5" />
            </Button>
          </div>
        </form>
      </TooltipProvider>
    </div>
  );
}
