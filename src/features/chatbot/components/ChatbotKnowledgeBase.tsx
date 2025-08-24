
import React, { useState } from 'react';
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { FileText, Upload, X, MoreVertical, Trash2, CheckCheck, AlertTriangle, Link } from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/ui/tabs";
import { Progress } from "@/shared/ui/progress";

// Mock data for knowledge base files - empty by default
const initialFiles: FileItem[] = [];

interface FileItem {
  id: number;
  name: string;
  size: string;
  type: string;
  status: 'processing' | 'processed';
  uploadDate: string;
  chatbotId: number;
}

interface ChatbotKnowledgeBaseProps {
  chatbotId: number;
  chatbotName: string;
}

const ChatbotKnowledgeBase: React.FC<ChatbotKnowledgeBaseProps> = ({ chatbotId, chatbotName }) => {
  const [files, setFiles] = useState<FileItem[]>(initialFiles);
  const [urlInput, setUrlInput] = useState('');
  const [activeTab, setActiveTab] = useState('files');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  
  const handleDeleteFile = (id: number) => {
    setFiles(files.filter(file => file.id !== id));
    toast.success('File removed from knowledge base');
  };
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;
    
    setIsUploading(true);
    
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setUploadProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          // Add new files to the list
          const newFiles = Array.from(selectedFiles).map((file, index) => ({
            id: Math.max(...(files.length ? files.map(f => f.id) : [0]), 0) + index + 1,
            name: file.name,
            size: `${(file.size / 1024).toFixed(0)} KB`,
            type: file.type,
            status: 'processing' as const,
            uploadDate: new Date().toISOString().split('T')[0],
            chatbotId: chatbotId
          }));
          
          setFiles([...newFiles, ...files]);
          setIsUploading(false);
          setUploadProgress(0);
          toast.success(`${selectedFiles.length} file(s) uploaded successfully`);
          
          // Simulate processing completion after 2 seconds
          setTimeout(() => {
            setFiles(currentFiles => 
              currentFiles.map(file => 
                newFiles.some(nf => nf.id === file.id) 
                  ? { ...file, status: 'processed' as const }
                  : file
              )
            );
          }, 2000);
        }, 500);
      }
    }, 100);
  };
  
  const handleAddUrl = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!urlInput) return;
    
    // Validate URL
    try {
      new URL(urlInput);
    } catch (err) {
      toast.error('Please enter a valid URL');
      return;
    }
    
    // Simulate adding URL to knowledge base
    setIsUploading(true);
    
    // Simulate processing
    setTimeout(() => {
      const newFile = {
        id: Math.max(...(files.length ? files.map(f => f.id) : [0]), 0) + 1,
        name: urlInput,
        size: 'N/A',
        type: 'url',
        status: 'processing' as const,
        uploadDate: new Date().toISOString().split('T')[0],
        chatbotId: chatbotId
      };
      
      setFiles([newFile, ...files]);
      setUrlInput('');
      setIsUploading(false);
      toast.success('URL added to knowledge base');
      
      // Simulate processing completion after 2 seconds
      setTimeout(() => {
        setFiles(currentFiles => 
          currentFiles.map(file => 
            file.id === newFile.id 
              ? { ...file, status: 'processed' as const }
              : file
          )
        );
      }, 2000);
    }, 1500);
  };
  
  const getFileIcon = (fileType: string) => {
    if (fileType === 'application/pdf') {
      return <FileText className="h-8 w-8 text-red-500" />;
    } else if (fileType.includes('word')) {
      return <FileText className="h-8 w-8 text-blue-500" />;
    } else if (fileType === 'text/csv') {
      return <FileText className="h-8 w-8 text-green-500" />;
    } else if (fileType === 'url') {
      return <Link className="h-8 w-8 text-chatcanvas-purple" />;
    } else {
      return <FileText className="h-8 w-8 text-gray-500" />;
    }
  };
  
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-chatcanvas-gray-900">Knowledge Base for "{chatbotName}"</h2>
        <p className="text-chatcanvas-gray-500">Upload files to train this specific chatbot</p>
      </div>
      
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Training Data</CardTitle>
              <CardDescription>
                Add files or URLs to build this chatbot's knowledge
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="files">Upload Files</TabsTrigger>
                  <TabsTrigger value="urls">Add URLs</TabsTrigger>
                </TabsList>
                
                <TabsContent value="files">
                  <div className="border-2 border-dashed rounded-lg p-8 text-center mb-6">
                    <div className="flex flex-col items-center">
                      <Upload className="h-10 w-10 text-chatcanvas-gray-400 mb-4" />
                      <h3 className="text-lg font-medium mb-2">Upload Files</h3>
                      <p className="text-chatcanvas-gray-500 mb-4 max-w-md">
                        Drag and drop files here, or click to browse. 
                        Supported formats: PDF, DOCX, TXT, CSV.
                      </p>
                      
                      <div className="relative">
                        <Input
                          type="file"
                          multiple
                          className="absolute inset-0 opacity-0 cursor-pointer"
                          onChange={handleFileUpload}
                        />
                        <Button>Select Files</Button>
                      </div>
                    </div>
                  </div>
                  
                  {isUploading && (
                    <div className="mb-6">
                      <div className="flex justify-between mb-2 text-sm">
                        <span>Uploading...</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <Progress value={uploadProgress} />
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="urls">
                  <form onSubmit={handleAddUrl} className="mb-6">
                    <div className="mb-4">
                      <Label htmlFor="url">Add URL to Knowledge Base</Label>
                      <div className="flex mt-1">
                        <Input
                          id="url"
                          type="url"
                          placeholder="https://example.com/docs/page"
                          value={urlInput}
                          onChange={(e) => setUrlInput(e.target.value)}
                          className="rounded-r-none"
                        />
                        <Button type="submit" disabled={isUploading} className="rounded-l-none">
                          Add
                        </Button>
                      </div>
                      <p className="text-xs text-chatcanvas-gray-500 mt-1">
                        We'll crawl the content and add it to this chatbot's knowledge base
                      </p>
                    </div>
                  </form>
                </TabsContent>
              </Tabs>
              
              {files.length > 0 ? (
                <div>
                  <h3 className="font-medium mb-3">Knowledge Base Files</h3>
                  <div className="border rounded-lg divide-y">
                    {files.map((file) => (
                      <div key={file.id} className="p-4 flex items-center justify-between">
                        <div className="flex items-center">
                          {getFileIcon(file.type)}
                          <div className="ml-3">
                            <h4 className="font-medium text-sm text-chatcanvas-gray-900 mb-1">
                              {file.name}
                            </h4>
                            <div className="flex items-center text-xs text-chatcanvas-gray-500">
                              <span className="mr-2">{file.size}</span>
                              <span>•</span>
                              <span className="mx-2">{file.uploadDate}</span>
                              <span>•</span>
                              <div className="ml-2 flex items-center">
                                {file.status === 'processed' ? (
                                  <>
                                    <CheckCheck className="h-3 w-3 text-chatcanvas-green mr-1" />
                                    <span className="text-chatcanvas-green">Processed</span>
                                  </>
                                ) : (
                                  <>
                                    <AlertTriangle className="h-3 w-3 text-amber-500 mr-1" />
                                    <span className="text-amber-500">Processing</span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem 
                              onClick={() => handleDeleteFile(file.id)}
                              className="text-destructive focus:text-destructive"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Remove
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-chatcanvas-gray-500">
                  <FileText className="h-10 w-10 mx-auto mb-4 text-chatcanvas-gray-300" />
                  <p>No files in knowledge base for this chatbot yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Training Guide</CardTitle>
              <CardDescription>
                Tips for optimal knowledge base building
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm">
                <div>
                  <h3 className="font-medium mb-1">Supported File Types</h3>
                  <ul className="list-disc pl-5 text-chatcanvas-gray-600">
                    <li>PDF documents</li>
                    <li>Word documents (.docx)</li>
                    <li>Text files (.txt)</li>
                    <li>CSV files</li>
                    <li>Web pages (via URL)</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium mb-1">Tips for Better Results</h3>
                  <ul className="list-disc pl-5 text-chatcanvas-gray-600">
                    <li>Use well-structured documents</li>
                    <li>Include FAQs in your content</li>
                    <li>Update your knowledge base regularly</li>
                    <li>Group related information together</li>
                    <li>Include common customer questions</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium mb-1">Processing Time</h3>
                  <p className="text-chatcanvas-gray-600">
                    Document processing may take a few minutes depending on file size. 
                    The chatbot will automatically use new knowledge once processing is complete.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ChatbotKnowledgeBase;
