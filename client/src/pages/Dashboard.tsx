import { useAuth } from "@/hooks/use-auth";
import { useQuotes } from "@/hooks/use-products";
import { Loader2, FileText, Clock, CheckCircle2, TrendingUp, Award } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

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

  const totalQuotes = quotes?.length || 0;
  const pendingQuotes = quotes?.filter(q => q.status === 'pending').length || 0;
  const approvedQuotes = quotes?.filter(q => q.status === 'approved').length || 0;

  const stats = [
    { icon: FileText, label: "Total Quotes", value: totalQuotes, color: "text-primary", bg: "bg-primary/10", border: "hover:border-primary/50" },
    { icon: Clock, label: "Pending Review", value: pendingQuotes, color: "text-amber-600", bg: "bg-amber-500/10", border: "hover:border-amber-500/50" },
    { icon: CheckCircle2, label: "Approved", value: approvedQuotes, color: "text-green-600", bg: "bg-green-500/10", border: "hover:border-green-500/50" },
    { icon: Award, label: "Account Status", value: "Premium", color: "text-primary", bg: "bg-primary/10", border: "hover:border-primary/50" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start gap-4 mb-12"
        >
          <div>
            <h1 className="font-display font-bold text-4xl md:text-5xl mb-2">Welcome back</h1>
            <p className="text-lg text-muted-foreground">
              {user.firstName ? `${user.firstName}, here's your workspace overview` : `${user.email}, here's your overview`}
            </p>
          </div>
          <Link href="/products">
            <Button size="lg" className="font-semibold rounded-lg px-8">Browse Products</Button>
          </Link>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`premium-card p-6 ${stat.border}`}
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 ${stat.bg} rounded-xl`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quote History */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 premium-card overflow-hidden"
          >
            <div className="p-6 border-b border-border">
              <h2 className="font-display font-bold text-2xl">Quote History</h2>
              <p className="text-muted-foreground text-sm mt-1">Track and manage all your project quotes</p>
            </div>

            {quotes?.length === 0 ? (
              <div className="p-12 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-primary" />
                </div>
                <p className="text-muted-foreground mb-2 font-medium">You haven't requested any quotes yet.</p>
                <p className="text-muted-foreground text-sm mb-6">Start exploring our collections and request a quote.</p>
                <Link href="/products">
                  <Button variant="outline" className="rounded-lg">Start Browsing</Button>
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-secondary/50 border-b border-border">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Quote ID</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Date</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {quotes?.map((quote) => (
                      <tr key={quote.id} className="hover:bg-secondary/30 transition-colors">
                        <td className="px-6 py-4 text-sm font-semibold text-primary">#{quote.id}</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">
                          {new Date(quote.createdAt!).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${quote.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                              quote.status === 'approved' ? 'bg-green-100 text-green-800' :
                                'bg-gray-100 text-gray-800'
                            }`}>
                            {quote.status?.charAt(0).toUpperCase()}{quote.status?.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right text-sm">
                          <Link href={`/quotes/${quote.id}`} className="text-primary hover:text-primary/80 font-medium transition-colors">
                            View Details →
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Quick Actions */}
            <div className="premium-card p-6">
              <h3 className="font-semibold text-lg mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Link href="/products" className="block">
                  <Button variant="outline" className="w-full justify-start rounded-lg">
                    <TrendingUp className="w-4 h-4 mr-2" /> Browse Products
                  </Button>
                </Link>
                <Link href="/solutions" className="block">
                  <Button variant="outline" className="w-full justify-start rounded-lg">
                    <Award className="w-4 h-4 mr-2" /> View Solutions
                  </Button>
                </Link>
                <Link href="/contact" className="block">
                  <Button className="w-full justify-start rounded-lg">
                    <FileText className="w-4 h-4 mr-2" /> Request Quote
                  </Button>
                </Link>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
              <h3 className="font-semibold text-lg mb-3 text-primary">Pro Tips</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {[
                  "Customize your quotes with detailed notes for faster turnaround",
                  "Compare multiple solutions before making a decision",
                  "Contact our team for bulk discounts on large projects",
                ].map((tip, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span className="text-primary font-bold shrink-0">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Account Info */}
            <div className="premium-card p-6">
              <h3 className="font-semibold text-lg mb-4">Account</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-muted-foreground block text-xs uppercase tracking-wider font-medium mb-1">Email</span>
                  <span className="font-medium">{user.email}</span>
                </div>
                {user.firstName && (
                  <div>
                    <span className="text-muted-foreground block text-xs uppercase tracking-wider font-medium mb-1">Name</span>
                    <span className="font-medium">{user.firstName}</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
