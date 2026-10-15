import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  BookOpen,
  Plus,
  Search,
  Bookmark,
  Clock,
  Library,
} from "lucide-react";

interface ShelfItem {
  id: string;
  title: string;
  author: string;
  category: string;
  status: "Reading" | "Completed" | "Saved";
  progress?: string;
}

const INITIAL_ITEMS: ShelfItem[] = [
  {
    id: "1",
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    category: "Architecture",
    status: "Reading",
    progress: "Chapter 7 of 12",
  },
  {
    id: "2",
    title: "The Psychology of Money",
    author: "Morgan Housel",
    category: "Economics",
    status: "Completed",
    progress: "Finished last week",
  },
  {
    id: "3",
    title: "Refactoring UI",
    author: "Adam Wathan & Steve Schoger",
    category: "Design",
    status: "Saved",
    progress: "Added 2 days ago",
  },
];

export function LandingPage() {
  const [items, setItems] = useState<ShelfItem[]>(INITIAL_ITEMS);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newItemTitle, setNewItemTitle] = useState("");
  const [newItemAuthor, setNewItemAuthor] = useState("");
  const [newItemCategory, setNewItemCategory] = useState("Reading List");

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      activeFilter === "All" ? true : item.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemTitle.trim()) return;

    const newItem: ShelfItem = {
      id: Date.now().toString(),
      title: newItemTitle.trim(),
      author: newItemAuthor.trim() || "Unknown Author",
      category: newItemCategory.trim() || "General",
      status: "Saved",
      progress: "Just added",
    };

    setItems([newItem, ...items]);
    setNewItemTitle("");
    setNewItemAuthor("");
    setIsDialogOpen(false);
  };

  const getStatusBadgeVariant = (status: ShelfItem["status"]) => {
    switch (status) {
      case "Reading":
        return "default";
      case "Completed":
        return "secondary";
      case "Saved":
        return "outline";
    }
  };

  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* Top Navigation */}
      <header className="flex items-center justify-between border-b pb-5">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <Library className="size-5" />
          </div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold tracking-tight">shelf</h1>
            <Badge variant="secondary" className="text-xs">
              Personal
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Add Item Dialog */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="default" className="gap-1.5">
                <Plus className="size-4" />
                Add Item
              </Button>
            </DialogTrigger>
            <DialogContent>
              <form onSubmit={handleAddItem} className="space-y-4">
                <DialogHeader>
                  <DialogTitle>Add to Shelf</DialogTitle>
                  <DialogDescription>
                    Save a new book, article, or resource to your shelf.
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-3 py-2">
                  <div className="space-y-1">
                    <label
                      htmlFor="title"
                      className="text-xs font-medium text-muted-foreground"
                    >
                      Title
                    </label>
                    <Input
                      id="title"
                      placeholder="e.g. Clean Code"
                      value={newItemTitle}
                      onChange={(e) => setNewItemTitle(e.target.value)}
                      required
                      autoFocus
                    />
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="author"
                      className="text-xs font-medium text-muted-foreground"
                    >
                      Author / Source
                    </label>
                    <Input
                      id="author"
                      placeholder="e.g. Robert C. Martin"
                      value={newItemAuthor}
                      onChange={(e) => setNewItemAuthor(e.target.value)}
                    />
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="category"
                      className="text-xs font-medium text-muted-foreground"
                    >
                      Category
                    </label>
                    <Input
                      id="category"
                      placeholder="e.g. Software Engineering"
                      value={newItemCategory}
                      onChange={(e) => setNewItemCategory(e.target.value)}
                    />
                  </div>
                </div>

                <DialogFooter className="gap-2 sm:gap-0">
                  <DialogClose asChild>
                    <Button variant="outline" type="button">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button type="submit">Save to Shelf</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          {/* Account Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">My Account</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuGroup>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Hero / Intro Section */}
      <section className="space-y-3">
        <h2 className="text-3xl font-semibold tracking-tight">
          Your reading list & collection
        </h2>
        <p className="max-w-2xl text-muted-foreground">
          Keep track of books, articles, and ideas you want to explore or have
          already finished.
        </p>

        {/* Search & Filter Controls */}
        <div className="flex flex-col gap-3 pt-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by title, author, or category..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {["All", "Reading", "Completed", "Saved"].map((filter) => (
              <Button
                key={filter}
                variant={activeFilter === filter ? "default" : "outline"}
                size="xs"
                onClick={() => setActiveFilter(filter)}
                className="rounded-full"
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid of Shelf Cards */}
      <section>
        {filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed py-12 text-center">
            <BookOpen className="size-10 text-muted-foreground/60 mb-3" />
            <p className="text-sm font-medium">No items found</p>
            <p className="text-xs text-muted-foreground mt-1">
              Try adjusting your search query or add a new item.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item) => (
              <Card key={item.id} className="flex flex-col justify-between">
                <CardHeader>
                  <CardTitle className="line-clamp-1">{item.title}</CardTitle>
                  <CardDescription className="line-clamp-1">
                    {item.author}
                  </CardDescription>
                  <CardAction>
                    <Badge variant={getStatusBadgeVariant(item.status)}>
                      {item.status}
                    </Badge>
                  </CardAction>
                </CardHeader>

                <CardContent className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Bookmark className="size-3.5" />
                    <span>{item.category}</span>
                  </div>
                  {item.progress && (
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="size-3.5" />
                      <span>{item.progress}</span>
                    </div>
                  )}
                </CardContent>

                <CardFooter className="border-t pt-3 flex justify-between items-center text-xs text-muted-foreground">
                  <span className="font-mono text-[11px]">ID #{item.id}</span>
                  <Button variant="ghost" size="xs">
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
