
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Copy, Check } from "lucide-react";

const EmbedCode = ({ botId }: { botId: number | string }) => {
  const [copied, setCopied] = useState(false);
  
  // Generate embed code - this would come from your API in a real app
  const embedCode = `<script src="https://chatcanvas.io/embed.js" data-bot-id="${botId}"></script>`;
  
  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    toast.success('Embed code copied to clipboard');
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  
  return (
    <div className="space-y-3">
      <div className="relative">
        <pre className="bg-chatcanvas-gray-100 p-3 rounded-lg text-xs overflow-x-auto">
          {embedCode}
        </pre>
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-2 right-2"
          onClick={handleCopy}
        >
          {copied ? (
            <Check className="h-4 w-4 text-chatcanvas-green" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
      <p className="text-xs text-chatcanvas-gray-500">
        Add this script tag to your website's HTML before the closing body tag.
      </p>
    </div>
  );
};

export default EmbedCode;
