import { Navbar } from "@/components/layout/Navbar";
import { BookList } from "@/components/library/BookList";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const Library = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/login');
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate('/login');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="container mx-auto px-4 py-8 mt-16">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-serif font-bold text-gray-900 dark:text-white mb-8">
            Bibliothèque
          </h1>
          <BookList />
        </div>
      </main>
    </div>
  );
};

export default Library;