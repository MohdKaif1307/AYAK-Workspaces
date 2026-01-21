import { useAuth } from "@/hooks/use-auth";
import { useQuotes } from "@/hooks/use-products";
import { Loader2, FileText, Clock } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const { user, isLoading: authLoading } = useAuth();
  const { data: quotes, isLoading: quotesLoading } = useQuotes();

  if (authLoading || quotesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    window.location.href = "/auth";
    return null;
  }

  return (
    <div className="min-h-screen bg-secondary/20">
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="font-display font-bold text-3xl mb-2">My Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user.firstName || user.username}</p>
          </div>
          <Link href="/products">
            <Button>Browse Products</Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-background p-6 rounded-lg border border-border shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full text-primary">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Quotes</p>
                <p className="text-2xl font-bold">{quotes?.length || 0}</p>
              </div>
            </div>
          </div>
          <div className="bg-background p-6 rounded-lg border border-border shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-500/10 rounded-full text-yellow-600">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending Requests</p>
                <p className="text-2xl font-bold">
                  {quotes?.filter(q => q.status === 'pending').length || 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Quotes */}
        <div className="bg-background rounded-lg border border-border shadow-sm overflow-hidden">
          <div className="p-6 border-b border-border">
            <h2 className="font-semibold text-lg">Quote History</h2>
          </div>
          
          {quotes?.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-muted-foreground mb-4">You haven't requested any quotes yet.</p>
              <Link href="/products">
                <Button variant="outline">Start Browsing</Button>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Quote ID</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {quotes?.map((quote) => (
                    <tr key={quote.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">#{quote.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                        {new Date(quote.createdAt!).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full 
                          ${quote.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                            quote.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {quote.status?.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link href={`/quotes/${quote.id}`} className="text-primary hover:text-primary/80">View Details</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
