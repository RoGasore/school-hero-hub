import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Book } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  description: string;
  availableCopies: number;
  category: string;
  coverUrl?: string;
  onBorrow: (bookId: string) => void;
}

export const BookCard = ({
  id,
  title,
  author,
  description,
  availableCopies,
  category,
  coverUrl,
  onBorrow,
}: BookCardProps) => {
  const { toast } = useToast();

  const handleBorrow = async () => {
    try {
      onBorrow(id);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible d'emprunter ce livre pour le moment",
      });
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {coverUrl ? (
            <img
              src={coverUrl}
              alt={title}
              className="w-16 h-20 object-cover rounded"
            />
          ) : (
            <Book className="w-12 h-12 text-primary" />
          )}
          <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground">{author}</p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
          {description}
        </p>
        <div className="flex items-center gap-2 text-sm">
          <span className="px-2 py-1 bg-primary/10 text-primary rounded">
            {category}
          </span>
          <span className="px-2 py-1 bg-secondary/10 text-secondary rounded">
            {availableCopies} disponible{availableCopies > 1 ? "s" : ""}
          </span>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleBorrow}
          disabled={availableCopies === 0}
          className="w-full"
        >
          {availableCopies > 0 ? "Emprunter" : "Indisponible"}
        </Button>
      </CardFooter>
    </Card>
  );
};