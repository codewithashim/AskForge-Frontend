
import React from 'react';
import { Label } from "@/shared/ui/label";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Palette } from "lucide-react";

type ChatbotConfig = {
  primaryColor: string;
  secondaryColor?: string;
  fontFamily?: string;
  fontSize?: string;
  borderRadius?: string;
  messageBubbleStyle?: string;
  userBubbleColor?: string;
  botBubbleColor?: string;
  darkMode?: boolean;
  [key: string]: any;
};

interface ThemeCustomizerProps {
  config: ChatbotConfig;
  onChange: (config: ChatbotConfig) => void;
}

// Predefined themes
const predefinedThemes = [
  {
    name: "Classic Blue",
    config: {
      primaryColor: "#3B82F6",
      secondaryColor: "#10B981",
      userBubbleColor: "#3B82F6",
      botBubbleColor: "#f3f4f6",
      messageBubbleStyle: "default",
      darkMode: false
    }
  },
  {
    name: "Dark Mode",
    config: {
      primaryColor: "#4B5563",
      secondaryColor: "#1F2937",
      userBubbleColor: "#4B5563",
      botBubbleColor: "#374151",
      messageBubbleStyle: "modern",
      darkMode: true
    }
  },
  {
    name: "Modern Minimal",
    config: {
      primaryColor: "#000000",
      secondaryColor: "#374151",
      userBubbleColor: "#000000",
      botBubbleColor: "#f9fafb",
      messageBubbleStyle: "minimal",
      darkMode: false
    }
  },
  {
    name: "Vibrant Purple",
    config: {
      primaryColor: "#8B5CF6",
      secondaryColor: "#C084FC",
      userBubbleColor: "#8B5CF6",
      botBubbleColor: "#F3E8FF",
      messageBubbleStyle: "outlined",
      darkMode: false
    }
  },
  {
    name: "Coral Sunset",
    config: {
      primaryColor: "#F59E0B",
      secondaryColor: "#EC4899",
      userBubbleColor: "#EC4899",
      botBubbleColor: "#FEF3C7",
      messageBubbleStyle: "modern",
      darkMode: false
    }
  },
  {
    name: "Green Nature",
    config: {
      primaryColor: "#10B981",
      secondaryColor: "#34D399",
      userBubbleColor: "#10B981",
      botBubbleColor: "#ECFDF5",
      messageBubbleStyle: "default",
      darkMode: false
    }
  },
];

const ThemeCustomizer: React.FC<ThemeCustomizerProps> = ({ config, onChange }) => {
  const applyTheme = (themeConfig: Partial<ChatbotConfig>) => {
    onChange({
      ...config,
      ...themeConfig
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-base font-medium mb-2 dark:text-white">Preset Themes</h3>
        <p className="text-sm text-askforge-gray-500 dark:text-gray-400 mb-3">
          Choose a predefined theme or customize your own
        </p>
        
        <div className="grid grid-cols-2 gap-2">
          {predefinedThemes.map((theme, index) => (
            <Card 
              key={index} 
              className={`cursor-pointer transition-all duration-200 hover:shadow-md border-2 ${
                theme.config.primaryColor === config.primaryColor &&
                theme.config.messageBubbleStyle === config.messageBubbleStyle
                  ? 'border-primary' 
                  : 'border-transparent'
              } dark:bg-gray-800 dark:border-gray-700 dark:hover:border-gray-500`}
              onClick={() => applyTheme(theme.config)}
            >
              <CardHeader className="p-3 pb-0">
                <CardTitle className="text-sm dark:text-white">{theme.name}</CardTitle>
              </CardHeader>
              <CardContent className="p-3">
                <div className="flex gap-2">
                  <div 
                    className="w-6 h-6 rounded-full" 
                    style={{ backgroundColor: theme.config.primaryColor }}
                  ></div>
                  <div 
                    className="w-6 h-6 rounded-full" 
                    style={{ backgroundColor: theme.config.secondaryColor }}
                  ></div>
                  <div 
                    className="w-6 h-6 rounded-full" 
                    style={{ backgroundColor: theme.config.userBubbleColor }}
                  ></div>
                  <div 
                    className="w-6 h-6 rounded-full border border-gray-200 dark:border-gray-600" 
                    style={{ backgroundColor: theme.config.botBubbleColor }}
                  ></div>
                </div>
                <Badge variant="outline" className="mt-2 text-xs">
                  {theme.config.messageBubbleStyle}
                </Badge>
                {theme.config.darkMode && (
                  <Badge variant="secondary" className="mt-2 ml-1 text-xs">
                    dark
                  </Badge>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <div className="mt-4">
        <Button 
          variant="outline" 
          className="w-full group dark:text-white dark:border-gray-600 dark:hover:bg-gray-700"
          onClick={() => {
            // Generate a random theme
            const randomColor = () => {
              return `#${Math.floor(Math.random()*16777215).toString(16)}`;
            };
            
            const randomTheme = {
              primaryColor: randomColor(),
              secondaryColor: randomColor(),
              userBubbleColor: randomColor(),
              botBubbleColor: Math.random() > 0.5 ? randomColor() : '#f3f4f6',
              messageBubbleStyle: ['default', 'modern', 'minimal', 'outlined'][Math.floor(Math.random() * 4)],
              darkMode: Math.random() > 0.7
            };
            
            applyTheme(randomTheme);
          }}
        >
          <Palette className="mr-2 h-4 w-4 group-hover:animate-spin" />
          Generate Random Theme
        </Button>
      </div>
      
      <div className="text-sm text-askforge-gray-500 dark:text-gray-400 mt-4 bg-gray-50 dark:bg-gray-700/50 p-3 rounded-md">
        <p>Need more customization options? Use the Appearance and Advanced tabs to fine-tune your chatbot's look and feel.</p>
      </div>
    </div>
  );
};

export default ThemeCustomizer;
