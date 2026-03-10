export type BookType = 'lend' | 'buy';

export interface Book {
  id: string;
  title: string;
  author: string;
  type: BookType;
  image: string;
  price?: string;
  category: string;
  description: string;
}

export const BOOKS: Book[] = [
  {
    id: "1",
    title: "The Midnight Library",
    author: "Matt Haig",
    type: "lend",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800",
    price: "Free to Borrow",
    category: "Fiction",
    description: "Between life and death there is a library, and within that library, the shelves go on forever."
  },
  {
    id: "2",
    title: "Circe",
    author: "Madeline Miller",
    type: "buy",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=800",
    price: "$14.99",
    category: "Mythology",
    description: "In the house of Helios, god of the sun and mightiest of the Titans, a daughter is born."
  },
  {
    id: "3",
    title: "The Alchemist",
    author: "Paulo Coelho",
    type: "lend",
    image: "https://images.unsplash.com/photo-1543004218-ee141104975e?auto=format&fit=crop&q=80&w=800",
    price: "Free to Borrow",
    category: "Philosophy",
    description: "Combining magic, mysticism, wisdom and wonder into an inspiring tale of self-discovery."
  },
  {
    id: "4",
    title: "Project Hail Mary",
    author: "Andy Weir",
    type: "buy",
    image: "https://images.unsplash.com/photo-1629904853716-f0bc54ea4813?auto=format&fit=crop&q=80&w=800",
    price: "$18.50",
    category: "Sci-Fi",
    description: "Ryland Grace is the sole survivor on a desperate, last-chance mission."
  },
  {
    id: "5",
    title: "Dune",
    author: "Frank Herbert",
    type: "buy",
    image: "https://images.unsplash.com/photo-1506466010722-395aa2bef877?auto=format&fit=crop&q=80&w=800",
    price: "$22.00",
    category: "Sci-Fi",
    description: "Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides."
  },
  {
    id: "6",
    title: "Slow Productivity",
    author: "Cal Newport",
    type: "lend",
    image: "https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&q=80&w=800",
    price: "Free to Borrow",
    category: "Non-Fiction",
    description: "A philosophy for doing work that matters without burning out."
  }
];
