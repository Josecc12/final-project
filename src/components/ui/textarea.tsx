import { cn } from "@/lib/utils";
import * as React from "react";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    const textAreaRef = React.useRef<HTMLTextAreaElement>(null);

    const handleInput = () => {
      if (textAreaRef.current) {
        textAreaRef.current.style.height = "auto"; 
        textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`; 
      }
    };

    React.useEffect(() => {
      handleInput(); 
    }, []);

    return (
      <textarea
        ref={textAreaRef}
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 scrollbar-hide resize-none",
          className
        )}
        onInput={handleInput} 
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
