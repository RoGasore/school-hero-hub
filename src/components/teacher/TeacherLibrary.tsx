import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Search, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const TeacherLibrary = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");

  const { data: resources, isLoading } = useQuery({
    queryKey: ["library-resources"],
    queryFn: async () => {
      // Mock data for now
      return [
        {
          id: "1",
          title: "Cours de mathématiques - Chapitre 1",
          type: "PDF",
          subject: "Mathématiques",
          uploadedAt: "2024-03-20",
        },
        {
          id: "2",
          title: "Exercices de géométrie",
          type: "PDF",
          subject: "Mathématiques",
          uploadedAt: "2024-03-19",
        },
      ];
    },
  });

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // TODO: Implement file upload logic
    toast({
      title: "Succès",
      description: "Le fichier a été téléchargé avec succès",
    });
  };

  const handleShare = (resourceId: string) => {
    // TODO: Implement sharing logic
    toast({
      title: "Lien copié",
      description: "Le lien de partage a été copié dans le presse-papier",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher une ressource..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button className="gap-2">
          <Upload className="h-4 w-4" />
          Ajouter une ressource
          <input
            type="file"
            className="hidden"
            onChange={handleFileUpload}
            accept=".pdf,.doc,.docx,.ppt,.pptx"
          />
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {resources?.map((resource) => (
          <Card key={resource.id}>
            <CardHeader>
              <CardTitle className="text-lg">{resource.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Type:</span>
                  <span>{resource.type}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Matière:</span>
                  <span>{resource.subject}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Date:</span>
                  <span>{resource.uploadedAt}</span>
                </div>
                <Button
                  variant="outline"
                  className="w-full mt-4 gap-2"
                  onClick={() => handleShare(resource.id)}
                >
                  <Share2 className="h-4 w-4" />
                  Partager
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};