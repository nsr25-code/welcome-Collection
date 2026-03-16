import React, { useRef, useState, useEffect, Component, ErrorInfo, ReactNode } from 'react';
import { motion } from 'motion/react';
import { Star, ShoppingCart, Eye, Plus, LogIn, LogOut, AlertCircle } from 'lucide-react';
import { db, auth } from '../firebase';
import { 
  collection, 
  onSnapshot, 
  doc, 
  updateDoc, 
  setDoc, 
  query,
  orderBy
} from 'firebase/firestore';
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User } from 'firebase/auth';

// --- Error Handling Utilities ---
enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// --- Error Boundary Component ---
class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean, error: Error | null }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      let displayMessage = "Something went wrong.";
      try {
        const parsed = JSON.parse(this.state.error?.message || "{}");
        if (parsed.error?.includes("insufficient permissions")) {
          displayMessage = "You don't have permission to perform this action. Please login as admin.";
        }
      } catch (e) {
        // Not a JSON error
      }

      return (
        <div className="min-h-[400px] flex flex-col items-center justify-center p-8 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 m-4">
          <AlertCircle className="w-12 h-12 text-burgundy mb-4" />
          <h2 className="text-2xl font-serif text-burgundy mb-2">Oops!</h2>
          <p className="text-slate-600 mb-6 max-w-md">{displayMessage}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-burgundy text-white rounded-full hover:bg-gold transition-all"
          >
            Reload Application
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const initialProducts = [
  {
    id: 1,
    name: "Formal Shirts",
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=600",
    category: "Formal"
  },
  {
    id: 2,
    name: "Formal Pants",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=600",
    category: "Formal"
  },
  {
    id: 3,
    name: "Cargo Pants",
    image: "https://images.unsplash.com/photo-1617114919297-3c8ddb01f599?auto=format&fit=crop&q=80&w=600",
    category: "Casual"
  },
  {
    id: 4,
    name: "Trousers",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=600",
    category: "Casual"
  },
  {
    id: 5,
    name: "T-Shirts",
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&q=80&w=600",
    category: "Casual"
  },
  {
    id: 6,
    name: "Kurta",
    image: "https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?auto=format&fit=crop&q=80&w=600",
    category: "Ethnic"
  },
  {
    id: 7,
    name: "Kurti",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=600",
    category: "Ethnic"
  },
  {
    id: 8,
    name: "Marriage Wears",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=600",
    category: "Wedding"
  },
  {
    id: 9,
    name: "Party Wears",
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=600",
    category: "Party"
  },
  {
    id: 10,
    name: "Lowers",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600",
    category: "Casual"
  },
  {
    id: 11,
    name: "Jeans",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=600",
    category: "Casual"
  },
  {
    id: 12,
    name: "Suits & Sherwanis",
    image: "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&q=80&w=600",
    category: "Wedding"
  }
];

const ADMIN_EMAIL = "mdnisarahmad116191143@gmail.com";

const FeaturedProductsContent = () => {
  const [products, setProducts] = useState(initialProducts);
  const [user, setUser] = useState<User | null>(null);
  const [activeProductId, setActiveProductId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isAdmin = user?.email === ADMIN_EMAIL;

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    const q = query(collection(db, 'products'), orderBy('id', 'asc'));
    const unsubscribeFirestore = onSnapshot(q, (snapshot) => {
      if (snapshot.empty) {
        // Only seed if we are the admin and the DB is empty
        // Otherwise just show initial products without writing
        setProducts(initialProducts);
        setIsLoading(false);
      } else {
        const productsData = snapshot.docs.map(doc => doc.data() as typeof initialProducts[0]);
        setProducts(productsData);
        setIsLoading(false);
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'products');
    });

    return () => {
      unsubscribeAuth();
      unsubscribeFirestore();
    };
  }, []);

  // Separate effect for seeding to avoid race conditions and permission errors
  useEffect(() => {
    if (isAdmin && products.length === initialProducts.length && products[0].image.startsWith('https://images.unsplash.com')) {
      // Check if we need to seed (this is a simple heuristic)
      const seedData = async () => {
        try {
          for (const product of initialProducts) {
            await setDoc(doc(db, 'products', product.id.toString()), product);
          }
        } catch (error) {
          console.error("Seeding failed:", error);
          // We don't throw here to avoid crashing the app for the admin
        }
      };
      // seedData(); // Uncomment if you want auto-seeding for admin
    }
  }, [isAdmin, products]);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = () => signOut(auth);

  const handleAddImageClick = (productId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAdmin) return;
    setActiveProductId(productId);
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && activeProductId !== null && isAdmin) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result as string;
        const path = `products/${activeProductId}`;
        try {
          await updateDoc(doc(db, 'products', activeProductId.toString()), {
            image: base64String,
            updatedAt: new Date().toISOString()
          });
        } catch (error) {
          handleFirestoreError(error, OperationType.UPDATE, path);
        }
      };
      reader.readAsDataURL(file);
      
      e.target.value = '';
      setActiveProductId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="py-24 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-burgundy"></div>
      </div>
    );
  }

  return (
    <section className="py-24 bg-white relative">
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*" 
        onChange={handleFileChange} 
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <span className="text-gold font-medium tracking-widest uppercase text-sm">Our Wide Range</span>
            <h2 className="text-4xl font-serif text-burgundy mt-2">Our Collections</h2>
          </div>
          
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-500">Logged in as {user.displayName}</span>
                <button 
                  onClick={handleLogout}
                  className="p-2 bg-slate-100 rounded-full text-slate-600 hover:bg-burgundy hover:text-white transition-all"
                  title="Logout"
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <button 
                onClick={handleLogin}
                className="flex items-center gap-2 px-4 py-2 bg-burgundy text-white rounded-full text-sm font-medium hover:bg-gold transition-all"
              >
                <LogIn size={16} />
                Admin Login
              </button>
            )}
            <button className="text-burgundy font-semibold flex items-center gap-2 hover:text-gold transition-colors group">
              View All Categories
              <div className="w-8 h-[1px] bg-burgundy group-hover:bg-gold transition-colors"></div>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-slate-100 mb-4 shadow-md group-hover:shadow-xl transition-shadow duration-300">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                
                {/* Add Image Button (Clickable only for Admin) */}
                <button 
                  onClick={(e) => handleAddImageClick(product.id, e)}
                  className={`absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full text-burgundy shadow-sm z-20 transition-all ${isAdmin ? 'hover:bg-gold hover:text-white cursor-pointer' : 'opacity-50 cursor-default'}`}
                  title={isAdmin ? "Change Image" : "Admin only"}
                >
                  <Plus size={18} />
                </button>

                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-gradient-to-t from-burgundy/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-6">
                  <button className="w-full py-3 bg-white text-burgundy font-bold rounded-xl hover:bg-gold hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300">
                    Explore Now
                  </button>
                </div>
                
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-burgundy text-[10px] font-bold uppercase tracking-widest rounded-lg shadow-sm">
                    {product.category}
                  </span>
                </div>
              </div>

              <div className="text-center">
                <h3 className="font-serif text-xl text-slate-800 mb-1 group-hover:text-burgundy transition-colors">
                  {product.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FeaturedProducts = () => (
  <ErrorBoundary>
    <FeaturedProductsContent />
  </ErrorBoundary>
);

export default FeaturedProducts;

