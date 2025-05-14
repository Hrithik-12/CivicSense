import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { MessageSquarePlus, SendHorizonal, Loader2, Bug, Lightbulb, FileText, Sparkles, HelpCircle } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const FeedbackSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState("suggestion");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!message.trim()) {
      toast({
        title: "Error",
        description: "Please enter your feedback message",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/feedback", {
        message,
        category,
      });
      
      toast({
        title: "Success",
        description: "Your feedback has been submitted successfully",
      });
      
      setIsOpen(false);
      setMessage("");
      setCategory("suggestion");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit feedback. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCategoryIcon = (cat: string) => {
    const icons = {
      suggestion: <Lightbulb className="h-4 w-4" />,
      bug: <Bug className="h-4 w-4" />,
      content: <FileText className="h-4 w-4" />,
      feature: <Sparkles className="h-4 w-4" />,
      other: <HelpCircle className="h-4 w-4" />
    };
    return icons[cat as keyof typeof icons] || icons.other;
  };

  return (
    <div className="mb-8">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 shadow-sm hover:shadow-md transition-all duration-300">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-blue-100 p-2 rounded-lg">
                <MessageSquarePlus className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Your Feedback Matters</h3>
            </div>
            <p className="text-sm text-gray-600">Help us improve government services and citizen engagement.</p>
          </div>
          
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 transition-colors flex items-center gap-2">
                <SendHorizonal className="h-4 w-4" />
                Share Feedback
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-xl flex items-center gap-2">
                  <MessageSquarePlus className="h-5 w-5 text-blue-600" />
                  Share Your Feedback
                </DialogTitle>
                <DialogDescription className="text-gray-600">
                  Your insights help us improve CivicSense for all citizens.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="feedback-category" className="text-gray-700">Feedback Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger id="feedback-category" className="bg-white">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {["suggestion", "bug", "content", "feature", "other"].map((cat) => (
                        <SelectItem key={cat} value={cat} className="flex items-center gap-2">
                          {getCategoryIcon(cat)}
                          <span className="capitalize">{cat}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="feedback-message" className="text-gray-700">Your Message</Label>
                  <Textarea
                    id="feedback-message"
                    placeholder="Tell us what you think..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    className="resize-none bg-white focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button 
                  type="submit" 
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700 transition-colors w-full sm:w-auto"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <SendHorizonal className="h-4 w-4 mr-2" />
                      Submit Feedback
                    </>
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default FeedbackSection;
