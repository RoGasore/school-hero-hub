import { useState } from "react";
import { BookCard } from "./BookCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

export const BookList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const { data: books, isLoading, refetch } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("books")
        .select("*");
      
      if (error) throw error;
      return data;
    },
  });

  const handleBorrow = async (bookId: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Get the current book to check available copies
    const { data: book } = await supabase
      .from("books")
      .select("available_copies")
      .eq("id", bookId)
      .single();

    if (!book || book.available_copies < 1) {
      throw new Error("No copies available");
    }

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14); // 2 semaines de prêt

    const { error: loanError } = await supabase
      .from("book_loans")
      .insert({
        book_id: bookId,
        user_id: user.id,
        due_date: dueDate.toISOString(),
      });

    if (loanError) throw loanError;

    // Mettre à jour le nombre de copies disponibles
    const { error: updateError } = await supabase
      .from("books")
      .update({ available_copies: book.available_copies - 1 })
      .eq("id", bookId);

    if (updateError) throw updateError;

    // Rafraîchir la liste des livres
    refetch();
  };

  const filteredBooks = books?.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || book.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const categories = [...new Set(books?.map(book => book.category) || [])];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Rechercher un livre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
        <Select
          value={categoryFilter}
          onValueChange={setCategoryFilter}
        >
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Catégorie" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les catégories</SelectItem>
            {categories.map(category => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks?.map((book) => (
          <BookCard
            key={book.id}
            id={book.id}
            title={book.title}
            author={book.author}
            description={book.description}
            availableCopies={book.available_copies}
            category={book.category}
            coverUrl={book.cover_url}
            onBorrow={handleBorrow}
          />
        ))}
      </div>
    </div>
  );
};